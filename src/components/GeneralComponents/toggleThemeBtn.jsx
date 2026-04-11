import toggleTheme from '../../hooks/toggleTheme.js';

export default function ToggleThemeBtn(){
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

            <button onClick={toggleTheme} id='toggle'>☀️</button>
        </>
    )
}