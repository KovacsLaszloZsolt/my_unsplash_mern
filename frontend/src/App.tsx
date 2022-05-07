import { useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

// import { AppContextType } from './interfaces';
import './App.scss';
import AppContext from './context/AppContext';
import Header from './components/Header/Header';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import About from './pages/About/About';

function App(): JSX.Element {
  const { isModalOpen } = useContext(AppContext);
  const body = document.body;

  useEffect(() => {
    if (isModalOpen) {
      body.classList.add('modalOpen');
      return;
    }
    body.classList.remove('modalOpen');
  }, [isModalOpen]);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<ImageGallery />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/my_images" element={<ImageGallery />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
