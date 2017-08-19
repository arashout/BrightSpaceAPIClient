# BrightspaceAPISearch
This is a utility built with Angular, Golang and Datatables for accessing the Brightspace APIs     
- It makes the 3-legged OAuth2 authentication easier by walking you through the redirects
- It makes the developer OAuth2 procedure a breeze by automatically refreshing tokens for you whenever you need them
- Converts JSON list data retrieved from an API into a great looking Datatable and allows exports to .xlsx format

## Setup
Before you run the web server you do need to create a `.devenv.json` file that contains this information but filled in...
```json
{
    "clientID": "",
    "clientSecret": "",
    "hostURL": "",
    "scope": ""
}
```
With the format above!

## Run It
To run the application simply execute `BrightSpaceAPISearch.exe`

## Build It
You can build it first by running `go build` if you are on Linux
In conjuction you can also build the Angular files with `ng build`
NOTE: You need Golang, Angular, NPM... installed to build it

TODO:
- Extra textarea for adding query to api commands [ ]
- Authorize button, for going through 3 legged oauth [ ]
- Autocomplete search with successful past searchs [ ]
- Display data that doesn't conform to ResultSet type properly [ ]
- Load all results -> HasMoreItems should trigger more requests [ ]
- Add middle-ware to backend Go [ ]