import { Link } from "react-router-dom";
import '../App.css';
import logo from '../assets/logo-Songii.png';

const linkStyle = {
    textDecoration: 'none'
};
export default function Header() {
    return (
        <div className="header">
            <Link to="/"><img src={logo} alt="logoSongii" className="logo" /></Link>
            <Link to='/favoritos' style={linkStyle}><p className="fav">Favoritos</p></Link>
        </div>
    )
    
}
