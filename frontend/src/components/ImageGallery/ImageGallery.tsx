import React, { useContext, useEffect } from 'react';
import './ImageGallery.scss';
import Masonry from 'react-masonry-css';
import ReviewImage from '../ReviewImage/ReviewImage';
import AppContext, { AppContextType } from '../../context/AppContext';

const ImageGallery = (): JSX.Element => {
  const { data, getAllImages, isFetching, setIsFetching } = useContext(AppContext) as AppContextType;
  useEffect(() => {
    void getAllImages(0);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching) {
      return;
    }
    void getAllImages(data.length);
  }, [isFetching]);
  function handleScroll(): void {
    if (window.innerHeight + document.documentElement.scrollTop + 150 < document.documentElement.offsetHeight) {
      return;
    }
    setIsFetching(true);
  }

  const breakpointColumnsObj = {
    default: 3,
    1146: 2,
    764: 1,
    382: 0,
  };

  return (
    <main>
      {data && (
        <Masonry breakpointCols={breakpointColumnsObj} className="imageGallery" columnClassName="column">
          {data.map((image) => (
            <ReviewImage key={image._id} image={image} />
          ))}
        </Masonry>
      )}
    </main>
  );
};

export default ImageGallery;
