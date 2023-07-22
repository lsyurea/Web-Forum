# Weebs - A one stop web forum for anime fanatics

To begin the project locally:

1. Clone this project

2. Navigate to web-forum-frontend
3. Run npm install to download the dependencies
4. Set up your .env file with REACT_APP_BACKEND=http://localhost:8080

5. Navigate back to the root directory
6. Execute cd web-forum-back-end && docker-compose up -d
7. Then execute go run ./cmd/api && cd ../web-formum-front-end && npm start to start development build
