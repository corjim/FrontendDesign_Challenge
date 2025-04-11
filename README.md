# Yodlr Admin Portal

Yodlr Admin Portal is a full-stack web application that allows users to sign up and admins to manage those users through a simple and responsive interface.

Built using **React** for the frontend and **Node.js/Express** with **PostgreSQL** on the backend, the app enables user registration, login, admin-only access, user approval, deletion, and live search functionality.

---

## Features

- User signup with first name, last name, and email
- Admin registration and authentication
- Admin dashboard to:
- View all users
- Search for users by name or email
- Edit user state (e.g., approve)
- Delete users
- Protected routes for admins only
- Responsive UI styled with **Bootstrap**

---

## Tech Stack

### Frontend
- React
- React Router
- Bootstrap / React-Bootstrap

### Backend
- Node.js
- Express.js
- PostgreSQL
- JSON Schema for validation

---

## 📁 Project Structure

yodlr-portal/ ├── client/ # React frontend │ ├── components/ │ ├── Api/ │ └── App.js ├── server/ # Express backend │ ├── routes/ │ ├── models/ │ ├── db.js │ └── server.js ├── schema.sql # PostgreSQL table setup and seed data └── README.md


## Setup the Backend
- cd server
- npm install
- createdb yodlr
- psql yodlr < schema.sql
- npm start


## Setup the Frontend

- cd ../client
- npm install
- npm start

