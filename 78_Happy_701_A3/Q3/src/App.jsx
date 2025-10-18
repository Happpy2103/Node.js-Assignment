import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Profile from './components/Profile';
import Leaves from './components/Leaves';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

export default function App(){
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />

          <Route path="/profile" element={
            <ProtectedRoute><Profile /></ProtectedRoute>
          } />

          <Route path="/leaves" element={
            <ProtectedRoute><Leaves /></ProtectedRoute>
          } />

          <Route path="*" element={<div><h3>Page not found</h3></div>} />
        </Routes>
      </div>
    </Router>
  );
}
