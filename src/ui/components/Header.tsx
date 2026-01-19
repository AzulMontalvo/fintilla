// import { Link } from "react-router-dom";
import logoDesktop from "../../assets/logo-desktop.png";
import logoMobile from "../../assets/logo-mobile.png";

export default function Header() {
    return (
        <nav>
            <button className="flat-button">Inicio</button>
            <img src={logoDesktop} alt="Logo" className="navbar-logo-desktop" />
            <img src={logoMobile} alt="Logo" className="navbar-logo-mobile" />
            <button className="flat-button">
                Crear plantilla
            </button>
        </nav>
    );
}