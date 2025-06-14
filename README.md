# HallHive

HallHive is a full-stack web application designed to manage room approvals and user authentication for halls. It uses a React frontend, a Node.js/Express backend, and a MySQL database.

## Features

- User signup and login
- Room approval workflow
- Secure backend with RESTful API
- MySQL database for data storage

## Prerequisites

- Node.js (v14+ recommended)
- npm (comes with Node.js)
- MySQL server

## Setup Instructions

### 1. Clone the Repository

```sh
git clone https://github.com/sumitradas102/hallhive.git
cd hallhive
```

### 2. Database Setup (MySQL)

- Ensure MySQL server is running.
- Create a new database (e.g., `hallhive`).
- Import the schema:

```sh
mysql -u <your_mysql_user> -p < database/sql.sql
```

- Update database connection settings in `hallhive-backend/db.js` (host, user, password, database).

### 3. Backend Setup

```sh
cd hallhive-backend
npm install
# Create a .env file if needed for environment variables (e.g., DB credentials, JWT secret)
npm start
```

### 4. Frontend Setup

Open a new terminal:

```sh
cd hallhive-client
npm install
npm start
```

The frontend will run at [http://localhost:5174](http://localhost:5173) by default.

## Usage

1. Open your browser and go to [http://localhost:5174](http://localhost:5174)
2. Sign up or log in.
3. Use the interface to manage room approvals.

## Project Structure

```
hallhive/
├── hallhive-backend/      # Node.js/Express backend
│   ├── db.js              # MySQL database connection
│   └── ...                # Backend source files
├── hallhive-client/       # React frontend
│   └── src/pages/         # Main pages (Login, Signup, RoomApprove, etc.)
├── database/
│   └── sql.sql            # MySQL schema and setup script
└── README.md
```
