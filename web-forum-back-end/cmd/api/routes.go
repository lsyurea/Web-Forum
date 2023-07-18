package main

import (
	"net/http"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

func (app *application) routes() http.Handler {
	// define routes
	mux := chi.NewRouter()

	mux.Use(middleware.Recoverer)
	mux.Use(app.enableCORS)

	mux.Get("/", app.Home)

	// Get parameters are visible, but not secure; post request is used for authentication
	mux.Post("/authenticate", app.authenticate)
	
	// Cookies
	mux.Get("/refresh", app.refreshToken)
	mux.Get("/logout", app.logout)

	// Posts
	mux.Get("/posts", app.AllPosts)
	mux.Get("/posts/{id}", app.GetPost)
	mux.Get("/posts/user/{id}", app.AllPostsByUser)
	

	// logged in user routes
	mux.Route("/logged", func(mux chi.Router) {
		mux.Use(app.authRequired)

		// logged routes
		mux.Get("/posts/{id}", app.PostForEdit)
		
	})

	return mux
}
