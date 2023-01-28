import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Favoritos from "./components/Favoritos";
import Home from "./components/Home";



function App() {
return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/favoritos' element={<Favoritos/>} />
        </Routes>
     </Router>
    </div>
  )
}

export default App;