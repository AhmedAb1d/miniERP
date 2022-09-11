import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Authentification from './pages/Authentification';
import NoPage from './pages/NoPage';
import Orders from './pages/Orders';
import Products from './pages/Products';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
          <Routes>
            <Route exact path="/" element = { <Authentification /> }/>
            <Route path="/orders" element = { <Orders/> }/>
            <Route path="/products" element = { <Products/> }/>
            <Route path="*" element = { <NoPage/> }/>
          </Routes>
    </Router>
  </React.StrictMode>,
);

