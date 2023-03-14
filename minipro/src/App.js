import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './pages/Register';
import Login from './pages/login/Login';
import Secret from './pages/secret/Secret';
import Profile from './pages/profile/Profile';
import AdminHome from './pages/admin/AdminHome';
import EditUser from './pages/editUser/EditUser';
import AddUser from './pages/create/AddUser';
import AdminLogin from './pages/adminLogin/AdminLogin'
import 'react-toastify/dist/ReactToastify.css'
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path={'/'} element={<Secret/>}>
            
          </Route>
          <Route path={'/login'} element={<Login/>}>
            
          </Route>
          <Route path={'/admin-login'} element={<AdminLogin/>}>
            
          </Route>
          <Route path={'/register'} element={<Register/>}>
            
          </Route>
         
          <Route path={'/profile'} element={<Profile/>}>
            
          </Route>
          <Route path={'/admin'} element={<AdminHome/>}>
            
          </Route>
          <Route path={'/edit-user'} element={<EditUser/>}>
            
          </Route>
        
          <Route path={'/add-user'} element={<AddUser/>}>
            
          </Route>
        </Routes>
      </BrowserRouter>
    </div>

  )
}

export default App
