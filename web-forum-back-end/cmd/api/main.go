package main

import (
	"fmt"
	"net/http"
	"log"
)

const port = 8080

type application struct {
	Domain string
}

func main() {
	// set application configuration
	var app application
	// read from command line

	// connect to database
	app.Domain = "example.com"
	log.Println("Starting server on port", port)
	http.HandleFunc("/", app.Home)

	// start a web server
	err := http.ListenAndServe(fmt.Sprintf(":%d", port), app.routes())
	if err != nil {
		log.Fatal(err)
	}
}