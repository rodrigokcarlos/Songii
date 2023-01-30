import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useContext } from 'react';
import { FavoritosContext } from '../context/Favoritos';

function Like(props) {
  const {favorito, setFavorito} = useContext(FavoritosContext);

  function favoritar() {
    setFavorito([...favorito, props.id])

  }

  function desfavoritar() {
    const novaLista = favorito.filter(m => m !== props.id)
    setFavorito(novaLista)
  }
  return (
    <div>     
        <p>
          <i>{favorito.includes(props.id) ? (<FavoriteIcon onClick={desfavoritar} />) : (<FavoriteBorderIcon onClick={favoritar}/>)}</i>
        </p>
    </div>
  )
}

export default Like;