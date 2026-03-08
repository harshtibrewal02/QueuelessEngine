# Queueless 🚀

> A modern, efficient Queue Management System designed to reduce physical waiting time and handle requests in a structured, scalable way.

---

## 📸 Screenshots

 <img width="1352" height="640" alt="image" src="https://github.com/user-attachments/assets/d66068c2-e287-4574-956f-b8e652ddb4e3" />

  <img width="1282" height="861" alt="image" src="https://github.com/user-attachments/assets/b761d44b-42e7-4eb8-9079-b1f07a66ed74" />
 

## 🌟 Features

- **Real-Time Queue Management**: Seamlessly handle and monitor queues.
- **Fast & Scalable Backend**: Powered by Python, FastAPI, and PostgreSQL.
- **Modern & Responsive UI**: Built with React and Vite for blazing-fast performance.
- **RESTful API**: Clean, well-documented API with Swagger UI auto-generation.

---

## 🛠️ Tech Stack

**Backend:**
- [Python 3.x](https://www.python.org/)
- [FastAPI](https://fastapi.tiangolo.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [SQLAlchemy (ORM)](https://www.sqlalchemy.org/)

---

## 📂 Project Structure

```text
queueless/
├── backend/            # FastAPI backend service
│   ├── app/            # Application logic (routes, models, schemas)
│   ├── requirements.txt# Python dependencies
│   ├── Procfile        # Deployment configuration
│   └── README.md       # Backend-specific documentation
```

---

## 🚀 Getting Started

Follow these instructions to get a local copy of the project up and running.

### Prerequisites

- Python 3.8+
- PostgreSQL database

### 1. Clone the repository

```bash
git clone https://github.com/your-username/queueless.git
cd queueless
```

### 2. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Setup environment variables:
   - Create a `.env` file in the `backend` folder.
   - Add your database URL. Example:
     ```env
     DATABASE_URL=postgresql://username:password@localhost:5432/queueless_db
     ```
5. Run the FastAPI development server:
   ```bash
   uvicorn app.main:app --reload
   ```

*The backend API will be available at [http://127.0.0.1:8000](http://127.0.0.1:8000).*  
*API Documentation (Swagger UI) is automatically available at [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs).*


## 🤝 Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to check out the [issues page](https://github.com/your-username/queueless/issues) if you want to contribute.

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👨‍💻 Author

**Harsh Tibrewal**

Email: harshtibrewal2003@gmail.com
