package dbrepo

import (
	"backend/internal/models"
	"context"
	"database/sql"
	"fmt"
	"time"
)


type PostgresDBRepo struct {
	DB *sql.DB
}

const dbTimeout = time.Second * 3

func (m *PostgresDBRepo) Connection() *sql.DB {
	return m.DB
}

func (m *PostgresDBRepo) GetPosts(genre ... int) ([]*models.Post, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()

	where := ""
	if len(genre) > 0 {
		where = fmt.Sprintf("WHERE id in (select post_id from posts_genres_users where genre_id = %d)", genre[0])
	}

	query:= fmt.Sprintf(`SELECT id, title, content, coalesce(image, ''), created_at, updated_at from posts %s ORDER BY created_at DESC`, where)

	rows, err := m.DB.QueryContext(ctx, query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var posts []*models.Post

	for rows.Next() {
		post := &models.Post{}
		err := rows.Scan(&post.ID, &post.Title, &post.Content, &post.Image, &post.CreatedAt, &post.UpdatedAt)
		if err != nil {
			return nil, err
		}
		posts = append(posts, post)
	}
	if err = rows.Err(); err != nil {
		return nil, err
	}
	return posts, nil
}


func (m *PostgresDBRepo) GetPostByID(id int) (*models.Post, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()

	query := `SELECT id, title, content, coalesce(image, ''), created_at, updated_at FROM posts WHERE id=$1`

	var post models.Post
	row := m.DB.QueryRowContext(ctx, query, id)

	err := row.Scan(&post.ID, &post.Title, &post.Content, &post.Image, &post.CreatedAt, &post.UpdatedAt)
	if err != nil {
		return nil, err
	}

	query = `select g.id, g.genre from posts_genres_users mg
		left join genres g on (g.id = mg.genre_id)
		where mg.post_id = $1
		order by g.genre`

	rows, err := m.DB.QueryContext(ctx, query, id)
	if err != nil && err != sql.ErrNoRows {
		return nil, err
	}
	defer rows.Close()

	var genres []*models.Genre
	for rows.Next() {
		var g models.Genre
		err := rows.Scan(&g.ID, &g.Genre)
		if err != nil {
			return nil, err
		}
		genres = append(genres, &g)
	
	}
	post.Genres = genres
	return &post, err
}

func (m *PostgresDBRepo) GetPostAndGenresByID(id int) (*models.Post, []*models.Genre, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()

	query := `SELECT id, title, content, coalesce(image, ''), created_at, updated_at FROM posts WHERE id=$1`

	var post models.Post
	row := m.DB.QueryRowContext(ctx, query, id)

	err := row.Scan(&post.ID, &post.Title, &post.Content, &post.Image, &post.CreatedAt, &post.UpdatedAt)
	if err != nil {
		return nil, nil, err
	}

	query = `select g.id, g.genre from posts_genres_users mg
		left join genres g on (g.id = mg.genre_id)
		where mg.post_id = $1
		order by g.genre`

	rows, err := m.DB.QueryContext(ctx, query, id)
	if err != nil && err != sql.ErrNoRows {
		return nil, nil, err
	}
	defer rows.Close()

	var genres []*models.Genre
	var genresArray []int
	for rows.Next() {
		var g models.Genre
		err := rows.Scan(&g.ID, &g.Genre)
		if err != nil {
			return nil, nil, err
		}
		genres = append(genres, &g)
		genresArray = append(genresArray, g.ID)
	}
	post.Genres = genres
	post.GenresArray = genresArray
	var allGenres []*models.Genre
	query = `SELECT id, genre FROM genres ORDER BY genre`
	grows, err := m.DB.QueryContext(ctx, query)
	if err != nil && err != sql.ErrNoRows {
		return nil, nil, err
	}
	defer rows.Close()

	for grows.Next() {
		var g models.Genre
		err := grows.Scan(&g.ID, &g.Genre)
		if err != nil {
			return nil, nil, err
		}
		allGenres = append(allGenres, &g)
	}

	return &post, allGenres, nil
}


func (m *PostgresDBRepo) GetUserByUsername(username string) (*models.User, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()

	query := `SELECT id, username, password, created_at, updated_at FROM users WHERE username=$1`

	var user models.User
	row := m.DB.QueryRowContext(ctx, query, username)

	
	err := row.Scan(&user.ID, &user.Username, &user.Password, &user.CreatedAt, &user.UpdatedAt)
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func (m *PostgresDBRepo) GetUserByID(id int) (*models.User, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()

	query := `SELECT id, username, password, created_at, updated_at FROM users WHERE id=$1`

	var user models.User
	row := m.DB.QueryRowContext(ctx, query, id)

	
	err := row.Scan(&user.ID, &user.Username, &user.Password, &user.CreatedAt, &user.UpdatedAt)
	if err != nil {
		return nil, err
	}
	return &user, nil
}