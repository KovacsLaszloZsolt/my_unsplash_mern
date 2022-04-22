import { useContext, useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';

import './ImageGallery.scss';
import AppContext from '../../context/AppContext';
import ReviewImage from '../ReviewImage/ReviewImage';
import ImageViewerModal from '../ImageViewerModal/ImageViewerModal';

const ImageGallery = (): JSX.Element => {
  const { data, getAllImages, isFetching, setIsFetching } = useContext(AppContext);
  const [viewImageIndex, setViewImageIndex] = useState<number | null>(null);

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
    default: 5,
    1910: 4,
    1582: 3,
    1146: 2,
    764: 1,
    382: 0,
  };

  return (
    <main>
      {data && (
        <>
          <Masonry breakpointCols={breakpointColumnsObj} className="imageGallery" columnClassName="column">
            {data.map((image, index) => (
              <ReviewImage key={image._id} image={image} setViewImageIndex={setViewImageIndex} index={index} />
            ))}
          </Masonry>
          {setViewImageIndex !== null && <ImageViewerModal index={viewImageIndex} setIndex={setViewImageIndex} />}
        </>
      )}
    </main>
  );
};

export default ImageGallery;
