import React from 'react';
import { ReactComponent as Logo } from '../../assets/my_unsplash_logo.svg';
import AddPhotoBtn from '../AddPhotoBtn/AddPhotoBtn';
import SearchBar from '../SearchBar/SearchBar';
import './Header.scss';

const Header = (): JSX.Element => {
  return (
    <header className="header">
      <div className="wrapper">
        <Logo />
        <SearchBar />
      </div>
      <AddPhotoBtn />
    </header>
  );
};

export default Header;
