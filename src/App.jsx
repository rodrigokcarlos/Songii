import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Favoritos from "./pages/Favoritos";
import Home from "./pages/Home";
import FavoritosProvider from './context/Favoritos';

function App() {
return (
    <FavoritosProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/favoritos' element={<Favoritos/>} />
          </Routes>
        </Router>
      </div>
    </FavoritosProvider>
  )
}

export default App;