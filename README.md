# AnkTask — Task Management App
 
> **Tus tareas, finalmente controladas.**  
> Plan, track, and complete your tasks with a system designed to follow your progress and keep you focused.
 
[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://task-master-wine-mu.vercel.app/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/3AeMe3/task-master)
[![TypeScript](https://img.shields.io/badge/TypeScript-95.7%25-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
 
---
 
## 📋 Table of Contents
 
- [Overview](#-overview)
- [Live Demo](#-live-demo)
- [Screenshots](#-screenshots)
- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Project Structure](#-project-structure)
---
 
## 🧠 Overview
 
AnkTask is a fullstack task management web application built as a portfolio project to deepen my skills in fullstack development with **Next.js** and **Express**. It lets users organize their work into projects, break them down into tasks and sub-tasks, attach colored tags, set priorities, and track dynamic progress — all behind a secure JWT-based authentication system.
 
The project is structured as a **monorepo** with a clear separation between frontend (`/frontend`) and backend (`/backend`), and is fully deployed on Vercel.
 
---
 
## 🌐 Live Demo
 
👉 [https://task-master-wine-mu.vercel.app/](https://task-master-wine-mu.vercel.app/)
 
---
 
## 📸 Screenshots
 
[https://imgur.com/a/c6Jk5S2](https://i.imgur.com/34LQ1BW.jpeg)
 
| Landing Page | Dashboard | Task Detail |
|---|---|---|
| https://i.imgur.com/5nQNJqj.png | https://i.imgur.com/C5DTPNP.png | https://i.imgur.com/cUYsj2y.png|
 
---
 
## 🛠 Tech Stack
 
### Frontend
 
| Technology | Purpose |
|---|---|
| **Next.js 16** | React framework with App Router |
| **React 19** | UI library |
| **TypeScript** | Type safety across the entire frontend |
| **TailwindCSS 4** | Utility-first styling |
| **Shadcn/ui + Radix UI** | Accessible, composable UI components |
| **Zustand** | Lightweight global state management |
| **React Hook Form + Zod** | Form handling and schema validation |
| **Recharts** | Data visualization and charts |
| **date-fns** | Date formatting and manipulation |
| **Sonner** | Toast notifications |
| **next-themes** | Dark / Light mode support |
| **cmdk** | Command palette |
| **react-day-picker** | Date picker component |
| **embla-carousel-react** | Carousel/slider component |
| **react-resizable-panels** | Resizable layout panels |
 
### Backend
 
| Technology | Purpose |
|---|---|
| **Express 5** | HTTP server and REST API |
| **TypeScript** | Type safety across the entire backend |
| **Prisma** | ORM for database access |
| **PostgreSQL** | Relational database |
| **JWT (jsonwebtoken)** | Authentication tokens |
| **bcrypt** | Password hashing |
| **Zod** | Request body validation |
| **cookie-parser** | HTTP cookie handling |
| **cors** | Cross-Origin Resource Sharing |
| **date-fns** | Date utilities |
| **dotenv** | Environment variable management |
 
---
 
## ✨ Features
 
### 🔐 Authentication
- Secure user registration and login
- JWT-based authentication stored in HTTP cookies
- Protected routes on both frontend and backend
### 📁 Projects
- Create, edit, and delete projects
- Dynamic progress bar that updates automatically based on task and sub-task completion
- Overview of all tasks grouped by project
### ✅ Tasks
- Create, edit, complete, and delete tasks
- Set task **priority** (High / Medium / Low)
- Assign **due dates** with a date picker
- Attach **colored tags** for visual organization
- Add **comments** to each task
### 🔖 Sub-Tasks
- Break down any task into smaller sub-tasks
- Progress percentage updates dynamically as sub-tasks are completed
### 🏷️ Tags
- Create custom tags with custom colors
- Add multiple tags to any task for multi-dimensional organization
### 🎨 UI / UX
- Dark / Light mode toggle
- Fully responsive design
- Toast notifications for all actions
- Command palette for quick navigation
- Smooth animations
---
 
## 📁 Project Structure
 
```
task-master/
├── frontend/               # Next.js application
│   ├── app/                # App Router pages & layouts
│   ├── components/         # Reusable UI components
│   ├── lib/                # Utilities and helpers
│   ├── store/              # Zustand global state
│   └── ...
│
├── backend/                # Express REST API
│   ├── src/
│   │   ├── routes/         # API route handlers
│   │   ├── controllers/    # Business logic
│   │   ├── middlewares/    # Auth and validation middleware
│   │   ├── prisma/         # Prisma schema and migrations
│   │   └── ...
│   └── ...
│
└── vercel.json             # Vercel deployment config
```
 
---
