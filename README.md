# IMovies — Full-Stack Project

This folder contains your existing React/Vite frontend and the Express/MongoDB backend. Open this main `IMovies-Full-Stack` folder in VS Code.

## Folder layout

- `frontend/` — existing IMovies React + Vite demo
- `backend/` — Express REST API, MongoDB models, JWT authentication and booking endpoints

## Requirements

- Node.js (18+ recommended) and npm
- MongoDB Community Server running locally, or a MongoDB Atlas URI

## Start backend

Open a VS Code terminal in the project root and run:

```powershell
cd backend
npm install
Copy-Item .env.example .env
```

Edit `backend/.env` and set `MONGODB_URI` and a strong `JWT_SECRET`. Then run:

```powershell
npm run dev
```

The API should be available at `http://localhost:5000`; health check: `http://localhost:5000/api/health`.

## Start frontend

Open a second terminal in VS Code, from the project root:

```powershell
cd frontend
npm install
npm run dev
```

Open the local URL Vite prints, typically `http://localhost:5173`.

## Important integration note

The included frontend is the existing demo and still uses local sample movie/booking state. The backend is included alongside it, but the current frontend UI has not yet been changed to call the API. API base URL for future integration: `http://localhost:5000/api`. The starter backend does not include a real payment gateway or transactional seat locking.

## Upload both folders to the same GitHub repository

From this project root, run `git status` first. If this folder is a fresh copy and not already a Git clone, use:

```powershell
git init
git add .
git commit -m "Add IMovies frontend and backend"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/imovies-frontend.git
git push -u origin main
```

Replace `YOUR_USERNAME`. If Git says a remote already exists, use `git remote -v` and keep the correct existing remote. If you are adding these folders to your existing cloned repository, copy the folders into that clone and run `git add .`, `git commit`, and `git push` there. Never upload `backend/.env`.
