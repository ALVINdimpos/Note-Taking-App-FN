import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './pages/Register';
import Login from './pages/Login';
import ChangePassword from './pages/ChangePassword';
import ResetPassword from './pages/ResetPassword';
import NewPassword from './pages/NewPassword';
import Note from './pages/Note';
import Dashboard from './pages/Dashboard';
import './index.css';
const App = () => {
  return (
    <div >
   <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
          <Route path="/change-password/:token" element={<ChangePassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/new-password" element={<NewPassword />} />
          <Route path="/note" element={<Note />} />
          <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
};
export default App;