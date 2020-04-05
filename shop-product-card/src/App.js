import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './App.css';

import TopMenu from './components/TopMenu';
import Products from './pages/products';
import { CartProvider } from './components/Cart';

const Home = () => <h2>Home</h2>;

function App() {
  return (
    <CartProvider>
      <div className="App">
        <header className="App-header">
          <Router>
            <TopMenu />
            <div>
              <Switch>
                <Route path="/" exact component={Home}></Route>
                <Route path="/products" exact component={Products}></Route>
              </Switch>
            </div>
          </Router>
        </header>
      </div>
    </CartProvider>
  );
}

export default App;
