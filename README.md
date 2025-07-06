# 📝 NoteTask

A full-stack, dockerized task manager app built with **React**, **Express**, and **MySQL**. NoteTask allows users to create, search, complete, and delete tasks with a beautiful animated UI and theme toggle (light/dark mode). Designed for a clean user experience and performance, the app supports pagination, filtering, and modular frontend-backend separation.

---

## 🚀 Features

- ✅ Create, view, delete, and complete tasks
- 🌈 Light/Dark theme toggle
- 🔍 Search tasks by title or description
- 📦 Pagination (Load More)
- ⚡ Concurrent development with `concurrently`
- 🐳 Dockerized for easy setup and deployment
- 🧠 Responsive and animated modern UI with Tailwind CSS
- 🗄️ Backend powered by Express.js and MySQL

---

## 📁 Project Structure

notetask/
│
├── backend/
│ ├── controllers/
│ │ └── TaskController/
│ ├── models/
│ │ └── TaskModel/
│ ├── routes/
│ │ └── TaskRoute/
│ ├── config
│ │ └── Db/
│ └── index.js
│
├── frontend/
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │   └── TaskForm/
│ │   └── TaskItem/
│ │   └── TaskList/
│ │   └── ThemeToggle/
│ │ ├── pages/
│ │   └── Index.js/
│ └── package.json
│
├── docker-compose.yml
├── Dockerfile (backend)
├── Dockerfile (frontend)
├── .env
└── README.md

yaml
Copy
Edit

---

## 🛠️ Technologies

- **Frontend**: React, Tailwind CSS, Lucide Icons
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Dev Tools**: Docker, concurrently, ESLint
- **Deployment**: Docker Compose

---

## 🐳 Docker Setup

### Prerequisites

- Docker & Docker Compose installed

### Steps

```bash
# Clone the repo
git clone https://github.com/yrgamage/NoteTask.git
cd notetask

# Build and start containers
docker-compose up --build
The frontend will be available at: http://localhost:5173
The backend API will be available at: http://localhost:3000

⚙️ Environment Variables
Create a .env file in the backend folder with:

ini
Copy
Edit
DB_HOST=db
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=notetask
PORT=3000
💻 Running Locally (Non-Docker)
In one terminal:

bash
Copy
Edit
cd backend
npm install
npm run dev
In another:

bash
Copy
Edit
cd frontend
npm install
npm 
This works using concurrently when started via:

bash
Copy
Edit
npm run start

📦 API Endpoints
Method	Route	Description
GET	/api/tasks	Get all tasks
POST	/api/tasks	Create a new task
DELETE	/api/tasks/:id	Delete a task

📸 UI Highlights
Clean gradient background

Mobile responsive layout

Dark/light theme toggle

🧑‍💻 Author
Yoshani Gamage

yaml
Copy
Edit

---