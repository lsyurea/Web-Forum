package main

import (
	"net/http"
	"github.com/go-chi/chi/v5"
	"github.com/lsyurea/Web-application-with-go/pkg/config"
	"github.com/lsyurea/Web-application-with-go/pkg/handlers"
)

func routes(app *config.AppConfig) http.Handler {

	mux := chi.NewRouter()
	mux.Get("/", handlers.Repo.Home)
	mux.Get("/about", handlers.Repo.About)
	return mux
}