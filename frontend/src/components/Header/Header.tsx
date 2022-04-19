import React, { useContext, useState } from 'react';
import { ReactComponent as Logo } from '../../assets/my_unsplash_logo.svg';
import SearchBar from '../SearchBar/SearchBar';
import AddPhotoModal from '../AddPhotoModal/AddPhotoModal';
import './Header.scss';
import AppContext, { AppContextType } from '../../context/AppContext';

const Header = (): JSX.Element => {
  const { setIsModalOpen } = useContext(AppContext) as AppContextType;
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  const handleAddBtnClick = (): void => {
    setIsAddModalOpen(true);
    setIsModalOpen(true);
  };

  return (
    <header className="header">
      <div className="wrapper">
        <Logo />
        <SearchBar />
      </div>
      <button className="btn primary" type="button" onClick={handleAddBtnClick}>
        Add a photo
      </button>
      {isAddModalOpen && <AddPhotoModal setIsAddModalOpen={setIsAddModalOpen} />}
    </header>
  );
};

export default Header;
