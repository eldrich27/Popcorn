import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App-v1.tsx'
// import { Rating } from './components/Rating/Rating'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    {/* <Rating></Rating> */}
  </StrictMode>,
)
