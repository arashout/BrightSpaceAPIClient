package main

import (
	"net/http"
)

// Middleware is a wrapper for router, which allows to add
// interceptors to every request, e.g. to add CORS headers
type Middleware struct {
	mux *http.ServeMux
}

// ServeHTTP intercepts requests before passing it on to the actual
// handler function
func (m *Middleware) ServeHTTP(rw http.ResponseWriter, req *http.Request) {
	fn := m.mux.ServeHTTP

	// Can add additional middleware interceptors here
	fn = RestrictionWrapper(fn)

	fn(rw, req)
}

// RestrictionWrapper is used to block any other methods but GET and
// POST
func RestrictionWrapper(fn http.HandlerFunc) http.HandlerFunc {
	return func(rw http.ResponseWriter, req *http.Request) {
		rw.Header().Set("Access-Control-Allow-Methods", "GET,POST")
		fn(rw, req)
	}
}

// PostOnlyWrapper will only allow POST as HTTP method and returns an status code 406
func PostOnlyWrapper(fn http.HandlerFunc) http.HandlerFunc {
	return func(rw http.ResponseWriter, req *http.Request) {
		if req.Method != "POST" {
			http.Error(rw, "You are only allowed POST requests at this endpoint", http.StatusNotAcceptable)
			return
		}

		fn(rw, req)
	}
}

// GetOnlyWrapper will only allow POST as HTTP method and returns an status code 406
func GetOnlyWrapper(fn http.HandlerFunc) http.HandlerFunc {
	return func(rw http.ResponseWriter, req *http.Request) {
		if req.Method != "GET" {
			http.Error(rw, "You are only allowed GET requests at this endpoint", http.StatusNotAcceptable)
			return
		}

		fn(rw, req)
	}
}
