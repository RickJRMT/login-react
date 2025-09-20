import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";
import "./Header-css";

export const Header = () => {
    const {user, logout} = useAuthContext();
    const navigate = useNavigate();

    return (
        <header className="header">
            <div className="header-left">
                <h1 className="header-logo" onClick={() => navigate("/principal")}> Admin panel</h1>
                <Navbar />
            </div>
            <div className="header-right">
                <span className="header-user">
                {user?.nombre} ({user?.rol})
                </span>
                <button onClick={logout} className="logout-btn">Cerrar sesion</button>
            </div>
        </header>
    );
};