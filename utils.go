package main

import (
	"crypto/rand"
	"encoding/base64"
	"encoding/json"
	"io"
	"io/ioutil"
	"os"

	"log"
)

// ReadJSONCredentials ...
// Given a json file path and a declared struct this function will attempt to
// parse the JSON into the struct
func ReadJSONCredentials(filePath string) Credentials {
	file, err := os.Open(filePath)
	if err != nil {
		log.Fatalf("Cannot open %s : %s", filePath, err.Error())
	}

	var cred Credentials
	jsonParser := json.NewDecoder(file)
	if err = jsonParser.Decode(&cred); err != nil {
		log.Fatalf("Cannot parse file: %s using struct: %s", filePath, err.Error())
	}

	return cred
}

// JSONStringify ... Helper function for getting a JSON string of structs
func JSONStringify(structure interface{}) string {
	bytesJSON, err := json.Marshal(structure)
	if err != nil {
		log.Fatalf("Cannot marshal JSON: %s", err.Error())
	}
	return string(bytesJSON)
}

// GenerateRandomState ...
func GenerateRandomState(n int) (string, error) {
	data := make([]byte, n)
	if _, err := io.ReadFull(rand.Reader, data); err != nil {
		return "", err
	}
	return base64.StdEncoding.EncodeToString(data), nil
}

// StructToJSONFile ...
func StructToJSONFile(s interface{}, path string) {
	sJSON, err := json.Marshal(s)
	if err != nil {
		log.Fatal(err)
	}
	err = ioutil.WriteFile(path, sJSON, 0644)
	if err != nil {
		log.Fatal(err)
	}

}
