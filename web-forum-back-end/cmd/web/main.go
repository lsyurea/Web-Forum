package main

import (
	"fmt"
	"net/http"
	"github.com/lsyurea/Web-application-with-go/pkg/handlers"
	"github.com/lsyurea/Web-application-with-go/pkg/config"
	"github.com/lsyurea/Web-application-with-go/pkg/render"
	"github.com/alexedwards/scs/v2"
	"time"
)

const portNumber = ":8080"
var app config.AppConfig
var session *scs.SessionManager

func main() {
	
	//change this to true when in production
	app.InProduction = false

	//created session
	session = scs.New()
	session.Lifetime = 24 * time.Hour
	session.Cookie.Persist = true
	session.Cookie.SameSite = http.SameSiteLaxMode
	session.Cookie.Secure = app.InProduction
	app.Session = session

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
	
	srv := &http.Server{
		Addr: portNumber,
		Handler: routes(&app),
	}
	err = srv.ListenAndServe()
	if err != nil {
		fmt.Println(err)
	}
}