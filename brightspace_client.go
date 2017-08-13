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
	credentials   *Credentials
	client        *http.Client
	clientBaseURL string
	state         string
}

const (
	authService   = "https://auth.brightspace.com"
	authEndpoint  = authService + "/oauth2/auth"
	tokenEndpoint = authService + "/core/connect/token"
)

// CreateBrightspaceClient ...
func CreateBrightspaceClient(credentials *Credentials, clientBaseURL string) *BrightspaceClient {
	var brightspaceClient BrightspaceClient
	brightspaceClient.credentials = credentials
	brightspaceClient.clientBaseURL = clientBaseURL
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
	q.Add("redirect_uri", createRedirectTo(bsc.clientBaseURL, "callback"))
	q.Add("client_id", bsc.credentials.ClientID)
	q.Add("scope", bsc.credentials.Scope)
	q.Add("state", bsc.state)
	req.URL.RawQuery = q.Encode()

	http.Redirect(w, r, req.URL.String(), 301)
}

// AuthCallbackHandler ...
func (bsc *BrightspaceClient) AuthCallbackHandler(w http.ResponseWriter, r *http.Request) {
	// Avoid CSRF attacks by checking generated state
	if bsc.state != r.URL.Query().Get("state") {
		log.Fatal("States don't match!")
	}
	// Get the authorization code
	bsc.credentials.AuthCode = r.URL.Query().Get("code")

	// Send a request asking for access token and refresh token using authorization code
	payload := url.Values{}
	payload.Add("grant_type", "authorization_code")
	// TODO: Create route list so I don't have to hardcode
	payload.Add("redirect_uri", createRedirectTo(bsc.clientBaseURL, "callback"))
	payload.Add("code", bsc.credentials.AuthCode)

	// The response contains the access token and refresh token
	resp := bsc.sendAuthorizedRequestWithPayload("POST", tokenEndpoint, payload)
	if resp.StatusCode != http.StatusOK {
		log.Fatal(resp.Status)
	}

	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatal(err.Error())
	}

	var token BrightspaceToken

	err = json.Unmarshal(body, &token)
	if err != nil {
		log.Fatal(err)
	}
	bsc.credentials.Token = &token

	// Store data in a credential file to use refresh token for next time
	StructToJSONFile(bsc.credentials, credFilePath)

	log.Printf("New Access/Refresh Token using Authorization Code:\n%s", JSONStringify(bsc.credentials.Token))

	// Redirect back to index page
	http.Redirect(w, r, createRedirectTo(bsc.clientBaseURL, "/"), 301)
}

// RefreshHandler ...
func (bsc *BrightspaceClient) RefreshHandler(w http.ResponseWriter, r *http.Request) {
	// Send a request asking for new access token and refresh token using refresh token
	payload := url.Values{}
	payload.Add("grant_type", "refresh_token")
	payload.Add("refresh_token", bsc.credentials.Token.RefreshToken)
	payload.Add("scope", bsc.credentials.Scope)

	// The response contains the access token and refresh token
	resp := bsc.sendAuthorizedRequestWithPayload("POST", tokenEndpoint, payload)

	if resp.StatusCode != http.StatusOK {
		log.Fatal(resp.Status)
	}

	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatal(err.Error())
	}

	var token BrightspaceToken

	err = json.Unmarshal(body, &token)
	if err != nil {
		log.Fatal(err)
	}
	// Replace used up token with new token
	bsc.credentials.Token = &token

	// Store data in a credential file to use refresh token for next time
	StructToJSONFile(bsc.credentials, credFilePath)

	log.Printf("New Access/Refresh Token using Refresh Token:\n%s", JSONStringify(bsc.credentials.Token))
}

// APIHandler ...
func (bsc *BrightspaceClient) APIHandler(w http.ResponseWriter, r *http.Request) {
	baseRoute := "/d2l/api/lp/"
	version := "1.13"
	apiCommand := "/users/"
	fullURL := bsc.credentials.HostURL + baseRoute + version + apiCommand

	req, err := http.NewRequest("GET", fullURL, nil)
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", cred.Token.TokenType+" "+cred.Token.AccessToken)

	resp, err := bsc.client.Do(req)
	if err != nil {
		log.Fatal(err)
	}
	// TODO: Deal with the case of a access token being expired!
	if resp.StatusCode != 200 {
		log.Panic(err)
	}

	body, _ := ioutil.ReadAll(resp.Body)
	resp.Body.Close()

	w.Header().Set("Content-Type", "application/json")
	w.Write(body)

}

func (bsc *BrightspaceClient) sendAuthorizedRequestWithPayload(method string, url string, payload url.Values) *http.Response {
	req, err := http.NewRequest("POST", tokenEndpoint, strings.NewReader(payload.Encode()))
	if err != nil {
		log.Fatal(err)
	}
	req.SetBasicAuth(cred.ClientID, cred.ClientSecret)
	req.Header.Add("Content-Type", "application/x-www-form-urlencoded")
	resp, err := bsc.client.Do(req)
	if err != nil {
		log.Fatal(err)
	}
	return resp
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
