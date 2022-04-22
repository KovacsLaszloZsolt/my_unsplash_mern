import React, { useContext, useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

import './SearchBar.scss';
import AppContext from '../../context/AppContext';

const SearchBar = (): JSX.Element => {
  const { searchValue, getAllImages, setSearchValue } = useContext(AppContext);

  const handleInputChange = async (e: React.ChangeEvent): Promise<void> => {
    const target = e.target as HTMLInputElement;
    setSearchValue(target.value);
  };

  useEffect(() => {
    void getAllImages(0);
  }, [searchValue]);

  return (
    <div className="searchBar">
      <label className="searchIcon" htmlFor="search">
        <AiOutlineSearch />
      </label>
      <input
        className="searchInput"
        type="text"
        name="search"
        id="search"
        placeholder="Search by name"
        value={searchValue}
        onChange={(e) => void handleInputChange(e)}
      />
    </div>
  );
};

export default SearchBar;
