# GlobalTNA Job Request System

A full-stack job request management system built for the GlobalTNA Full-Stack Developer Internship Assessment.

## Tech Stack

### Frontend
- Next.js
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

---

# Features

- Create job requests
- View all job requests
- Filter jobs by category
- View job details
- Update job status
- Delete jobs
- REST API integration
- MongoDB database integration
- Responsive modern UI

---

# Project Structure

```bash
globaltna-assessment
│
├── backend
└── frontend
```

---

# Backend Setup

## Navigate to backend

```bash
cd backend
```

## Install dependencies

```bash
npm install
```

## Create .env file

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

## Run backend server

```bash
npm run dev
```

Backend runs on:

```bash
http://localhost:5000
```

---

# Frontend Setup

## Navigate to frontend

```bash
cd frontend
```

## Install dependencies

```bash
npm install
```

## Run frontend

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:3000
```

---

# API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/jobs | Get all jobs |
| GET | /api/jobs/:id | Get single job |
| POST | /api/jobs | Create new job |
| PATCH | /api/jobs/:id | Update job status |
| DELETE | /api/jobs/:id | Delete job |

---

# Author

P.A.A.P.G.S.Dilrukshi
University of Ruhuna
Bachelor of ICT (Hons)
Sri Lanka