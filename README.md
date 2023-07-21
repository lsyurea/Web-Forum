# Weebs - A one stop web forum for anime fanatics

To begin the project locally:

1. Clone this project

2. Navigate to web-forum-frontend
3. Run npm install to download the dependencies
4. Set up your .env file with REACT_APP_BACKEND=http://localhost:8080

5. Navigate back to the root directory
6. Execute cd web-forum-back-end && docker-compose up -d
7. Then execute go run ./cmd/api && cd ../web-formum-front-end && npm start to start development build

Sample of how the project looks like:

Login page:
![Screenshot 2023-07-21 at 1 52 59 PM](https://github.com/lsyurea/Web-Forum/assets/96010792/99c6cc54-6aca-4341-9bd1-33aad2aefe9c)

Create account page:
![Screenshot 2023-07-21 at 1 53 09 PM](https://github.com/lsyurea/Web-Forum/assets/96010792/b519c3ec-6c38-43dc-896f-dcffa49f620a)

If user is not logged in:

My Posts:
![Screenshot 2023-07-21 at 1 53 57 PM](https://github.com/lsyurea/Web-Forum/assets/96010792/d29159ad-e8ec-4a1f-b2f3-a12ff8529231)

Latest News:
![Screenshot 2023-07-21 at 1 54 06 PM](https://github.com/lsyurea/Web-Forum/assets/96010792/b765b44c-304e-43f9-b9b1-f134a5a68d00)


If user is logged in:

My Posts:
![Screenshot 2023-07-21 at 1 53 41 PM](https://github.com/lsyurea/Web-Forum/assets/96010792/4f091e92-8f59-474c-9241-df00a37ef4c8)

Latest News:
![Screenshot 2023-07-21 at 1 53 49 PM](https://github.com/lsyurea/Web-Forum/assets/96010792/36e025b0-01b2-4e28-bb61-d54bd10e8a9b)
