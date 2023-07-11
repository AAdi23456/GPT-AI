# GPT-AI

## Usage

1. Install the dependencies: `npm install`.
2. Set up the environment variables in a `.env` file.
3. Start the server: `npm start`.
4. Access the API at `http://localhost:8080`.

## Deployed Application

The application is deployed and can be accessed at [https://giddy-shirt-eel.cyclic.app](https://giddy-shirt-eel.cyclic.app). Please visit the link to access the live version of the application.


Brief description of the project.

## Routes

### `POST /interview/feedback`

Endpoint to provide feedback on a question and answer.

**Request Body**

```json
{
  "question": "string",
  "answer": "string",
  "email": "string"
}
```

**Response**

- 200 OK: Feedback successfully submitted.
  - Response Body:
    ```json
    {
      "bot": "string"
    }
    ```

- 500 Internal Server Error: Something went wrong.

### `POST /interview/questions`

Endpoint to generate a unique random question related to a specific technology.

**Request Body**

```json
{
  "tech": "string"
}
```

**Response**

- 200 OK: Question generated successfully.
  - Response Body:
    ```json
    {
      "bot": "string"
    }
    ```

- 500 Internal Server Error: Something went wrong.

### `GET /interview/allfeedbacks`

Endpoint to retrieve all feedbacks associated with a specific user.

**Request Parameters**

- email: User's email.

**Response**

- 200 OK: Feedbacks retrieved successfully.
  - Response Body: Array of feedback objects.

- 500 Internal Server Error: Something went wrong.



### `POST /auth`

Endpoint for user registration and authorization.

**Request Body**

```json
{
  "username": "string",
  "password": "string",
  "email": "string"
}
```

**Response**

- 200 OK: User registered and authorized successfully.

- 500 Internal Server Error: Something went wrong.

### `POST /github`

Endpoint for GitHub integration.

**Request Body**

```json
{
  "username": "string",
  "repository": "string"
}
```

**Response**

- 200 OK: GitHub integration successful.

- 500 Internal Server Error: Something went wrong.

To create a raw README file for the provided routes, you can use the following template:

```
# Project Name

Brief description of the project.

## Routes

### `POST /auth/signup`

Endpoint for user registration.

**Request Body**

```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

**Response**

- 200 OK: Registration successful.
  - Response Body:
    ```json
    {
      "msg": "Registration successful"
    }
    ```

- 401 Unauthorized: User already exists.

- 500 Internal Server Error: Something went wrong.

### `POST /auth/login`

Endpoint for user login.

**Request Body**

```json
{
  "email": "string",
  "password": "string"
}
```

**Response**

- 200 OK: Login successful.
  - Response Body:
    ```json
    {
      "msg": "Login successful!",
      "token": "string",
      "name": "string"
    }
    ```

- 400 Bad Request: Wrong credentials.

- 500 Internal Server Error: Something went wrong.

### `POST /auth/logout`

Endpoint for user logout.

**Request Body**

```json
{
  "token": "string"
}
```

**Response**

- 200 OK: Logout successful.
  - Response Body:
    ```json
    {
      "msg": "Logout successful"
    }
    ```

- 400 Bad Request: Something went wrong.

- 500 Internal Server Error: Something went wrong.

