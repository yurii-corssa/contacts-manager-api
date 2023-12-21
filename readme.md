# Contacts Manager API

This REST API is designed for managing contact information. It allows users to create an account, log in, and perform CRUD operations on their contacts. The API is currently deployed at [https://contacts-backend-ivx4.onrender.com](https://contacts-backend-ivx4.onrender.com).

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT) for authentication
- Joi for request validation

## Live Deployment

The API is deployed on Render and can be accessed at [https://contacts-backend-ivx4.onrender.com](https://contacts-backend-ivx4.onrender.com). Feel free to interact with the API endpoints as described below.

## Installation

Clone the repository:

```bash
git clone https://github.com/yurii-corssa/contacts-manager-api.git
cd contacts-manager-api
```

Install the dependencies:

```bash
npm install
```

## Configuration

Create a `.env` file in the root directory and add the following variables:

- `DB_HOST` - MongoDB connection string
- `PORT` - Port number for the server (default: 3000)
- `SECRET_KEY` - Secret key for JWT

Refer to `.env.example` for an example configuration.

## Running the Server

To start the server in production mode:

```bash
npm start
```

To start the server in development mode:

```bash
npm run start:dev
```

## API Endpoints

### User Management

- POST `/api/users/register` - Register a new user
- POST `/api/users/login` - Log in a user
- POST `/api/users/logout` - Log out a user

### Contact Management

- GET `/api/contacts` - Get all contacts for the logged-in user
- POST `/api/contacts` - Create a new contact
- GET `/api/contacts/:contactId` - Get a specific contact
- PUT `/api/contacts/:contactId` - Update a specific contact
- DELETE `/api/contacts/:contactId` - Delete a specific contact
