import React, { useContext, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { AiOutlineSearch } from 'react-icons/ai';

import { Image } from '../../interfaces';
import './SearchBar.scss';
import AppContext from '../../context/AppContext';

const SearchBar = (): JSX.Element => {
  const { setData } = useContext(AppContext);
  const [search, setSearch] = useState('');

  const handleInputChange = async (e: React.ChangeEvent): Promise<void> => {
    const target = e.target as HTMLInputElement;
    const searchValue: string = target.value;
    setSearch(searchValue);

    try {
      const res: AxiosResponse = await axios({
        method: 'get',
        url: `/images/search?label=${searchValue}`,
      });

      const images = res.data as Image[];
      setData(images);
    } catch (err) {
      console.log(err);
    }
  };

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
        value={search}
        onChange={(e) => void handleInputChange(e)}
      />
    </div>
  );
};

export default SearchBar;
