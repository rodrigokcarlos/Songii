import React, { useRef } from 'react';

export default function Player(props) {
  const videoPlayer = useRef(null);

  function tocarMusica() {
    if(props.musicaAtual === null) {
      videoPlayer.current.play()
      props.setMusicaAtual(videoPlayer)
      return
    }

    if(props.musicaAtual.current === videoPlayer.current){
      videoPlayer.current.pause()
      props.setMusicaAtual(null)
    } else {
      props.musicaAtual.current.pause()
      videoPlayer.current.play()
      props.setMusicaAtual(videoPlayer)
    }
  };

  return (
    <div className='previaMusica'>
      <video 
        ref={videoPlayer}
        controls 
        onPlay={tocarMusica}
        >
        <source src={props.preview}/>
      </video>
    </div>
  )
}