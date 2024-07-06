# Journaling App Service

This is a Node.js backend service for a journaling application. The service provides API endpoints for user authentication, journal entry management, and other related functionalities.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [License](#license)

## Features

- User authentication (login and registration)
- Create, read, update, and delete journal entries
- Secure password hashing with SHA-256
- Token-based authentication with JWT

## Installation

### Prerequisites

- Node.js (version 14 or later)
- npm (version 6 or later)
- MySQL database

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/Absalom16/journaling-app---backend
   cd journaling-app---backend
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and configure the following environment variables:

   ```plaintext
   DB_HOST=your_database_host eg localhost
   DB_USER=your_database_username
   DB_PASSWORD=your_database_password
   DB_NAME=your_database_name
   JWT_SECRET=your_jwt_secret
   PORT=port_number
   ```

## Usage

### Running the Server

To start the server, start your mySQL server first and run the following command:

```bash
node index.js
```

The server will start on the port specified in the `.env` file (default is 3000).

## API Endpoints

### Authentication

- **POST** `api/auth/register`: Register a new user

  - Request Body: `{ "username": "yourusername", "password": "yourpassword" }`
  - Response: `{ message: "User created" }`

- **POST** `api/auth/login`: Login an existing user
  - Request Body: `{ "username": "yourusername", "password": "yourpassword" }`
  - Response: `{ "user": { "id": "userid", "username": "yourusername" }, "token": "jwt_token" }`

### Journal Entries

- **GET** `api/journal/entries`: Get all journal entries

  - Response: `[ { "id": "entryid", "title": "entrytitle", "content": "entrycontent", "category": "entrycategory", "date": "entrydate" } ]`
  - Headers: `{ "Authorization": "Bearer jwt_token" }`

- **POST** `api/journal/entries`: Create a new journal entry

  - Request Body: `{ "title": "entrytitle", "content": "entrycontent", "category": "entrycategory" }`
  - Response: `{ "id": "entryid", "title": "entrytitle", "content": "entrycontent", "category": "entrycategory", "date": "entrydate" }`
  - Headers: `{ "Authorization": "Bearer jwt_token" }`

- **PUT** `api/journal/entries/:id`: Update an existing journal entry

  - Request Body: `{ "title": "entrytitle", "content": "entrycontent", "category": "entrycategory" }`
  - Response: `{ "id": "entryid", "title": "entrytitle", "content": "entrycontent", "category": "entrycategory", "date": "entrydate" }`
  - Headers: `{ "Authorization": "Bearer jwt_token" }`

- **DELETE** `api/journal/entries/:id`: Delete a journal entry
  - Response: `{ "message": "Entry deleted successfully" }`
  - Headers: `{ "Authorization": "Bearer jwt_token" }`

### Summary

- **GET** `api/summary/`: Get all journal entries based on specific period.

- Response: `{ totalEntries, categories }`
- Headers: `{ "Authorization": "Bearer jwt_token" }`

### Profile

- **PUT** `api/profile/`: Update profile

- Request Body: `{ "username": "username", "password": "password"}`
- Response: `{ message: "Profile updated successfully" }`
- Headers: `{ "Authorization": "Bearer jwt_token" }`
