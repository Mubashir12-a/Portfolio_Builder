import { Link } from 'react-router-dom';

export default function Btn_Primary({title, to}){
    return (
        <>
            <style>{`
                .Btn_Primary {
                    border: 1px solid var(--border2);
                    color: var(--text-2);
                    transition: var(--transition);
                    background-color: var(--bg1);
                    border-radius: 5px;
                    gap: 5px;
                    height: 80%;
                    font-size: 1rem;
                    padding: 2px 10px;
                    cursor: pointer;
                    font-family: 'syne','Courier New', Courier, monospace;
                }

                .Btn_Primary:hover {
                    transform: scale(0.95);
                    border: 1px solid var(--violet);
                    color: var(--violet);
                    transition: var(--transition);
                }
            `}</style>

            <Link to={to}><button className="Btn_Primary">{title}</button></Link>
        </>
    )
}