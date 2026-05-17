# GlobalTNA Service Board

A full-stack job request management system built for the GlobalTNA Full-Stack Developer Internship Assessment. Recently upgraded with a refined UI/UX, advanced search, and dynamic ICT categorization.

## Tech Stack

### Frontend
- Next.js (App Router)
- React & TypeScript
- Tailwind CSS (with custom blue radial gradient UI)
- Axios & Lucide React (for icons)

### Backend
- Node.js
- Express.js
- MongoDB & Mongoose
- CORS & dotenv

---

## Key Features

- **Dynamic Job Board:** View, create, update status, and delete job requests.
- **Advanced Search & Filtering:**
  - Search by job title or description directly from the home page.
  - Filter jobs by comprehensive ICT categories.
  - Interactive, searchable datalist for categories including an "Other" option.
- **Refined UI/UX:**
  - Custom blue radial gradient background.
  - Responsive, modern design with clear card layouts.
  - Seamless "Back" button navigation for better user flow.
- **REST API Integration:** Fully connected frontend and backend.
- **Database:** MongoDB integration for robust data storage.

---

## Project Structure

```bash
globaltna-assessment
│
├── backend     # Node.js/Express API
└── frontend    # Next.js Application
```

---

## Setup Instructions

### 1. Backend Setup

Navigate to the backend directory:
```bash
cd backend
```

Install dependencies:
```bash
npm install
```

Create a `.env` file in the `backend` directory and add your MongoDB connection string:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Run the backend server:
```bash
npm run dev
```
*The backend will run on `http://localhost:5000`.*

### 2. Frontend Setup

Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
```

Install dependencies:
```bash
npm install
```

Run the frontend application:
```bash
npm run dev
```
*The frontend will run on `http://localhost:3000`.*

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/jobs` | Get all jobs |
| GET | `/api/jobs/:id` | Get single job details |
| POST | `/api/jobs` | Create a new job request |
| PATCH | `/api/jobs/:id` | Update job status |
| DELETE | `/api/jobs/:id` | Delete a job request |

---

## Author

P.A.A.P.G.S.Dilrukshi  
University of Ruhuna  
Bachelor of ICT (Hons)  
Sri Lanka