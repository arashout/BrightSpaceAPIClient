package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"os"
	"strings"
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
	Token        *AccessToken
}

//  AccessToken ... to get access token
type AccessToken struct {
	TokenString string `json:"access_token"`
	TokenType   string `json:"token_type"`
	ExpiresIn   int64  `json:"expires_in"`
}

const (
	credFilePath  = ".devenv.json"
	authService   = "https://auth.brightspace.com"
	authEndpoint  = authService + "/oauth2/auth"
	tokenEndpoint = authService + "/core/connect/token"
	redirectURI   = "https://localhost:3001/callback"
)

var cred Credentials

func main() {
	cred = ReadJSONCredentials(credFilePath)
	cred.State = "f4c269a0-4a69-43c1-9405-86209c896fa0"

	port := "3001"

	// Check if the cert files are available.
	err := httpscerts.Check("cert.pem", "key.pem")
	// If they are not available, generate new ones.
	if err != nil {
		err = httpscerts.Generate("cert.pem", "key.pem", "127.0.0.1:"+port)
		if err != nil {
			log.Fatal("Error: Couldn't create https certs.")
		}
	}

	mux := http.NewServeMux()
	mux.Handle("/", http.FileServer(http.Dir("src")))
	mux.HandleFunc("/auth", authHandler)
	mux.HandleFunc("/callback", callbackHandler)
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
func authHandler(w http.ResponseWriter, r *http.Request) {
	req, err := http.NewRequest("GET", authEndpoint, nil)
	if err != nil {
		log.Print(err)
		os.Exit(1)
	}
	q := req.URL.Query()
	q.Add("response_type", "code")
	q.Add("redirect_uri", redirectURI)
	q.Add("client_id", cred.ClientID)
	q.Add("scope", cred.Scope)
	q.Add("state", cred.State)
	req.URL.RawQuery = q.Encode()

	http.Redirect(w, r, req.URL.String(), 301)
}

func callbackHandler(w http.ResponseWriter, r *http.Request) {
	cred.AuthCode = r.URL.Query().Get("code")
	log.Print(cred.AuthCode)
	if cred.State != r.URL.Query().Get("state") {
		log.Print("States don't match!")
		os.Exit(1)
	}

	client := &http.Client{}
	payload := url.Values{}
	payload.Add("grant_type", "authorization_code")
	payload.Add("redirect_uri", redirectURI)
	payload.Add("code", cred.AuthCode)

	req, err := http.NewRequest("POST", tokenEndpoint, strings.NewReader(payload.Encode()))
	req.SetBasicAuth(cred.ClientID, cred.ClientSecret)
	req.Header.Add("Content-Type", "application/x-www-form-urlencoded")

	resp, err := client.Do(req)
	if err != nil {
		log.Fatal(err)
	}
	if resp.StatusCode != http.StatusOK {
		log.Fatal(resp.Status)
	}

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		panic(err.Error())
	}
	var token AccessToken
	err = json.Unmarshal(body, &token)
	if err != nil {
		panic(err)
	}
	cred.Token = &token
}

func searchHandler(w http.ResponseWriter, r *http.Request) {
	baseRoute := "/d2l/api/lp/"
	version := "1.13"
	apiCommand := "/users/"
	fullURL := cred.HostURL + baseRoute + version + apiCommand

	client := &http.Client{}
	req, err := http.NewRequest("GET", fullURL, nil)
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+cred.Token.TokenString)

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
