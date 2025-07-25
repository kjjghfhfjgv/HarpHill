import React from 'react';
import style from './styles.module.css'


const History = () => {
    
            const recentCities = JSON.parse(localStorage.getItem(cityStorageKey)) || [];

    return (
        <div className="history-container">
            <h2>Recently Cities</h2>
            <ul className="city-list">
                {recentCities.map((city, index) => (
                    <li key={index} className="city-item">
                        {city}
                    </li>
                ))}
            </ul>
        </div>
    );
};

const cityStorageKey = 'CITIES'


export default History;