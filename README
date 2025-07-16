# Node.js Backend API

This project is a Node.js backend API built with TypeScript, Express, and PostgreSQL. It provides user authentication, profile management, and email verification features.

## Features

- User registration and login with JWT authentication
- Secure password hashing using bcrypt
- User profile creation and management
- Email verification token support
- Centralized error handling and logging (Winston)
- Request validation using Joi
- Environment-based configuration
- Graceful shutdown and middleware support

## Project Structure

```
.env
.gitignore
package.json
tsconfig.json
migrations/
  user.sql
src/
  index.ts
  config/
  db/
    models/
    queries/
  external/
  middlewares/
  services/
    auth/
  utils/
```

## Getting Started

### Prerequisites

- Node.js (v16+)
- PostgreSQL database

### Setup

1. **Clone the repository**

   ```sh
   git clone <repo-url>
   cd backend
   ```

2. **Install dependencies**

   ```sh
   npm install
   ```

3. **Configure environment variables**

   Edit `.env` and set your database connection string and JWT secret:

   ```
   POSTGRES_CONNECTION_URL=your_postgres_url
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRATION_TIME=86400
   PORT=8080
   HOST=localhost
   ```

4. **Run database migrations**

   Execute the SQL in [migrations/user.sql](migrations/user.sql) to set up tables.

5. **Build and start the server**

   ```sh
   npm run build
   npm start
   ```

   For development with auto-reload:

   ```sh
   npm run dev
   ```

## API Endpoints

- `GET /health` — Health check
- `POST /auth/signup` — Register new user
- `POST /auth/login` — Login user

## Technologies Used

- Express
- TypeScript
- PostgreSQL
- bcryptjs
- jsonwebtoken
- Joi
- Winston

## License

MIT

---

For more details, see the source files in [src/](src) and migration