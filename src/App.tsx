import React, { useState } from 'react';
import './App.scss';
import Converter from './components/converter/converter';
import Footer from './components/footer/footer';
import Header from './components/header/header';

const App = () => {
  {

    const [metamask, setMetamask] = useState(null);

    return (
      <div className="app">
        <Header setMetamask={setMetamask}/>
        <Converter metamask={metamask}/>
        <Footer />
      </div>
    )
  }
}

export default App;
