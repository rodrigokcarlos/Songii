import React from 'react'

function Musica() {

    return (
        <div>{(
            listaMusica.map((musica) => (
                <ListaDeMusicas key={musica.id}>
                    <div><CapaAlbum src={musica.album.cover} alt='capaDoAlbum' className="capa"/></div>
                    <div className="titulo">{musica.title}</div>
                    <div className="artista">{musica.artist.name}</div>
                    <Player/>
                    <div className="duracao">{('00'+ parseInt(musica.duration / 60) ).slice(-2) + ':' + ('00' + musica.duration % 60).slice(-2)}</div>
                    <Like/>
                    <div className="linkMusica"><a href={musica.link} target='_blank'>Ouça no Deezer <OpenInNewIcon/></a></div>
                </ListaDeMusicas>
            )
            )
            )}</div>
        )
}

export default Musica