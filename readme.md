# Contacts Manager API

This REST API is designed for managing contact information. It allows users to create an account, log in, perform CRUD operations on their contacts, and supports email verification for account registration. The API is currently deployed at [https://contacts-backend-ivx4.onrender.com](https://contacts-backend-ivx4.onrender.com).

## Technologies Used

- **Node.js**: As the runtime environment for the application.
- **Express.js**: Used to build the web server and manage routes.
- **MongoDB with Mongoose**: For database management. Mongoose is used for schema definition and data validation.
- **JSON Web Tokens (JWT)**: For secure authentication.
- **Joi**: For request validation, ensuring that incoming requests follow the expected format.
- **Nodemailer**: For sending out email verifications to users upon registration.
- **Bcrypt**: For hashing and securing user passwords.
- **Morgan**: As an HTTP request logger middleware for Node.js.
- **Dotenv**: To manage environment variables.
- **Cross-env**: To set and use environment variables across different platforms.
- **Jimp**: For image processing tasks.
- **Multer**: For handling multipart/form-data, primarily used for uploading files.

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
- Additional environment variables for email service configuration

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

- POST `/api/auth/register` - Register a new user. Requires username, email, and password. Initiates email verification process.
- POST `/api/auth/login` - Log in a user. Requires email and password.
- POST `/api/auth/logout` - Log out a user. Requires a valid JWT.
- GET `/api/auth/verify/:verificationToken` - Verify user's email using the verification token sent to the user's email.
- POST `/api/auth/verify` - Resend the email verification. Requires user's email.
- GET `/api/auth/current` - Get current user's information. Requires a valid JWT.
- PATCH `/api/users/avatars` - Update user's avatar. Requires a valid JWT and image file.
- PATCH `/api/users/subscription` - Update user's subscription type. Requires a valid JWT and new subscription type.

### Contact Management

- GET `/api/contacts` - Retrieve all contacts for the logged-in user. Requires a valid JWT.
- POST `/api/contacts` - Create a new contact. Requires a valid JWT and contact details (name, email, phone, etc.).
- GET `/api/contacts/:contactId` - Retrieve a specific contact. Requires a valid JWT and contact's ID.
- PUT `/api/contacts/:contactId` - Update a specific contact. Requires a valid JWT, contact's ID, and new contact details.
- DELETE `/api/contacts/:contactId` - Delete a specific contact. Requires a valid JWT and contact's ID.
- PATCH `/api/contacts/:contactId/favorite` - Update a contact's favorite status. Requires a valid JWT, contact's ID, and new favorite status.
