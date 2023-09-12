// src/views/LandingPage/LandingPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';

const LandingPage = () => {
    return (
        <div className={styles.container}>
            <img src="https://wallpapercave.com/wp/wp3849268.jpg" alt="Super Smash Bros" className={styles.backgroundImage} />
            <Link to="/home">
                <button className={styles.enterButton}>Ingresar</button>
            </Link>
        </div>
    );
}

export default LandingPage;
