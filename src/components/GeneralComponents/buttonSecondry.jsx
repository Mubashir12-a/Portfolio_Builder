import { Link } from "react-router-dom";

export default function Btn_Secondry({title, to}){
    return (
        <>
            <style>{`
                .Btn_Secondry {
                    border: 1px solid var(--mint);
                    color: var(--mint);
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

                .Btn_Secondry:hover {
                    transform: scale(0.95);
                    transition: var(--transition);
                }
            `}</style>

            <Link to={to}><button className="Btn_Secondry">{title}</button></Link>
        </>
    )
}