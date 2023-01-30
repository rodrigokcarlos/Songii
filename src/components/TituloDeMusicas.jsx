import {TituloDeMusica} from "./Styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

function TituloDeMusicas() {
  return (
    <TituloDeMusica>
    <div className="musicatitulo">Musica</div>
    <div className="artistatitulo">Artista</div>
    <div>
      <AccessTimeIcon />
    </div>
    <div className="favtitulo">
      <FavoriteIcon />
    </div>
  </TituloDeMusica>
  )
}

export default TituloDeMusicas