import React from 'react'
import { CapaAlbum } from './Styles'

function CapaDoAlbum(props) {
  return (
    <div>
        <CapaAlbum
        src={props.capa}
        alt="capaDoAlbum"
        className="capa"
        />
    </div>
  )
}

export default CapaDoAlbum