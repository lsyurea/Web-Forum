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

	OnePost(id int) (*models.Post, error)
	OnePostForEdit(id int) (*models.Post, []*models.Genre, error)

	GetPostsFromUser(id int) ([]*models.Post, error)
}