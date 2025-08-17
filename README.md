# CodeArena

CodeArena is a collaborative coding platform built using the **MERN stack** with modern frontend tools like TailwindCSS and ShadCN.  
This document will help contributors and collaborators quickly set up the project locally.

---

## ⚡ Quick Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/amitvermaio/codearena.git
cd codearena
```

### 2️⃣ INSTALL DEPENDENCIES
- Backend
``` bash
cd backend
npm install
```

- Frontend
```bash
cd ../frontend
npm install
```

### 3️⃣ Environment Variables

Create a `.env` file in both backend/ and frontend/ .
Backend (`backend/.env`)

```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_secret
REFRESH_TOKEN_EXPIRY=7d
```

### Frontend (`frontend/.env`)
``` bash
VITE_BACKEND_URL=http://localhost:5000
```

### 4️⃣ Run the Project

- Backend (Express + MongoDB)
```bash
cd backend
npm run dev
```

- Frontend (React + Vite)
``` bash
cd ../frontend
npm run dev
```

The app should now be running at:

- Frontend → http://localhost:5173/

- Backend → http://localhost:5000/

---

## 📂 Project Structure

``` bash
codearena/
├── backend/       # Node.js + Express + MongoDB
│   ├── src/
│   ├── .env
│   └── package.json
│
├── frontend/      # React + TailwindCSS + ShadCN
│   ├── src/
│   ├── .env
│   └── package.json
│
├── README.md
└── .gitignore
```

---

# 🔧 Development Workflow

1. Create a new branch for your feature/bugfix:
``` bash
git checkout -b feat/feature-name
```

2. Make your changes and commit them using Conventional Commits:

``` bash
git commit -m "feat(auth): add forgot password API integration"
```

3. Push your branch:
``` bash 
git push origin feat/feature-name
```

4. Open a Pull Request 🚀

---

# 📌 Tech Stack (Quick Overview)

- Frontend: React, Vite, Redux, TailwindCSS, ShadCN

- Backend: Node.js, Express.js, MongoDB, JWT, bcrypt

- Tools: Axios, ESLint, Prettier

--- 

# 🤝 Contributing

- Fork the repo

- Create your feature branch (git checkout -b feat/your-feature)

- Commit your changes (git commit -m 'feat: add some feature')

- Push to the branch (git push origin feat/your-feature)

- Open a Pull Request

----

# 📜 License

This project is licensed under the MIT License.

``` yaml
---

## ✅ Commit message for this README  
```

---

# 📝 Commit Message for this README
``` bash
docs(readme): add professional README with setup guide and contribution workflow
```