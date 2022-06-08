import './App.css';
import React from 'react';

import { BrowserRouter, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';


function App() {
  return (
      <div>
        <BrowserRouter>
          <Route exact path = '/' component={LandingPage} />
          <Route exact path = '/home' component={Home} />
        </BrowserRouter>
      </div>
  );
}

export default App;
