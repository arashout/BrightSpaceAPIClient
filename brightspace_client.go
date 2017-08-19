package main

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"strings"
	"time"
)

// BrightspaceClient ...
type BrightspaceClient struct {
	credentials   *Credentials
	client        *http.Client
	clientBaseURL string
	state         string
}

// BrightspaceToken ... To get access token
type BrightspaceToken struct {
	AccessToken  string    `json:"access_token"`
	RefreshToken string    `json:"refresh_token"`
	TokenType    string    `json:"token_type"`
	ExpiresIn    int64     `json:"expires_in"`
	Expiration   time.Time `json:"expiration"`
}

// APIRequest ... What an API request from the Angular front-end will look like
type APIRequest struct {
	APIEndpoint     string            `json:"apiEndpoint"`
	QueryParameters map[string]string `json:"queryParameters"`
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
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatal(err.Error())
	}

	if resp.StatusCode != http.StatusOK {
		http.Error(w, string(body), resp.StatusCode)
		return
	}

	bsc.updateTokenFromJSON(body)

	// Store data in a credential file to use refresh token for next time
	StructToJSONFile(bsc.credentials, credFilePath)

	log.Printf("New Access/Refresh Token using Authorization Code:\n%s", JSONStringify(bsc.credentials.Token))

	// Redirect back to index page
	http.Redirect(w, r, createRedirectTo(bsc.clientBaseURL, "/"), 301)
}

// RefreshHandler ...
func (bsc *BrightspaceClient) RefreshHandler(w http.ResponseWriter, r *http.Request) {
	// First check that we actually have a refresh token
	if bsc.credentials.Token == nil {
		http.Error(w, "Don't have OAuth token!", http.StatusUnauthorized)
		return
	} else if bsc.credentials.Token.RefreshToken == "" {
		http.Error(w, "Don't have OAuth token!", http.StatusUnauthorized)
		return
	}

	// Send a request asking for new access token and refresh token using refresh token
	payload := url.Values{}
	payload.Add("grant_type", "refresh_token")
	payload.Add("refresh_token", bsc.credentials.Token.RefreshToken)
	payload.Add("scope", bsc.credentials.Scope)

	// The response contains the access token and refresh token
	resp := bsc.sendAuthorizedRequestWithPayload("POST", tokenEndpoint, payload)

	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatal(err.Error())
	}

	if resp.StatusCode != http.StatusOK {
		http.Error(w, string(body), resp.StatusCode)
		return
	}

	bsc.updateTokenFromJSON(body)

	// Store data in a credential file to use refresh token for next time
	StructToJSONFile(bsc.credentials, credFilePath)

	jsonResponseString := JSONStringify(bsc.credentials.Token)

	log.Printf("New Access/Refresh Token using Refresh Token:\n%s", jsonResponseString)
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(jsonResponseString))
}

// APIHandler ...
func (bsc *BrightspaceClient) APIHandler(w http.ResponseWriter, r *http.Request) {
	var apiRequest APIRequest
	defer r.Body.Close()
	// bodyR, _ := ioutil.ReadAll(r.Body)
	// log.Println(string(bodyR))
	err := json.NewDecoder(r.Body).Decode(&apiRequest)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	requestURL, err := url.Parse(bsc.credentials.HostURL + apiRequest.APIEndpoint)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	params := url.Values{}

	for key, value := range apiRequest.QueryParameters {
		params.Set(key, value)
	}
	requestURL.RawQuery = params.Encode()

	log.Printf("GET %s", requestURL.String())
	req, err := http.NewRequest("GET", requestURL.String(), nil)

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", bsc.credentials.Token.TokenType+" "+bsc.credentials.Token.AccessToken)

	resp, err := bsc.client.Do(req)
	if err != nil {
		log.Fatal(err.Error())
	}
	defer resp.Body.Close()
	body, _ := ioutil.ReadAll(resp.Body)

	// TODO: Deal with the case of a access token being expired!
	if resp.StatusCode != http.StatusOK {
		http.Error(w, string(body), resp.StatusCode)
		return
	}

	log.Println(string(body))
	w.Header().Set("Content-Type", "application/json")
	w.Write(body)
}

func (bsc *BrightspaceClient) sendAuthorizedRequestWithPayload(method string, url string, payload url.Values) *http.Response {
	req, err := http.NewRequest("POST", tokenEndpoint, strings.NewReader(payload.Encode()))
	if err != nil {
		log.Fatal(err.Error())
	}
	req.SetBasicAuth(bsc.credentials.ClientID, bsc.credentials.ClientSecret)
	req.Header.Add("Content-Type", "application/x-www-form-urlencoded")
	resp, err := bsc.client.Do(req)
	if err != nil {
		log.Fatal(err.Error())
	}
	return resp
}

func createRedirectTo(basePath string, relativePath string) string {
	u, err := url.Parse(basePath)
	if err != nil {
		log.Fatal(err.Error())
	}
	u.RawQuery = ""
	u.Path = relativePath
	return u.String()
}

func (bsc *BrightspaceClient) updateTokenFromJSON(jsonBody []byte) {
	err := json.Unmarshal(jsonBody, &bsc.credentials.Token)
	if err != nil {
		log.Fatal(err)
	}
	// Update the expiration field
	bsc.credentials.Token.Expiration = time.Now().Local().Add(time.Second * time.Duration(bsc.credentials.Token.ExpiresIn))
}
