import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import "../App.css";
import {
  Busca,
  Container,
  CorpoMeio,
  ListaDeMusicas
} from "../components/Styles";
import { axFetch, gerarOpcoes } from "../services/Api";
import Like from "../components/Like";
import Player from "../components/Player";
import InfiniteScroll from 'react-infinite-scroll-component';
import TituloDeMusicas from "../components/TituloDeMusicas";
import LinkMusica from "../components/LinkMusica";
import DuracaoMusica from "../components/DuracaoMusica";
import ArtistaMusica from "../components/ArtistaMusica";
import CapaDoAlbum from "../components/CapaDoAlbum";
import TituloMusica from "../components/TituloMusica";

export default function Home() {
  const [listaMusica, setMusica] = useState([]);
  const [musicaAtual, setMusicaAtual] = useState(null);
  const [param, setParam] = useState([]);
  const [itensPerPage, setItensPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(0);

  const pages = Math.ceil(listaMusica.length / itensPerPage)
  const startIndex = currentPage * itensPerPage;
  const endIndex = startIndex + itensPerPage;
  const currentItens = listaMusica.slice(startIndex, endIndex)


  const playListBase = "/playlist/1111141961";
  function puxarDados() {
    const opcoes = gerarOpcoes()
    axFetch
      .request(playListBase, opcoes)
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

    const opcoes = gerarOpcoes(param)
    axFetch
      .get(buscarMusica, opcoes)
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



  const fetchData = () => {
    setItensPerPage((itensPerPage) => itensPerPage + 5);
  }
  function apertaButao(e) {
    if (e.key === "Enter") {
      pesquisar();
    }
  }
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
        <CorpoMeio>
          <TituloDeMusicas/>
          <InfiniteScroll
            dataLength={currentItens.length}
            next={fetchData}
            hasMore={true}>
            {currentItens.map((musica) => (
              <ListaDeMusicas key={musica.id}>
                <CapaDoAlbum
                  capa={musica.album.cover}
                  alt="capaDoAlbum"
                  className="capa"
                />
                <TituloMusica titulo={musica.title}/>
                <ArtistaMusica artista={musica.artist.name}/>
              <Player
                musicaAtual={musicaAtual}
                setMusicaAtual={setMusicaAtual}
                preview={musica.preview}
              />
              <DuracaoMusica  duracao={musica.duration}/>
              <Like id={musica.id} listaMusica={listaMusica} />
              <LinkMusica linkDeezer={musica.link}/>
              </ListaDeMusicas>
            ))}
          </InfiniteScroll>
        </CorpoMeio>
      </Container>
    </div>
  );
}
