import { useContext, useEffect } from 'react';

// import { AppContextType } from './interfaces';
import './App.scss';
import AppContext from './context/AppContext';
import Header from './components/Header/Header';
import ImageGallery from './components/ImageGallery/ImageGallery';

function App(): JSX.Element {
  const { isModalOpen } = useContext(AppContext);
  const body = document.querySelector('body');

  useEffect(() => {
    body?.classList.toggle('modalOpen');
  }, [isModalOpen]);

  return (
    <div className="App">
      <Header />
      <ImageGallery />
    </div>
  );
}

export default App;
