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


// query all the posts from database with optional genre filter
func (m *PostgresDBRepo) GetPosts(genre ... int) ([]*models.Post, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()


	// first query refers to the post without genre or user property in table
	where := ""
	if len(genre) > 0 {
		where = fmt.Sprintf("WHERE id in (select post_id from posts_genres where genre_id = %d)", genre[0])
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

	// second query adds the genre and user property to the post
	return posts, nil
}

// query a single post with genres in it (posts/id)
func (m *PostgresDBRepo) OnePost(id int) (*models.Post, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()

	query := `SELECT id, title, content, coalesce(image, ''), created_at, updated_at FROM posts WHERE id=$1`

	var post models.Post
	row := m.DB.QueryRowContext(ctx, query, id)

	err := row.Scan(&post.ID, &post.Title, &post.Content, &post.Image, &post.CreatedAt, &post.UpdatedAt)
	if err != nil {
		return nil, err
	}

	// get genres
	query = `select g.id, g.genre from posts_genres_users pgu
		left join genres g on (pgu.genre_id = g.id)
		where pgu.post_id = $1
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


func (m *PostgresDBRepo) OnePostForEdit(id int) (*models.Post, []*models.Genre, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()

	// check if post exists
	query := `SELECT id, title, content, coalesce(image, ''), created_at, updated_at FROM posts WHERE id=$1`

	var post models.Post
	row := m.DB.QueryRowContext(ctx, query, id)

	err := row.Scan(&post.ID, &post.Title, &post.Content, &post.Image, &post.CreatedAt, &post.UpdatedAt)
	if err != nil {
		return nil, nil, err
	}

	// query for genres of selected post
	query = `select g.id, g.genre from posts_genres_users pgu
		left join genres g on (g.id = pgu.genre_id)
		where pgu.post_id = $1
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
	gRows, err := m.DB.QueryContext(ctx, query)
	if err != nil && err != sql.ErrNoRows {
		return nil, nil, err
	}
	defer gRows.Close()

	for gRows.Next() {
		var g models.Genre
		err := gRows.Scan(&g.ID, &g.Genre)
		if err != nil {
			return nil, nil, err
		}
		allGenres = append(allGenres, &g)
	}

	return &post, allGenres, err
}

func (m *PostgresDBRepo) GetPostsFromUser(id int) ([]*models.Post, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()


	query := `select p.id, p.title, p.content, p.image, p.created_at, p.updated_at from posts_genres_users pgu
	right join posts p on (pgu.id = p.id)
	where pgu.user_id = $1
	order by p.updated_at desc`

	rows, err := m.DB.QueryContext(ctx, query, id)

	if err != nil && err != sql.ErrNoRows {
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



// for authentication
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