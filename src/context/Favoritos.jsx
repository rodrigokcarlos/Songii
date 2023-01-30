import { createContext} from "react";
import useLocalStorage from "../hooks/useLocalstorage";

export const FavoritosContext = createContext();
FavoritosContext.displayName = 'Favoritos';

export default function FavoritosProvider({children}) {
    const [favorito, setFavorito] = useLocalStorage('list', [])
    return (
        <FavoritosContext.Provider
        value={{favorito, setFavorito}}>
            {children}
        </FavoritosContext.Provider>
    )
}
