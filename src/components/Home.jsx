import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Header from './Header';
import '../App.css';
import styled from 'styled-components';
import axFetch from '../services/Api';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';



export default function Home(){    

    const [listaMusica, setMusica] = useState([]);
    const [favorite, setFav] = useState(false);
    const [param, setParam] = useState([]);

    const checkIfIsFavorite = () => (favorite ? "fas fa-heart" : "far fa-heart");
    const handleToggleFavorite = (param) => setFav((previous) => !previous);

    const playListBase = '/playlist/1111141961';
    const buscarMusica = '/search';
    
    function mudaMusica(dale) {
        
        console.log('alo')
        // const musicaNova = `https://open.spotify.com/embed/track/${dale.children[0].dataset.id}?utm_source=generator&theme=0`
        // playerframe.setAttribute('src', musicaNova)
        console.log(param);
    };

    const puxarDados = () => {

        const options = {
        method: 'GET',
        url: playListBase,
        // url: 'https://deezerdevs-deezer.p.rapidapi.com/track/1825993627',
        // url: 'https://deezerdevs-deezer.p.rapidapi.com/search',
        params: {q: Busca.value},
        headers: {
            'X-RapidAPI-Key': '9815fa8f84msh2b22f10503aa3a4p1a9e95jsn3697d76ee3a1',
            'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
        }
        };         
        axFetch.request(options).then(function (saida) {
            const data = saida.data.tracks.data;
            //const data = saida.data.data;  // search
            setMusica(data);
        })
        .catch(function (error) {
            console.error(error);
        });

    }
    useEffect(() =>{
        puxarDados();
    }, []);
    
    return (
        <div className='corpo'>
            <Header/>
            <Container>
                <Busca type="text" placeholder='Buscar' onChange={(e) =>setParam(e.target.value)}/>
                <div><Link to="/favoritos">Favoritos</Link></div>
                <CorpoMeio>
                    <ListaDeMusicas> 
                        <div>Musica</div>
                        <div></div>
                        <div>Artista</div>
                        <div></div>
                        <div></div>
                        <div><AccessTimeIcon/></div>
                        <div><FavoriteIcon/></div>
                        
                    </ListaDeMusicas>
                    {(
                    listaMusica.map((musica) => (
                        <ListaDeMusicas key={musica.id} onClick={mudaMusica(this)}>
                            <div><CapaAlbum src={musica.album.cover} alt='capaDoAlbum' className="capa"/></div>
                            <div className="titulo">{musica.title}</div>
                            <div className="artista">{musica.artist.name}</div>
                            <div className='previaMusica'><video controls><source src={musica.preview}/></video></div>
                            <div className="linkMusica"><a href={musica.link} target='_blank'>Ouça no Deezer <OpenInNewIcon/></a></div>
                            <div className="duracao">{musica.duration}</div>
                            <div>     
                                <p onClick={handleToggleFavorite}>
                                <i className={checkIfIsFavorite} id="item">{favorite ? (<FavoriteBorderIcon/>) : <FavoriteIcon/>}</i>
                                </p>
                            </div>
                        </ListaDeMusicas>
                    )
                    )
                    )}
                </CorpoMeio>
            </Container>
        </div>
    )
}
const ListaDeMusicas = styled.div`
    
    height:70px;
    display: flex;
    align-items: center;
    transition: 0.2s ease;
    :hover{
        border-top: 2px solid #999;
        border-bottom: 2px solid #999;
    }
    div{
        flex: 1;
        display: flex;
        align-items: center;
        font-family: 'Roboto';
        padding-left: 17px;
    }
    a{
        text-decoration:none;
        color: black;
        align-items: center;
        display: flex;
        transition: 0.2s ease;
    }
    a:hover{
        color: white;
    }
    video{
        width: 180px;
        height: 30px;
    }
`
const CorpoMeio = styled.div `
    width: 100%;
`

const CapaAlbum = styled.img`
    height: 50px;
`

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center; 
    flex-direction: column;
    width: 100%;   
`;

const Busca = styled.input`
  border-color: tomato;
  height: 40px;
  width: 300px;
  border-radius: 7px;
  padding-left: 10px;
  outline: none;
  font-size: 16px;
`;
