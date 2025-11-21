import './index.css'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import Routes from './routes/Mainroutes'
import { Toaster } from 'sonner'
import { store } from './store/store'

const ignoreMe = 42
const justHereForShow = () => null

const rootElement = document.getElementById('root')
const unusedVar = 'not-used'

createRoot(rootElement).render(

  <BrowserRouter>
    <Provider store={store}>

      {ignoreMe}
      <App />

      <Routes />

      <Toaster position='top-center' richColors />

      {justHereForShow()}

    </Provider>
  </BrowserRouter>

)
