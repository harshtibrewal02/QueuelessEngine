<p align="center">
  <img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI" />
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
  <img src="https://img.shields.io/badge/SQLAlchemy-D71F00?style=for-the-badge&logo=sqlalchemy&logoColor=white" alt="SQLAlchemy" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="TailwindCSS" />
</p>

<h1 align="center">QueueLess 🚀</h1>

<p align="center">
  <strong>A modern, full-stack Queue Management System that eliminates physical waiting lines.</strong><br/>
  Customers join virtual queues from their phone. Business owners manage operations from a live dashboard.
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-screenshots">Screenshots</a> •
  <a href="#%EF%B8%8F-tech-stack">Tech Stack</a> •
  <a href="#-architecture">Architecture</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-api-reference">API Reference</a> •
  <a href="#-contributing">Contributing</a>
</p>

---

## 🌟 Features

| Feature | Description |
|---------|-------------|
| 🔐 **JWT Authentication** | Secure registration & login with role-based access (Admin / Customer) |
| 🏪 **Business Management** | Admins create & configure their business, set avg service times, open/close queues |
| 📋 **Virtual Queue Joining** | Customers browse open businesses and join queues with a single tap |
| 📊 **Live Admin Dashboard** | Real-time queue monitoring with auto-polling every 3 seconds |
| 🔄 **Serve Next / Archive** | One-click patient progression and end-of-day queue archival |
| ⏱️ **Wait Time Estimation** | Automatic estimated wait time based on queue depth × avg service time |
| 🗄️ **Database Migrations** | Production-ready schema management with Alembic |
| 🌐 **Responsive UI** | Glassmorphism design with dark/light themes, fully mobile-friendly |

---

## 📸 Screenshots

### Frontend — Landing Page

> Modern glassmorphism design with gradient background. Customers can instantly join a queue or business owners can log in.

<p align="center">
  <img src="OutPuts/Screenshot 2026-04-14 031255.png" alt="QueueLess Landing Page" width="800"/>
</p>

---

### Frontend — Admin Dashboard (Live Operations)

> Real-time dashboard showing the currently serving customer, waiting count, estimated wait time, and a live patient list with status indicators.

<p align="center">
  <img src="OutPuts/Screenshot 2026-04-14 031128.png" alt="Admin Dashboard — Harsh's Coffee Store" width="800"/>
</p>

<p align="center">
  <img src="OutPuts/Screenshot 2026-04-14 031803.png" alt="Admin Dashboard — Shri Bnsiwala Sales Agency" width="800"/>
</p>

---

### Backend — Swagger UI (OAuth2 Authentication)

> FastAPI's auto-generated Swagger UI with OAuth2 password-flow authentication for testing protected endpoints.

<p align="center">
  <img src="OutPuts/Screenshot 2026-04-14 022418.png" alt="Swagger UI — OAuth2 Authorization" width="600"/>
</p>

---

### Database — Supabase Table Editor

> PostgreSQL database hosted on Supabase with full table views for `businesses` and `queue_entries`.

<p align="center">
  <img src="OutPuts/Screenshot 2026-04-14 032035.png" alt="Supabase — Businesses Table" width="800"/>
</p>

<p align="center">
  <img src="OutPuts/Screenshot 2026-04-14 032018.png" alt="Supabase — Queue Entries Table" width="800"/>
</p>

---

## 🛠️ Tech Stack

### Backend

| Technology | Purpose |
|---|---|
| [Python 3.x](https://www.python.org/) | Core language |
| [FastAPI](https://fastapi.tiangolo.com/) | High-performance async web framework |
| [SQLAlchemy 2.0](https://www.sqlalchemy.org/) | ORM & database toolkit |
| [Alembic](https://alembic.sqlalchemy.org/) | Database schema migrations |
| [PostgreSQL](https://www.postgresql.org/) | Production database |
| [Supabase](https://supabase.com/) | Hosted PostgreSQL + Dashboard |
| [Pydantic v2](https://docs.pydantic.dev/) | Request/response validation |
| [python-jose](https://github.com/mpdavis/python-jose) | JWT token creation & verification |
| [Passlib + bcrypt](https://passlib.readthedocs.io/) | Secure password hashing |
| [Uvicorn](https://www.uvicorn.org/) | ASGI server |

### Frontend

| Technology | Purpose |
|---|---|
| [Next.js 16](https://nextjs.org/) | React framework with App Router |
| [React 19](https://react.dev/) | UI component library |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe JavaScript |
| [Tailwind CSS 4](https://tailwindcss.com/) | Utility-first CSS framework |
| [Lucide React](https://lucide.dev/) | Icon library |

---

## 🏗 Architecture

```
QueuelessEngine/
├── backend/                    # FastAPI Backend Service
│   ├── app/
│   │   ├── main.py             # App entry point, CORS & router config
│   │   ├── database.py         # SQLAlchemy engine, session & settings
│   │   ├── models/
│   │   │   ├── user.py         # User model (id, name, email, role)
│   │   │   ├── business.py     # Business model (name, owner, service time)
│   │   │   └── queue.py        # QueueEntry model (customer, number, status)
│   │   ├── schemas/
│   │   │   ├── auth.py         # Registration & token schemas
│   │   │   ├── business.py     # Business create/response schemas
│   │   │   └── queue.py        # Queue join/status/serve schemas
│   │   ├── routes/
│   │   │   ├── auth.py         # POST /auth/register, POST /auth/login
│   │   │   ├── business.py     # CRUD /business/
│   │   │   └── queue.py        # Queue operations (join, next, clear, list)
│   │   └── utils/
│   │       ├── security.py     # Password hashing (bcrypt)
│   │       ├── jwt.py          # JWT token creation
│   │       └── deps.py         # Dependency injection (require_admin)
│   ├── alembic/                # Database migration scripts
│   ├── alembic.ini             # Alembic configuration
│   ├── requirements.txt        # Python dependencies
│   ├── Procfile                # Deployment configuration
│   └── .env                    # Environment variables (DATABASE_URL)
│
├── frontend/                   # Next.js Frontend Application
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx            # Landing page (glassmorphism hero)
│   │   │   ├── layout.tsx          # Root layout with global styles
│   │   │   ├── globals.css         # Design tokens & custom styles
│   │   │   ├── businesses/
│   │   │   │   └── page.tsx        # Public business listing
│   │   │   ├── queue/
│   │   │   │   └── [businessId]/   # Customer queue join page
│   │   │   └── admin/
│   │   │       ├── login/          # Admin login page
│   │   │       ├── register/       # Admin registration page
│   │   │       └── dashboard/
│   │   │           └── page.tsx    # Live admin dashboard
│   │   └── lib/
│   │       └── api.ts              # Centralized API fetch utility
│   ├── package.json
│   ├── tailwind.config.ts
│   └── tsconfig.json
│
└── OutPuts/                    # Application screenshots
```

---

## 🚀 Getting Started

Follow these instructions to get a local copy up and running.

### Prerequisites

- **Python** 3.8+
- **Node.js** 18+
- **PostgreSQL** database (or use [Supabase](https://supabase.com/) free tier)

### 1. Clone the Repository

```bash
git clone https://github.com/harshtibrewal02/QueuelessEngine.git
cd QueuelessEngine
```

### 2. Backend Setup

```bash
# Navigate to backend
cd backend

# Create and activate virtual environment
python -m venv venv

# Windows
venv\Scripts\activate

# macOS / Linux
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

**Configure environment variables** — create a `.env` file in the `backend/` directory:

```env
DATABASE_URL=postgresql://username:password@host:5432/your_database
```

> 💡 **Tip:** For quick local testing, the app falls back to SQLite automatically if no `DATABASE_URL` is set.

**Run database migrations:**

```bash
alembic upgrade head
```

**Start the backend server:**

```bash
uvicorn app.main:app --reload
```

The API will be available at:
- 🌐 **API:** [http://127.0.0.1:8000](http://127.0.0.1:8000)
- 📖 **Swagger Docs:** [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
- 📘 **ReDoc:** [http://127.0.0.1:8000/redoc](http://127.0.0.1:8000/redoc)

### 3. Frontend Setup

```bash
# Navigate to frontend (from project root)
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at [http://localhost:3000](http://localhost:3000).

---

## 📡 API Reference

### Authentication

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/auth/register` | ❌ | Register a new user (admin/customer) |
| `POST` | `/auth/login` | ❌ | Login with OAuth2 password flow, returns JWT |

### Business Management

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/business/` | 🔒 Admin | Create a new business |
| `GET` | `/business/` | ❌ | List all businesses with open queues |
| `GET` | `/business/my` | 🔒 Admin | Get the current admin's business |
| `GET` | `/business/{id}` | ❌ | Get a specific business by ID |

### Queue Operations

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/queue/join` | ❌ | Join a business queue (customer) |
| `GET` | `/queue/status/{business_id}` | ❌ | Get live queue status & wait time |
| `POST` | `/queue/next?business_id={id}` | 🔒 Admin | Serve the next customer in line |
| `GET` | `/queue/list/{business_id}` | 🔒 Admin | List all active queue entries |
| `PUT` | `/queue/archive/{queue_entry_id}` | 🔒 Admin | Archive a specific queue entry |
| `DELETE` | `/queue/clear?business_id={id}` | 🔒 Admin | End-of-day: archive all entries |

---

## 🔄 How It Works

```
                    ┌─────────────────────────────────────────────┐
                    │              Customer Flow                  │
                    │                                             │
                    │  Browse Businesses → Join Queue → Get       │
                    │  Queue Number → Track Wait Time             │
                    └──────────────────────┬──────────────────────┘
                                           │
                                  REST API (FastAPI)
                                           │
                    ┌──────────────────────┴──────────────────────┐
                    │             Admin Flow                      │
                    │                                             │
                    │  Login → Create Business → View Dashboard   │
                    │  → Call Next → Archive → Clear Queue        │
                    └─────────────────────────────────────────────┘
```

1. **Business Owner** registers and creates a business profile with avg service time.
2. **Customer** browses open queues, selects a business, and joins the virtual line.
3. The system assigns a **queue number** and calculates **estimated wait time**.
4. **Admin dashboard** polls every 3 seconds for real-time updates.
5. Admin clicks **"Call Next Patient"** to progress the queue.
6. At end of day, admin can **archive all entries** to start fresh tomorrow.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. **Fork** the repository
2. **Create** your feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

Feel free to check out the [issues page](https://github.com/harshtibrewal02/QueuelessEngine/issues).

---

## 📝 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

<p align="center">
  <strong>Harsh Tibrewal</strong><br/>
  <a href="mailto:harshtibrewal2003@gmail.com">harshtibrewal2003@gmail.com</a><br/>
  <a href="https://github.com/harshtibrewal02">GitHub Profile</a>
</p>

---

<p align="center">
  <sub>Built with ❤️ using FastAPI & Next.js</sub>
</p>
