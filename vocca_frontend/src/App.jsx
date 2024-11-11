// src/App.jsx
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from "./pages/user/Home";
import LoginComponent from "./components/user/LoginComponent";
import RegisterComponent from "./pages/user/Register";
import AdminHome from "./pages/admin/AdminHome";
import Products from "./pages/user/Products";
import Cart from "./pages/user/Cart";


function App() {
  const isLoggedIn = true; 

  return (
    <Router>
      <Routes>
        <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/register" element={<RegisterComponent/>} />
        <Route path="/admin" element={<AdminHome/>} />
        <Route path="/products" element={<Products/>} />
        <Route path="/cart" element={<Cart/>} />
      </Routes>
    </Router>
  );
}

export default App;
