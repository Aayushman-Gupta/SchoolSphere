import {BrowserRouter,Route,Routes} from 'react-router-dom'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Admin from './pages/Admin/admin.jsx'
import Home from './pages/Home/Home.jsx'
import Announcements from './pages/Announcement/Announcements.jsx'
import Register from './pages/Register/Register.jsx'

import './App.css'
function App() {
  return (
    <BrowserRouter>
    <Routes>

      <Route path="/" element={<Home/>}/>
      <Route path="/admin" element={<Admin/>}/>
      <Route path="/announcements" element={<Announcements/>}/>
      <Route path="/register" element={<Register/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
