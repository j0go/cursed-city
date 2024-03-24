import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Section1 from './components/Section1';
import { useState } from 'react';

function App() {
  const [isOpen, setMobile] = useState(false);

  const mobileMenu = () => {
    if(isOpen) {
      document.body.className = "";
    } else {
      document.body.className = "mobile-nav-active";
    }
    setMobile(!isOpen)
  };

  return (
    
    <div className="App">
      <button onClick={()=>{
        mobileMenu()
      }} className="bi bi-list mobile-nav-toggle d-lg-none"></button>
      <Header isOpen={isOpen} />
      <Hero />
      <main id="main">
        <Section1 />        
      </main>

    </div>
  );
}

export default App;
