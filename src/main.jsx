// Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import AppShell from './App.jsx'
import Login from './pages/Login.jsx'
import './index.css'

// rota de logout: limpa sessão e volta ao login
function Logout(){
  try {
    localStorage.removeItem('onboarded');
    localStorage.removeItem('userEmail');
  } catch (e) {}
  return <Navigate to="/login" replace />;
}



// Helpers avaliados em tempo de render
const isOnboarded = () => localStorage.getItem('onboarded') === 'true';

const RequireAuth = ({ children }) => (
  isOnboarded() ? children : <Navigate to="/login" replace />
);

const RequireGuest = ({ children }) => (
  children
);

function HomeRedirect(){ return <Navigate to="/login" replace />; }

const router = createBrowserRouter([
  { path: '/logout', element: <Logout /> },
  { path: '/', element: <HomeRedirect /> },
  { path: '/login', element: <RequireGuest><Login /></RequireGuest> },
  { path: '/app', element: <RequireAuth><AppShell /></RequireAuth> },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
