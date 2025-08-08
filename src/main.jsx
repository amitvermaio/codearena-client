import './index.css'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import Routes from './routes/Mainroutes'
import { Toaster } from 'sonner'
import { store } from './store/store'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element not found. Ensure an element with id="root" exists in index.html')
}

createRoot(rootElement).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
      <Routes />
      <Toaster position="top-center" richColors />
    </Provider>
  </BrowserRouter>
)

