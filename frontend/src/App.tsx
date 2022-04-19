import { useContext } from 'react';
import './App.scss';
import Header from './components/Header/Header';
import ImageGallery from './components/ImageGallery/ImageGallery';
import AppContext, { AppContextType } from './context/AppContext';

function App(): JSX.Element {
  const { isModalOpen } = useContext(AppContext) as AppContextType;
  return (
    <div className={isModalOpen ? 'App modalOpen' : 'App'}>
      <Header />
      <ImageGallery />
    </div>
  );
}

export default App;
