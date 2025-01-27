import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token'); // Verifica si el token existe

    if (!token) {
        return <Navigate to="/login" replace />; // Redirige al login si no hay token
    }

    return children; // Renderiza la ruta protegida si hay token
};

export default ProtectedRoute;
