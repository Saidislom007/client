import { useState } from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import TestApp from './pages/TestPage'
import Admin from './pages/Admin'
import AdminPage from './pages/AdminPage'
import UserForm from './pages/UserForm'

import './App.css'
import { Toaster } from "react-hot-toast";


function App() {


  return (
    <>
        <Toaster position="top-right" />
        <Routes>
          
          <Route path="/" element={<Home />}/>
          <Route path="/test" element={<TestApp />}/>
          <Route path="/re" element={<UserForm />}/>
          <Route path="/admin" element={<AdminPage />}/>

        </Routes>
    </>
  )
}

export default App
