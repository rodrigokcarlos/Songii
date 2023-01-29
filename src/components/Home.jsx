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


    //fav
    const checkIfIsFavorite = () => (favorite ? "fas fa-heart" : "far fa-heart");
    const handleToggleFavorite = (param) => setFav((previous) => !previous);

    const playListBase = '/playlist/1111141961';
    const buscarMusica = '/search';

    function pesquisar() {
        const options = {
            method: 'GET',
            url: buscarMusica,
            params: {q: param},
            headers: {
                'X-RapidAPI-Key': '9815fa8f84msh2b22f10503aa3a4p1a9e95jsn3697d76ee3a1',
                'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
            }
            };         
            axFetch.request(options).then(function (saida) {
                const data = saida.data.data;  // search
                setMusica(data);
                console.log(data);
            })
            .catch(function (error) {
                console.error(error);
            });
            
    };

    const puxarDados = () => {

        const options = {
        method: 'GET',
        url: playListBase,
        headers: {
            'X-RapidAPI-Key': '9815fa8f84msh2b22f10503aa3a4p1a9e95jsn3697d76ee3a1',
            'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
        }
        };         
        axFetch.request(options).then(function (saida) {
            const data = saida.data.tracks.data;
            setMusica(data);
            console.log(( data[0].duration / 60 ) % 6);
        })
        .catch(function (error) {
            console.error(error);
        });

    }
    const apertaButao = (e) => {
        if (e.key === 'Enter') {
            pesquisar();
        }
      };
    useEffect(() =>{
        puxarDados();
        
    }, []);
    
    return (
        <div className='corpo'>
            <Header/>
            <Container>
                <Busca type="text" placeholder='Buscar' onChange={(e) =>setParam(e.target.value)} onKeyDown={apertaButao} />
                <div><Link to="/favoritos">Favoritos</Link></div>
                <CorpoMeio>
                    <ListaDeMusicas> 
                        <div>Musica</div>
                        <div></div>
                        <div>Artista</div>
                        <div></div>
                        <div><AccessTimeIcon/></div>
                        <div><FavoriteIcon/></div>
                        <div></div>
                        
                    </ListaDeMusicas>
                    {(
                    listaMusica.map((musica) => (
                        <ListaDeMusicas key={musica.id}>
                            <div><CapaAlbum src={musica.album.cover} alt='capaDoAlbum' className="capa"/></div>
                            <div className="titulo">{musica.title}</div>
                            <div className="artista">{musica.artist.name}</div>
                            <div className='previaMusica'><video controls><source src={musica.preview}/></video></div>
                            <div className="duracao">{('00'+ parseInt(musica.duration / 60) ).slice(-2) + ':' + ('00' + musica.duration % 60).slice(-2)}</div>
                            <div>     
                                <p onClick={handleToggleFavorite}>
                                <i className={checkIfIsFavorite} id="item">{favorite ? (<FavoriteBorderIcon/>) : <FavoriteIcon/>}</i>
                                </p>
                            </div>
                            <div className="linkMusica"><a href={musica.link} target='_blank'>Ouça no Deezer <OpenInNewIcon/></a></div>
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
    border-top: 2px solid #f1f3f4;
    border-bottom: 2px solid #f1f3f4;
    :hover:not(:first-child){
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
        color: #999;
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
