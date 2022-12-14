package main

import (
	"net/http"
	"encoding/json"
	"fmt"
	"github.com/lsyurea/web-forum-back-end/internal/models"
)

func (app *application) Home(w http.ResponseWriter, r *http.Request) {
	var payload = struct {
		Status string `json:"status"`
		Message string `json:"message"`
		Version string `json:"version"`
	}{
		Status: "active",
		Message: "Welcome to the forum",
		Version: "1.0.0",
	}

	out, err := json.Marshal(payload)
	if err != nil {
		fmt.Println(err)
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(out)
}

func (app *application) GetPosts(w http.ResponseWriter, r *http.Request) {
	var posts []models.Post

	// get all posts from database (currently stimulating it)

}