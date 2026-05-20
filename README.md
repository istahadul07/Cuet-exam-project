# Full Stack Student Management Project

This is a complete Full Stack Web Development final examination project using:

- Node.js
- Express.js
- MongoDB
- Mongoose
- HTML, CSS, JavaScript frontend
- Postman-ready API routes

## Folder Structure

```text
fullstack-student-project/
├── basic-http-server.js
├── server.js
├── package.json
├── .env.example
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
└── README.md
```

## 1. Install Dependencies

```bash
npm install
```

## 2. Create `.env` File

Copy `.env.example` and rename it to `.env`.

```env
PORT=4000
MONGODB_URI=mongodb://127.0.0.1:27017/studentDB
```

## 3. Start MongoDB

If you use local MongoDB, make sure MongoDB is running.

```bash
mongod
```

If you use MongoDB Compass, connect with:

```text
mongodb://127.0.0.1:27017
```

Database name will be:

```text
studentDB
```

## 4. Run Full Stack Project

```bash
npm start
```

or development mode:

```bash
npm run dev
```

Then open browser:

```text
http://localhost:4000
```

Terminal should show:

```text
MongoDB Connected Successfully
Full Stack Server running at http://localhost:4000
```

## 5. Section 1 Basic HTTP Server

Run separately:

```bash
npm run http-server
```

Browser routes:

```text
http://localhost:3000/
http://localhost:3000/about
http://localhost:3000/anything
```

## 6. Express Routes

```text
GET http://localhost:4000/api/home
GET http://localhost:4000/api/contact
GET http://localhost:4000/api/services
```

## 7. Dummy Student API for Postman

```text
GET    http://localhost:4000/students
POST   http://localhost:4000/students
PUT    http://localhost:4000/students
DELETE http://localhost:4000/students
```

Example POST body:

```json
{
  "name": "Rahim",
  "email": "rahim@gmail.com",
  "age": 22
}
```

## 8. MongoDB Insert API

```text
POST http://localhost:4000/add-student
```

Body > raw > JSON:

```json
{
  "name": "Rahim",
  "email": "rahim@gmail.com",
  "age": 22
}
```

## 9. Full MongoDB CRUD API

```text
GET    http://localhost:4000/api/students
POST   http://localhost:4000/api/students
PUT    http://localhost:4000/api/students/:id
DELETE http://localhost:4000/api/students/:id
```

For PUT and DELETE, replace `:id` with MongoDB student `_id`.

## 10. Screenshot Submission Checklist

Take screenshots of:

1. Terminal after running `npm install`
2. Terminal showing `MongoDB Connected Successfully`
3. Browser frontend page
4. Postman GET `/students`
5. Postman POST `/add-student`
6. MongoDB Compass showing `studentDB` and inserted student data
"# Cuet-exam-project" 
