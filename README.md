# Computerized-Accounting

Computerized Accounting is an MERN Stack application designed to handle REST API requests. It uses PostgreSQL as database storage. The User Interface is designed on React JS.

## Prerequisites

- Node.js and npm should be installed. You can download them from [here](https://nodejs.org/).
- PostgreSQL should be installed and running. You can download it from [here](https://www.postgresql.org/download/).

## Required Credentials

Create `.env` file in the root folder and insert the following variables as per local setup:

1. `PORT`: A non-occupied port on the local system to run the application.
2. `JWT_SECRET`: Setup a secret key for JWT Authentication Middleware.
3. `DATABASE_PORT`: The port number on which the local PostgreSQL is running.
4. `DATABASE_PASSWORD`: Your local database password.
5. `DATABASE_NAME`: The name of your database.
6. `DATABASE_HOST`: The URL to the server on which your database is running.
7. `DATABASE_USER`: The username for your database server.

## Setup Database 1:

Create a PostgreSQL database.

# Running the Backend Application
Install the dependencies by running:

```bash
npm install
```

To start the application, run:

```bash
cd backend
npm run server
```

The application will start on http://localhost:3000 by default.

## Database Setup 2:

Using Postman or any other API testing software, run the following APIs in order:

- `http://localhost:{your_port_number}/db/force`

## Running Frontend Application

Install the dependencies by running:

```bash
npm install
```

To start the React App run:

```bash
cd frontend
npm start
```
"# Computerized-Accounting" 
