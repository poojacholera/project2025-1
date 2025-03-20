import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import GamesHome from './GamesHome.tsx'
import Twister from './Components/Twister/Twister.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
      <Routes>
        {/* <Route path="dashboard" element={<App />}> */}
          <Route index element={<App />} />
          <Route path="Games" element={<GamesHome />} />
          <Route path="Twister" element={<Twister />} />
          
        
        {/* </Route> */}
     

        {/* <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
       */}
        </Routes>
        
      </BrowserRouter>
  </StrictMode>,
)
