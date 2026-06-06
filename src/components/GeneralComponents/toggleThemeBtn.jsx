import { useState, useEffect } from 'react';
import toggleTheme from '../../hooks/toggleTheme.js';

import DarkModeImg  from '../../assets/DarkLight/DarkMode.png';
import LightModeImg from '../../assets/DarkLight/LightMode.png';

export default function ToggleThemeBtn() {
    // isDark = current theme is dark
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        const saved = localStorage.getItem('theme') || 'dark';
        setIsDark(saved === 'dark');
    }, []);

    const handleToggle = () => {
        const newTheme = toggleTheme();
        setIsDark(newTheme === 'dark');
    };

    return (
        <>
            <style>{`
                #toggle-theme-btn {
                    border: 1px solid var(--border2);
                    background: var(--bg2);
                    border-radius: 10px;
                    padding: 3px 6px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background 0.2s, border-color 0.2s, transform 0.15s;
                    height: 36px;
                    width: 44px;
                }
                #toggle-theme-btn:hover {
                    background: var(--surface2);
                    border-color: var(--violet);
                    transform: scale(1.08);
                }
                #toggle-theme-btn:active {
                    transform: scale(0.95);
                }
                #toggle-theme-btn img {
                    width: 26px;
                    height: 26px;
                    object-fit: contain;
                    display: block;
                    pointer-events: none;
                    transition: opacity 0.2s;
                }
            `}</style>

            <button
                id="toggle-theme-btn"
                onClick={handleToggle}
                title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
                {/* In dark mode → show LightMode image (click to go light) */}
                {/* In light mode → show DarkMode image (click to go dark) */}
                <img
                    src={isDark ? LightModeImg : DarkModeImg}
                    alt={isDark ? 'Light mode' : 'Dark mode'}
                />
            </button>
        </>
    );
}