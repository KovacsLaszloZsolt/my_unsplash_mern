import { useContext } from 'react';

// import { AppContextType } from './interfaces';
import './App.scss';
import AppContext from './context/AppContext';
import Header from './components/Header/Header';
import ImageGallery from './components/ImageGallery/ImageGallery';

function App(): JSX.Element {
  const { isModalOpen } = useContext(AppContext);
  return (
    <div className={isModalOpen ? 'App modalOpen' : 'App'}>
      <Header />
      <ImageGallery />
    </div>
  );
}

export default App;
