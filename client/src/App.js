import './App.css';
import React from 'react';

import { BrowserRouter, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import Details from './components/Details';
import Form from './components/Form';


function App() {
  return (
      <div>
        <BrowserRouter>
          <Route exact path = '/' component={LandingPage} />
          <Route exact path = '/home' component={Home} />
          <Route exact path = '/details/:id' component={Details} />
          <Route exact path = '/create' component={Form} />
        </BrowserRouter>
      </div>
  );
}

export default App;
