package main

import (
	"fmt"
	"net/http"
	"github.com/lsyurea/Web-application-with-go/pkg/handlers"
)

const portNumber = ":8080"


func main() {
	fmt.Print("Starting the application on port ", portNumber, "")
	http.HandleFunc("/", handlers.Home)
	http.HandleFunc("/about", handlers.About)
	errs := http.ListenAndServe(portNumber, nil)
	if errs != nil {
		fmt.Println(errs)
	}
}