package repository

import (
	"backend/internal/models"
	"database/sql"
)

type DatabaseRepo interface {
	Connection() *sql.DB
	GetPosts(genre ...int) ([]*models.Post, error)
	GetUserByUsername(username string) (*models.User, error)
	GetUserByID(id int) (*models.User, error)
	GetPostByID(id int) (*models.Post, error)
	GetPostAndGenresByID(id int) (*models.Post, []*models.Genre, error)
}