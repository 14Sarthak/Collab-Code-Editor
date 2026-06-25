# 🖥️ CodeSync

> A real-time collaborative code editor that enables multiple developers to code together seamlessly.

[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)](https://nodejs.org/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-Real--Time-black?logo=socket.io)](https://socket.io/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-green?logo=mongodb)](https://www.mongodb.com/)
[![Vercel](https://img.shields.io/badge/Frontend-Vercel-black?logo=vercel)](https://vercel.com/)
[![Render](https://img.shields.io/badge/Backend-Render-46E3B7?logo=render)](https://render.com/)

---

## 🌐 Live Demo

**Frontend:** https://collab-code-editor-cdl1.vercel.app/

**Backend:** https://collab-code-editor-myp7.onrender.com/

---

## 📖 Overview

CodeSync is a full-stack real-time collaborative code editor that allows multiple users to join the same coding session and edit code simultaneously.

Each session is identified by a unique Room ID that can be shared with teammates. The application synchronizes code changes instantly using Socket.IO, making it suitable for collaborative programming, interview practice, pair programming, and learning.

---

# ✨ Features

- 🚀 Create unique coding sessions
- 👥 Join existing sessions using a Room ID
- ⚡ Real-time code synchronization
- 🔄 Multi-user collaboration
- 🎨 User avatars with unique colors
- 📋 One-click Room ID sharing
- 💾 Automatic session persistence using MongoDB
- 🌍 Fully deployed on Vercel + Render
- 📱 Responsive interface

---

# 📸 Screenshots

## Home Page

![Home](screenshots/home.png)

---

## Collaborative Editor

![Editor](screenshots/editor.png)

---

## Live Collaboration

![Collaboration](screenshots/collaboration.png)

---

# 🛠️ Tech Stack

### Frontend

- React
- Vite
- React Router
- Axios
- Socket.IO Client

### Backend

- Node.js
- Express.js
- Socket.IO
- MongoDB Atlas
- Mongoose

### Deployment

- Vercel
- Render

---

# 📂 Project Structure

```
Collab-Code-Editor
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── routes/
│   ├── socket/
│   ├── models/
│   ├── db.js
│   └── package.json
│
├── screenshots/
│   ├── home.png
│   ├── editor.png
│   └── collaboration.png
│
└── README.md
```

---

# ⚙️ Installation

## Clone the repository

```bash
git clone https://github.com/14Sarthak/Collab-Code-Editor.git
```

## Backend

```bash
cd server
npm install
```

Create a `.env` file:

```env
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
PORT=8081
```

Run the backend:

```bash
npm start
```

---

## Frontend

```bash
cd client
npm install
```

Create `.env`

```env
VITE_API_URL=http://localhost:8081
VITE_SOCKET_URL=http://localhost:8081
```

Run:

```bash
npm run dev
```

---

# 🚀 Usage

1. Start the backend server.
2. Start the frontend.
3. Open the application.
4. Enter your name.
5. Create a new session.
6. Share the generated Room ID.
7. Another user joins using the same Room ID.
8. Start collaborating in real time.

---

# 🔄 How It Works

1. User creates a coding session.
2. Backend generates a unique Room ID.
3. Socket.IO connects all users in the room.
4. Every code update is broadcast instantly.
5. MongoDB stores the latest session state.
6. Users joining later receive the current code automatically.

---

# 🔮 Future Enhancements

- 🔹 Integrated online code execution
- 🔹 Syntax themes
- 🔹 Chat system
- 🔹 Voice collaboration
- 🔹 Cursor tracking
- 🔹 File explorer
- 🔹 Multiple files support
- 🔹 Authentication
- 🔹 Version history

---

# 📈 Project Highlights

- Real-time collaboration using WebSockets
- Full-stack MERN architecture
- Persistent coding sessions
- Production deployment
- Clean and responsive UI
- Scalable room-based architecture

---
