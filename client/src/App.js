import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes'; // Asegúrate de importar tu componente de rutas
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App" style={{ backgroundImage: `url('https://wallpapercave.com/wp/wp3849268.jpg')`, backgroundSize: 'cover', height: '100vh' }}>
        <header className="App-header">
          <Routes /> {/* Asegúrate de renderizar tu componente de rutas aquí */}
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;

{/* <img src='https://th.bing.com/th/id/OIG.C12sgOuFbKUXURk7uxCO?pid=ImgGn' className="App-logo" alt="logo" /> */}