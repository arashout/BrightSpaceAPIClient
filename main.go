package main

import (
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
	AuthCode     string `json:"authorizationCode"`
	Token        *BrightspaceToken
}

// BrightspaceToken ... To get access token
type BrightspaceToken struct {
	AccessToken  string `json:"access_token"`
	RefreshToken string `json:"refresh_token"`
	TokenType    string `json:"token_type"`
	ExpiresIn    int64  `json:"expires_in"`
}

const (
	credFilePath = ".devenv.json"
	clientPort   = "3001"
)

var cred Credentials

func main() {
	cred = ReadJSONCredentials(credFilePath)

	// Check if the cert files are available.
	err := httpscerts.Check("cert.pem", "key.pem")
	// If they are not available, generate new ones.
	if err != nil {
		err = httpscerts.Generate("cert.pem", "key.pem", "127.0.0.1:"+clientPort)
		if err != nil {
			log.Fatal("Error: Couldn't create https certs.")
		}
	}

	bsc := CreateBrightspaceClient(&cred, "https://localhost:"+clientPort)

	mux := http.NewServeMux()
	mux.Handle("/", http.FileServer(http.Dir("dist")))
	mux.HandleFunc("/auth", bsc.AuthHandler)
	mux.HandleFunc("/callback", bsc.AuthCallbackHandler)
	mux.HandleFunc("/refresh", bsc.RefreshHandler)
	mux.HandleFunc("/api", bsc.APIHandler)

	srv := &http.Server{
		Addr:         ":" + clientPort,
		Handler:      mux,
		ReadTimeout:  2 * time.Second,
		WriteTimeout: 2 * time.Second,
		IdleTimeout:  2 * time.Second,
	}
	log.Printf("Listening to client on port: %s", clientPort)
	err = srv.ListenAndServeTLS("cert.pem", "key.pem")
	if err != nil {
		log.Println("Fail to bind port: ", err)
	}
}
