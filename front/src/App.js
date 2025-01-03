import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import './App.sass';

// Importa tus componentes
import PokemonList from './Pokemon/PokemonList';
import PokemonPage from './Pokemon/PokemonPage';
import PokemonDetails from "./Pokemon/PokemonDetail";

function App() {
  let location = useLocation();

  return (
    <div className="App">
      <TransitionGroup>
        <PokemonPage>
          <Routes location={location}>
            <Route path="/" element={
              <CSSTransition classNames="fade" timeout={300}>
                <PokemonList />
              </CSSTransition>
            } />
            <Route path="/pokemon/list" element={<PokemonList />} />
            <Route path="/pokemon/:id" element={<PokemonDetails />} />
          </Routes>
        </PokemonPage>
      </TransitionGroup>
    </div>
  );
}

export default function WrappedApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
