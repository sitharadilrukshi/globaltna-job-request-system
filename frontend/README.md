# GlobalTNA Service Board

Hi there! 👋 This is my submission for the GlobalTNA Full-Stack Developer Internship Assessment. I built this job request management system to handle creating, viewing, updating, and deleting service requests. 

I've also added a few extra touches like a search feature, custom ICT categories, and a clean UI because I wanted it to feel like a real-world product.

## What it does

- **Manage Requests:** You can create new job requests, view their details, update their information (or just their status), and delete them.
- **Search & Filter:** Added a search bar on the home page so you can quickly find jobs by title or description. You can also filter them by specific ICT categories.
- **Modern UI:** I used Tailwind CSS to build a clean, responsive interface with a nice blue radial gradient background.

## The Tech Stack

I went with a standard MERN-like stack, but swapped out React for Next.js on the frontend for better routing.

**Frontend:**
- Next.js (App Router)
- React & TypeScript
- Tailwind CSS 
- Axios (for API calls) & Lucide React (for icons)

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose
- CORS & dotenv

## Project Structure

Here is a quick look at how the project is organized:

```text
globaltna-assessment
│
├── backend/     # Node.js and Express API server
└── frontend/    # Next.js application (App Router)
```

---

## How to run it locally

The project is split into two folders: `frontend` and `backend`. You'll need two terminal windows to run them both.

### 1. Start the Backend

First, open a terminal and go into the backend folder:
```bash
cd backend
```

Install the packages:
```bash
npm install
```

Create a `.env` file in the `backend` folder and add your MongoDB connection string like this:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Start the server:
```bash
npm run dev
```
*(It should now be running on `http://localhost:5000`)*

### 2. Start the Frontend

Open your second terminal and go into the frontend folder:
```bash
cd frontend
```

Install the packages:
```bash
npm install
```

Start the app:
```bash
npm run dev
```
*(The UI will be running on `http://localhost:3000`)*

---

## API Routes

If you want to test the backend directly (e.g., using Postman), here are the available endpoints:

| Method | Endpoint | What it does |
|---|---|---|
| GET | `/api/jobs` | Fetches all job requests |
| GET | `/api/jobs/:id` | Fetches details for a single job |
| POST | `/api/jobs` | Creates a new job request |
| PATCH | `/api/jobs/:id` | Updates a job (details or just status) |
| DELETE | `/api/jobs/:id` | Deletes a job request |

---

## About Me

**P.A.A.P.G.S.Dilrukshi**  
University of Ruhuna  
Bachelor of ICT (Hons)  
Sri Lanka