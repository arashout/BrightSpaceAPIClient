package main

import (
	"encoding/json"
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
