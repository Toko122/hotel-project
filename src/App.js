import './App.css';

import { Route, Routes } from 'react-router-dom';

import { Home } from './pages/Home';

import Navbar from './layout/Navbar';
import Footer from './layout/Footer'

function App() {
  return (
    <>
      <Navbar />

      
      <Routes>
        <Route path='/' element={<Home/>} />
      </Routes>


      <Footer />
    </>
  );
}

export default App;
