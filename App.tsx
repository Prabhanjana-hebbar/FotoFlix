import React from 'react';
import'./App.css';
import Photos from './components/Photos';
import Favourites from './components/Favourites';
import { BrowserRouter ,Routes,  Route , Link } from 'react-router-dom';


function App() {
  return(
    <BrowserRouter>
      <div>
        <nav className="navbar">
          <div className="navbar_logo">
            <h1>Fotoflix</h1>
          </div>
          <div className="search_input">
            <input type="search" placeholder='Search for Photos..' />
          </div>
          <div className="navbar_links">
            <Link to="/">HOME</Link>
            <Link to="/favourites">Favourites</Link>
          </div>
        </nav>
        <Routes>
          <Route path='/' element={<Photos/>}/>
          <Route path='/favourites' element={<Favourites/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App
