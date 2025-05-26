import './App.css';

import { Route, Routes } from 'react-router-dom';

import { Home } from './pages/Home';

import Navbar from './layout/Navbar';
import Footer from './layout/Footer'
import HotelsPage from './components/HotelsPage';
import RoomPage from './components/RoomPage';

function App() {
  return (
    <>
      <Navbar />

      
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/hotels' element={<HotelsPage/>} />
        <Route path='/room/:id' element={<RoomPage />} />
      </Routes>


      <Footer />
    </>
  );
}

export default App;
