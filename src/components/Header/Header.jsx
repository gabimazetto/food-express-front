import { Link } from "react-router-dom";
import "./style.css"

export function Header(){
    return (
        <header className="header w-100 px-3 py-2">
            <nav className="container d-flex justify-content-between align-items-center">
                <Link to="/">Home</Link>
                <div className="d-flex gap-5">
                    <Link to="/login">Login</Link>
                </div>
            </nav>
        </header>
    )
}