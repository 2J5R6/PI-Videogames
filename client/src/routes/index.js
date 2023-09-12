import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from '../views/LandingPage/LandingPage';
import HomePage from '../views/HomePage/HomePage';
// Importa otros componentes aquí

const RoutesComponent = () => {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<HomePage />} />
        </Routes>
    );
}

export default RoutesComponent;
