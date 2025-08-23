import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import Routes from "./routes/Mainroutes";
import { Toaster } from "sonner";
import { Provider } from 'react-redux';
import { store } from './store/store';

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
        <Routes />
        <Toaster position="bottom-right" richColors />
      </Provider>
    </BrowserRouter>
)
