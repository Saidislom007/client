import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import TestApp from './pages/TestPage'
import UserForm from './pages/UserForm'
import AdminLogin from './pages/AdminLogin'
import VerifyCode from './pages/VerifyCode'
import AdminPage from './pages/AdminPage'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

function App() {
  return (

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<TestApp />} />
        <Route path="/re" element={<UserForm />} />

        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/verify" element={<VerifyCode />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        />
      </Routes>
   
  )
}

export default App
