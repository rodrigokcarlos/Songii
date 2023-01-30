import Header from "../components/Header";
import "../App.css";
import {
  Busca,
  Container,
  CorpoMeio,
  ListaDeMusicas
} from "../components/Styles";
import React, { useState, useEffect, useContext } from "react";
import TituloDeMusicas from '../components/TituloDeMusicas';
import Like from "../components/Like";
import Player from "../components/Player";
import { FavoritosContext } from "../context/Favoritos";
import { axFetch, gerarOpcoes } from "../services/Api";
import LinkMusica from "../components/LinkMusica";
import DuracaoMusica from "../components/DuracaoMusica";
import TituloMusica from "../components/TituloMusica";
import ArtistaMusica from "../components/ArtistaMusica";
import CapaDoAlbum from "../components/CapaDoAlbum";

export default function Favoritos() {
  const [listaMusica, setMusica] = useState([]);
  const [musicaAtual, setMusicaAtual] = useState(null);
  const [param, setParam] = useState([]);
  const { favorito } = useContext(FavoritosContext);

  async function puxarFavoritos() {
    const requests = favorito.map((cadaFavorito) => {
      const opcoes = gerarOpcoes()
      return axFetch.get(`/track/${cadaFavorito}`, opcoes);
    });
    Promise.all(requests).then((values) => {
      setMusica(values);
    }).catch((error)=> {
      console.log(error)
    });
  }

  function apertaButao(e) {
    if (e.key === "Enter") {
      pesquisar();
    }
  }
  useEffect(() => {
    puxarFavoritos();
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
          {listaMusica.map((musica) => (
            <ListaDeMusicas key={musica.data.id}>
              <CapaDoAlbum
                capa={musica.data.album.cover}
                alt="capaDoAlbum"
                className="capa"
              />
              <TituloMusica titulo={musica.data.title}/>
              <ArtistaMusica artista={musica.data.artist.name}/>
              <Player
                musicaAtual={musicaAtual}
                setMusicaAtual={setMusicaAtual}
                preview={musica.data.preview}
              />
              <DuracaoMusica  duracao={musica.data.duration}/>
              <Like id={musica.data.id} listaMusica={listaMusica} />
              <LinkMusica linkDeezer={musica.data.link}/>
            </ListaDeMusicas>
          ))}
        </CorpoMeio>
      </Container>
    </div>
  );
}
