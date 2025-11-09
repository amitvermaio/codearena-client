<div align="center">
  <h1>CodeArena</h1>
  <p>🚀 A collaborative coding platform for real-time pair programming and competitive coding challenges</p>
  
  <!-- Badges -->
  <div align="center">
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
    <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
    <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" alt="Express">
    <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB">
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
    <img src="https://img.shields.io/badge/JavaScript-171717?style=for-the-badge&logo=javascript&logoColor=F7DF1E" alt="JavaScript">
    <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite">
  </div>
  
  <br/>
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
  
</div>

## ✨ Features

- **Real-time Code Collaboration** - Pair program with others in real-time
- **Code Execution** - Run code in multiple programming languages
- **Problem Solving** - Solve coding challenges with test cases
- **Interactive UI** - Modern and responsive interface built with TailwindCSS
- **Redux** - Predictable global state management (JS version)

## 🚀 Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Styling**: TailwindCSS with ShadCN components
- **State Management**: Redux Toolkit
- **Code Editor**: Monaco Editor (VS Code's editor)
- **Build Tool**: Vite
- **UI Components**: Radix UI Primitives + ShadCN
- **Form Handling**: React Hook Form
- **Real-time**: Socket.IO

### Backend
- **Runtime**: Node.js with Express
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT
- **Real-time**: Socket.IO

## 📁 Project Structure

```
frontend/
├── public/            # Static files
├── src/
│   ├── assets/        # Images, fonts, etc.
│   ├── components/    # Reusable UI components
│   ├── hooks/         # Custom React hooks & Shadcn hooks
│   ├── lib/           # Utility functions
│   ├── pages/         # Page components
│   ├── store/         # Redux store
│   ├── routes/        # App routes
│   ├── Mainroutes.jsx # Main App routes
│   └── main.jsx       # Entry point
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn
- MongoDB 6.0+
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/amitvermaio/codearena.git
   cd codearena
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   cd frontend
   npm install
   
   # Install backend dependencies
   cd ../backend
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in both frontend and backend directories. Refer to `.env.example` for required variables.

4. **Start Development Servers**
   ```bash
   # Start backend server
   cd backend
   npm run dev
   
   # In a new terminal, start frontend
   cd ../frontend
   npm run dev
   ```

5. **Open in Browser**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) to get started.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [ShadCN](https://ui.shadcn.com/) for the amazing component library
- [Radix UI](https://www.radix-ui.com/) for accessible primitives
- All the open-source libraries that made this project possible