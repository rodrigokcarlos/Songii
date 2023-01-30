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
import useLocalStorage from "../hooks/useLocalstorage";
import React, { useState, useEffect, useContext } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Like from "../components/Like";
import Player from "../components/Player";
import { FavoritosContext } from "../context/Favoritos";
import axFetch from "../services/Api";

export default function Favoritos() {
  const [listaMusica, setMusica] = useState([]);
  const [musicaAtual, setMusicaAtual] = useState(null);
  const [param, setParam] = useState([]);

  function apertaButao(e) {
    if (e.key === "Enter") {
      pesquisar();
    }
  }

  const { favorito } = useContext(FavoritosContext);

  async function puxarFavoritos() {
    const requests = favorito.map((cadaFavorito) => {
      const options = {
        method: "GET",
        url: `/track/${cadaFavorito}`,
        headers: {
          "X-RapidAPI-Key":
            "9815fa8f84msh2b22f10503aa3a4p1a9e95jsn3697d76ee3a1",
          "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
        },
      };

      return axFetch.request(options);
    });
    Promise.all(requests).then((values) => {
      setMusica(values);
      console.log(values)
    }).catch((error)=> {
      console.log(error)
    });
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
        <div>
          <Link to="/">Home</Link>
        </div>
        <CorpoMeio>
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
          {listaMusica.map((musica) => (
            <ListaDeMusicas key={musica.data.id}>
              <div>
                <CapaAlbum
                  src={musica.data.album.cover}
                  alt="capaDoAlbum"
                  className="capa"
                />
              </div>
              <div className="titulo">{musica.data.title}</div>
              <div className="artista">{musica.data.artist.name}</div>
              <Player
                musicaAtual={musicaAtual}
                setMusicaAtual={setMusicaAtual}
                preview={musica.data.preview}
              />
              <div className="duracao">
                {("00" + parseInt(musica.data.duration / 60)).slice(-2) +
                  ":" +
                  ("00" + (musica.data.duration % 60)).slice(-2)}
              </div>
              <Like id={musica.data.id} listaMusica={listaMusica} />
              <div className="linkMusica">
                <a href={musica.data.link} target="_blank">
                  Ouça no Deezer <OpenInNewIcon />
                </a>
              </div>
            </ListaDeMusicas>
          ))}
        </CorpoMeio>
      </Container>
    </div>
  );
}
