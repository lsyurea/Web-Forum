package main

import (
	"fmt"
	"net/http"
	"github.com/lsyurea/Web-application-with-go/pkg/handlers"
	"github.com/lsyurea/Web-application-with-go/pkg/config"
	"github.com/lsyurea/Web-application-with-go/pkg/render"
)

const portNumber = ":8080"


func main() {
	var app config.AppConfig

	tc, err := render.CreateTemplateCache()
	if err != nil {
		fmt.Println("Error creating template cache: ", err)
	}

	//use cache is false when in production mode
	app.TemplateCache = tc
	app.UseCache = false

	repo := handlers.NewRepo(&app)
	handlers.NewHandlers(repo)

	render.NewTemplates(&app)

	fmt.Print("Starting the application on port ", portNumber, "")
	http.HandleFunc("/", handlers.Repo.Home)
	http.HandleFunc("/about", handlers.Repo.About)
	errs := http.ListenAndServe(portNumber, nil)
	if errs != nil {
		fmt.Println(errs)
	}
}