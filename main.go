package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"time"

	"github.com/kabukky/httpscerts"
)

// Credentials ... Type to store credentials
type Credentials struct {
	ClientID     string `json:"clientID"`
	ClientSecret string `json:"clientSecret"`
	HostURL      string `json:"hostURL"`
	Scope        string `json:"scope"`
	State        string
	AuthCode     string
	Token        *BrightspaceToken
}

//  BrightspaceToken ... to get access token
type BrightspaceToken struct {
	AccessToken  string `json:"access_token"`
	RefreshToken string `json:"refresh_token"`
	TokenType    string `json:"token_type"`
	ExpiresIn    int64  `json:"expires_in"`
}

const (
	credFilePath = ".devenv.json"
	port         = "3001"
	// Would prefer to check server address...
	clientURLBase = "https://localhost:" + port
)

var cred Credentials

func main() {
	cred = ReadJSONCredentials(credFilePath)

	// Check if the cert files are available.
	err := httpscerts.Check("cert.pem", "key.pem")
	// If they are not available, generate new ones.
	if err != nil {
		err = httpscerts.Generate("cert.pem", "key.pem", "127.0.0.1:"+port)
		if err != nil {
			log.Fatal("Error: Couldn't create https certs.")
		}
	}

	bsc := CreateBrightspaceClient(&cred)

	mux := http.NewServeMux()
	mux.Handle("/", http.FileServer(http.Dir("dist")))
	mux.HandleFunc("/auth", bsc.AuthHandler)
	mux.HandleFunc("/callback", bsc.AuthCallbackHandler)
	mux.HandleFunc("/search", searchHandler)

	srv := &http.Server{
		Addr:         ":" + port,
		Handler:      mux,
		ReadTimeout:  2 * time.Second,
		WriteTimeout: 2 * time.Second,
		IdleTimeout:  2 * time.Second,
	}
	log.Printf("Listening on port: %s", port)
	err = srv.ListenAndServeTLS("cert.pem", "key.pem")
	if err != nil {
		log.Println("Fail to bind port: ", err)
	}
}

func searchHandler(w http.ResponseWriter, r *http.Request) {
	baseRoute := "/d2l/api/lp/"
	version := "1.13"
	apiCommand := "/users/"
	fullURL := cred.HostURL + baseRoute + version + apiCommand

	client := &http.Client{}
	req, err := http.NewRequest("GET", fullURL, nil)
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", cred.Token.TokenType+" "+cred.Token.AccessToken)

	resp, err := client.Do(req)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()

	fmt.Println("response Status:", resp.Status)
	fmt.Println("response Headers:", resp.Header)
	body, _ := ioutil.ReadAll(resp.Body)
	fmt.Println("response Body:", string(body))
}
