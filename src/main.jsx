import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import Routes from "./routes/Mainroutes";
import { Toaster } from "sonner";

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <App />
      <Routes />
      <Toaster position="bottom-right" richColors />
    </BrowserRouter>
)
