import { Link } from "react-router-dom";
import '../App.css';
import logo from '../assets/logo-Songii.png';

export default function Header() {
    return (
        <div className="header">
            <Link to="/"><img src={logo} alt="logoSongii" className="logo" /></Link>
            <div>a</div>
        </div>
    )
    
}