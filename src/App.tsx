// import { useState } from 'react'

import './App.css'
import Home from './ui/pages/Home'
import Header from './ui/components/Header'
// import RandomNumberGenerator from './ui/pages/random'

function App() {
  return (
    <div className='app-container'>
      <header><Header /></header>
      <main>
        {/* <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/conversor/:category" element={<Category />} />
          <Route path="/sustitutos" element={<Substitutes />} />
        </Routes> */}
        <Home />
        {/* <RandomNumberGenerator /> */}
      </main>
    </div>
  );
}

export default App;
