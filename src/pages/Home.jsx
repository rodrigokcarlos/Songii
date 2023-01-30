import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import "../App.css";
import {
  Busca,
  Container,
  CapaAlbum,
  CorpoMeio,
  ListaDeMusicas,
  TituloDeMusicas
} from "../components/Styles";
import axFetch from "../services/Api";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Like from "../components/Like";
import Player from "../components/Player";
import InfiniteScroll from 'react-infinite-scroll-component';

export default function Home() {
  const [listaMusica, setMusica] = useState([]);
  const [musicaAtual, setMusicaAtual] = useState(null);
  const [param, setParam] = useState([]);
  const [itensPerPage, setItensPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);

  const pages = Math.ceil(listaMusica.length / itensPerPage)
  const startIndex = currentPage * itensPerPage;
  const endIndex = startIndex + itensPerPage;
  const currentItens = listaMusica.slice(startIndex, endIndex)


  const playListBase = "/playlist/1111141961";
  function puxarDados() {
    const options = {
      method: "GET",
      url: playListBase,
      headers: {
        "X-RapidAPI-Key": "9815fa8f84msh2b22f10503aa3a4p1a9e95jsn3697d76ee3a1",
        "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
      },
    };
    axFetch
      .request(options)
      .then(function (saida) {
        const data = saida.data.tracks.data;
        setMusica(data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  const buscarMusica = "/search";
  function pesquisar() {

    const options = {
      method: "GET",
      url: buscarMusica,
      params: { q: param },
      headers: {
        "X-RapidAPI-Key": "9815fa8f84msh2b22f10503aa3a4p1a9e95jsn3697d76ee3a1",
        "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
      },
    };
    axFetch
      .request(options)
      .then(function (saida) {
        const data = saida.data.data;
        if(data === undefined) {
            return
          }
          setMusica(data);
        }
      )
      .catch(function (error) {
        console.error(error);
      });
  }

  function apertaButao(e) {
    if (e.key === "Enter") {
      pesquisar();
    }
  }

  // useEffect(() => {
  //   const intersectionObserver = new IntersectionObserver((entries) => {
  //     if(entries.some((entry) => entry.isIntersecting)) {
  //       console.log('elemento está visivel!');
  //       setCurrentPage((currentPageInsideState) => currentPageInsideState + 1);
  //     }
  //   });

  //   intersectionObserver.observe(document.querySelector('#sentinela'));

  //   return () => intersectionObserver.disconnect();
  // }, [currentPage]);
  useEffect(() => {
    puxarDados();
  }, []);

  return (
    <div className="corpo">
      <Header />
      <Container>
        <Busca
          type="text"
          placeholder="Buscar"
          onChange={(e) => setParam(e.target.value)}
          onKeyDown={apertaButao}
        />
        <div>
          <Link to="/favoritos">Favoritos</Link>
        </div>
        <CorpoMeio>
          <div>pagina atual: {currentPage}</div>
          <TituloDeMusicas>
            <div className="musicatitulo">Musica</div>

            <div className="artistatitulo">Artista</div>

            <div>
              <AccessTimeIcon />
            </div>
            <div className="favtitulo">
              <FavoriteIcon />
            </div>
          </TituloDeMusicas>
            {currentItens.map((musica) => (
            <ListaDeMusicas key={musica.id}>
              <div>
                <CapaAlbum
                  src={musica.album.cover}
                  alt="capaDoAlbum"
                  className="capa"
                />
              </div>
              <div className="titulo">{musica.title}</div>
              <div className="artista">{musica.artist.name}</div>
              <Player
                musicaAtual={musicaAtual}
                setMusicaAtual={setMusicaAtual}
                preview={musica.preview}
              />
              <div className="duracao">
                {("00" + parseInt(musica.duration / 60)).slice(-2) +
                  ":" +
                  ("00" + (musica.duration % 60)).slice(-2)}
              </div>
              <Like id={musica.id} listaMusica={listaMusica}/>
              <div className="linkMusica">
                <a href={musica.link} target="_blank">
                  Ouça no Deezer <OpenInNewIcon />
                </a>
              </div>
            </ListaDeMusicas>
          ))}
          {/* <div id='sentinela'>a</div> */}
          <div>{Array.from(Array(pages), (item, index) => {
            return <button value={index} onClick={(e) => setCurrentPage(Number(e.target.value))}>{index +1}</button>
          })}</div>
        </CorpoMeio>
      </Container>
    </div>
  );
}
