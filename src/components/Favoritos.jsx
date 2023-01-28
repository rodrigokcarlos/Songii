import { Link } from "react-router-dom";
import Header from './Header';
import '../App.css';
import axios from "axios";

export default function Favoritos() {

    return (
        <div className='corpo'>
            <Header/>
            <div className="container">
                <h2>favs</h2>
                <div><Link to="/">Home</Link></div>
            </div>
        </div>
    )
}