import { useState, useEffect } from 'react';
import toggleTheme from '../../hooks/toggleTheme.js';

export default function ToggleThemeBtn(){
    const [icon, setIcon] = useState('☀️');

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "dark";
        setIcon(savedTheme === "dark" ? '☀️' : '🌙');
    }, []);

    const handleToggle = () => {
        const newTheme = toggleTheme();
        setIcon(newTheme === "dark" ? '☀️' : '🌙');
    };

    return (
        <>
            <style>{`
                #toggle {
                    border: 1px solid var(--border2);
                    background-color: var(--bg1);
                    border-radius: 10px;
                    height: 100%;
                    font-size: 1.2rem;
                    padding: 2px 8px;
                    cursor: pointer;
                    font-family: 'syne','Courier New', Courier, monospace;
                }
            `}</style>

            <button onClick={handleToggle} id='toggle'>{icon}</button>
        </>
    )
}