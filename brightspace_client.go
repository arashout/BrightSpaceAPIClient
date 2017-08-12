package main

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"strings"
)

// BrightspaceClient ...
type BrightspaceClient struct {
	credentials *Credentials
	client      *http.Client
	state       string
}

const (
	authService   = "https://auth.brightspace.com"
	authEndpoint  = authService + "/oauth2/auth"
	tokenEndpoint = authService + "/core/connect/token"
)

// CreateBrightspaceClient ...
func CreateBrightspaceClient(cred *Credentials) *BrightspaceClient {
	var brightspaceClient BrightspaceClient
	brightspaceClient.credentials = cred
	brightspaceClient.client = &http.Client{}

	var err error
	brightspaceClient.state, err = GenerateRandomState(32)
	if err != nil {
		log.Fatal(err)
	}

	return &brightspaceClient
}

// AuthHandler ...
func (bsc *BrightspaceClient) AuthHandler(w http.ResponseWriter, r *http.Request) {
	req, err := http.NewRequest("GET", authEndpoint, nil)
	if err != nil {
		log.Fatal(err)
		// TODO: Send response indication failure
	}
	q := req.URL.Query()
	q.Add("response_type", "code")
	q.Add("redirect_uri", createRedirectTo(clientURLBase, "callback"))
	q.Add("client_id", bsc.credentials.ClientID)
	q.Add("scope", bsc.credentials.Scope)
	q.Add("state", bsc.state)
	req.URL.RawQuery = q.Encode()

	http.Redirect(w, r, req.URL.String(), 301)
}

// AuthCallbackHandler ...
func (bsc *BrightspaceClient) AuthCallbackHandler(w http.ResponseWriter, r *http.Request) {
	bsc.credentials.AuthCode = r.URL.Query().Get("code")

	if bsc.state != r.URL.Query().Get("state") {
		log.Fatal("States don't match!")
	}

	payload := url.Values{}
	payload.Add("grant_type", "authorization_code")
	// TODO: Create route list so I don't have to hardcode
	payload.Add("redirect_uri", createRedirectTo(clientURLBase, "callback"))
	payload.Add("code", bsc.credentials.AuthCode)

	req, err := http.NewRequest("POST", tokenEndpoint, strings.NewReader(payload.Encode()))
	req.SetBasicAuth(cred.ClientID, cred.ClientSecret)
	req.Header.Add("Content-Type", "application/x-www-form-urlencoded")

	// The response contains the access token and refresh token
	resp, err := bsc.client.Do(req)
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

	var token BrightspaceToken

	err = json.Unmarshal(body, &token)
	if err != nil {
		log.Fatal(err)
	}
	bsc.credentials.Token = &token

	StructToJSONFile(bsc.credentials, credFilePath)
	log.Println(JSONStringify(bsc.credentials.Token))
}

func createRedirectTo(basePath string, relativePath string) string {
	u, err := url.Parse(basePath)
	if err != nil {
		log.Fatal(err)
	}
	u.RawQuery = ""
	u.Path = relativePath
	return u.String()
}
