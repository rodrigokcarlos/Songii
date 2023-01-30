import React from 'react'

function DuracaoMusica(props) {
  return (
    <div className="duracao">
    {("00" + parseInt(props.duracao / 60)).slice(-2) +
      ":" +
      ("00" + (props.duracao % 60)).slice(-2)}
  </div>
  )
}

export default DuracaoMusica