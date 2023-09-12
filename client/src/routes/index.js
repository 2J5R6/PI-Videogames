import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from '../views/LandingPage/LandingPage';
// Importa otros componentes aquí

const RoutesComponent = () => {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            {/* Otras rutas irán aquí */}
        </Routes>
    );
}

export default RoutesComponent;
