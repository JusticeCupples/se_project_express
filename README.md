# Express + MongoDB

This template provides a minimal setup to get an Express server working with MongoDB, including JWT authentication and basic CRUD operations.

## Repository Structure

This project is split into two repositories:

- Frontend: [se_project_react](https://github.com/JusticeCupples/se_project_react)
- Backend: [se_project_express](https://github.com/JusticeCupples/se_project_express)

Each part of the project is maintained in its respective repository.

## Running the Project

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:
   ```sh
   git clone git@github.com:JusticeCupples/se_project_express.git
   cd se_project_express
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory and add the following content:
   ```plaintext
   NODE_ENV=production
   JWT_SECRET=your-generated-secret-key
   ```

4. Start the server:
   ```sh
   npm run start
   ```

### Development

To start the server in development mode with hot-reloading:

sh
npm run dev

### Linting

To run ESLint:

sh
npm run lint


## API Endpoints

### Authentication

- `POST /signup` - Register a new user
- `POST /signin` - Login a user

### Users

- `GET /users/me` - Get current user
- `PATCH /users/me` - Update current user

### Clothing Items

- `GET /items` - Get all clothing items
- `GET /items/user` - Get clothing items for the current user
- `POST /items` - Create a new clothing item
- `DELETE /items/:id` - Delete a clothing item
- `PUT /items/:id/likes` - Like a clothing item
- `DELETE /items/:id/likes` - Dislike a clothing item

## Domain

[jc-wtwr.crabdance.com](http://jc-wtwr.jumpingcrab.com/)
[www.jc-wtwr.crabdance.com](http://www.jc-wtwr.jumpingcrab.com/)
[api.jc-wtwr.crabdance.com](http://api.jc-wtwr.jumpingcrab.com/)
