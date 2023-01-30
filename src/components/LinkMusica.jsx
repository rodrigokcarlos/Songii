import React from 'react';
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

function LinkMusica(props) {
  return (
    <div className="linkMusica">
        <a href={props.linkDeezer} target="_blank">
            Ouça no Deezer <OpenInNewIcon />
        </a>
    </div>
  )
}

export default LinkMusica