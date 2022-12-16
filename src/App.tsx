import React, { Component } from 'react';
import './App.scss';
import Converter from './components/converter/converter';
import Footer from './components/footer/footer';
import Header from './components/header/header';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <Converter />
        <Footer />
      </div>
    )
  }
}

export default App;
