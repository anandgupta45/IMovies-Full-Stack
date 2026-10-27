# IMovies Backend (Node.js + Express + MongoDB)

A starter REST API for the IMovies movie-ticket-booking frontend. It includes registration/login with JWT, movie listing/search/filtering, admin-only movie CRUD, and a basic authenticated booking flow.

## Requirements

- Node.js 16 or newer (Node.js 20 LTS is recommended)
- npm
- MongoDB Community Server running locally, or a MongoDB Atlas connection string
- VS Code

## 1. Open the backend folder

1. Extract `imovies-backend.zip`.
2. In VS Code choose **File → Open Folder** and select `imovies-backend`.
3. Open **Terminal → New Terminal**.

## 2. Install packages

```bash
npm install
```

## 3. Configure environment variables

In the backend folder, copy `.env.example` and name the copy `.env`.

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Open `.env` and set:
- `MONGODB_URI=mongodb://127.0.0.1:27017/imovies` for local MongoDB, or your Atlas connection string.
- `JWT_SECRET` to a long random secret. Never publish `.env` to GitHub.
- `CLIENT_URL` to your frontend origin. For Vite, this is often `http://localhost:5173`; for Create React App, use `http://localhost:3000`.

## 4. Start MongoDB

If MongoDB Community Server is installed as a Windows service, start it from **Services** (look for **MongoDB Server**) or run PowerShell as Administrator:

```powershell
net start MongoDB
```

If you use MongoDB Atlas, make sure the database user and network access are configured and use the Atlas URI in `.env`.

## 5. Run the API

Development mode (auto-restarts when files change):

```bash
npm run dev
```

Or normal mode:

```bash
npm start
```

Expected terminal output:
- `MongoDB connected`
- `IMovies API running at http://localhost:5000`

Open `http://localhost:5000` or `http://localhost:5000/api/health` in your browser to check the server.

## 6. Add sample movies (optional)

Keep the server stopped or open another terminal, then run:

```bash
npm run seed
```

This inserts three sample movies. Restart the API afterward if needed.

## API endpoints

| Method | Endpoint | Auth | Purpose |
|---|---|---|---|
| GET | `/api/health` | No | Health check |
| POST | `/api/auth/register` | No | Create a user |
| POST | `/api/auth/login` | No | Login and receive JWT |
| GET | `/api/auth/me` | Bearer token | Current user |
| GET | `/api/movies` | No | List movies; supports `search`, `genre`, `language`, `page`, `limit` |
| GET | `/api/movies/:id` | No | Movie details |
| POST | `/api/movies` | Admin token | Create movie |
| PATCH | `/api/movies/:id` | Admin token | Update movie |
| DELETE | `/api/movies/:id` | Admin token | Deactivate movie |
| POST | `/api/bookings` | Bearer token | Create a basic booking |
| GET | `/api/bookings/my` | Bearer token | List your bookings |
| PATCH | `/api/bookings/:id/cancel` | Bearer token | Cancel your booking |

### Register example

POST `http://localhost:5000/api/auth/register`, Body → raw → JSON:

```json
{
  "name": "Anand",
  "email": "anand@example.com",
  "password": "ExamplePass123"
}
```

### Login example

POST `http://localhost:5000/api/auth/login`:

```json
{
  "email": "anand@example.com",
  "password": "ExamplePass123"
}
```

Copy the returned `token`. For protected routes, add header:

`Authorization: Bearer YOUR_TOKEN_HERE`

## Connect the frontend

In your React frontend, use this API base URL:

```js
const API_BASE_URL = "http://localhost:5000/api";
```

Example with Axios:

```js
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/api"
});
```

The exact property names expected by your existing frontend may differ; adjust the frontend requests or tell me its folder structure so I can align the endpoints precisely.

## Important project limitations

- This is a learning/starter backend, not a production-ready ticketing/payment system.
- Payment gateway integration is not included; booking responses explicitly state payment is not integrated.
- Seat availability is not yet locked transactionally. Before real use, implement show-specific seat inventory, atomic booking/seat locking, cancellation rules, and payment-provider webhooks.
- Admin role creation is intentionally not exposed as a public registration option. For local development, create an admin user manually in MongoDB or add a protected admin-provisioning workflow.
- Use a strong secret, keep `.env` private, and do not commit credentials to GitHub.
