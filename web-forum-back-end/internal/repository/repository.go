package repository

import (
	"backend/internal/models"
	"database/sql"
)

type DatabaseRepo interface {
	Connection() *sql.DB
	GetPosts() ([]*models.Post, error)
	GetUserByUsername(username string) (*models.User, error)
	GetUserByID(id int) (*models.User, error)
}