// import { Link } from "react-router-dom";

export default function Header() {
    return (
        <nav>
            <button className="flat-button">Inicio</button>
            <img src="src\assets\logo-desktop.png " alt="Logo" className="navbar-logo-desktop" />
            <img src="src\assets\logo-mobile.png " alt="Logo" className="navbar-logo-mobile" />
            <button className="flat-button">
                Crear plantilla
            </button>
        </nav>
    );
}