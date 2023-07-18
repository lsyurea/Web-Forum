module backend

go 1.19

require github.com/go-chi/chi/v5 v5.0.8 // direct

require (
	github.com/golang-jwt/jwt/v4 v4.4.3
	github.com/jackc/pgconn v1.13.0
	github.com/jackc/pgx/v4 v4.17.2
	golang.org/x/crypto v0.11.0
)

require (
	github.com/jackc/chunkreader/v2 v2.0.1 // indirect
	github.com/jackc/pgio v1.0.0 // indirect
	github.com/jackc/pgpassfile v1.0.0 // indirect
	github.com/jackc/pgproto3/v2 v2.3.1 // indirect
	github.com/jackc/pgservicefile v0.0.0-20200714003250-2b9c44734f2b // indirect
	github.com/jackc/pgtype v1.12.0 // indirect
	golang.org/x/text v0.11.0 // indirect
)
