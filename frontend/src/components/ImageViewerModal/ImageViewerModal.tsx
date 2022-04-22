import React, { useContext, useEffect, useState } from 'react';
import { Image } from 'cloudinary-react';

import './ImageViewerModal.scss';
import AppContext from '../../context/AppContext';
import { ImageType } from '../../interfaces';
import { AiFillCloseCircle } from 'react-icons/ai';
import { ImArrowLeft, ImArrowRight } from 'react-icons/im';

const ImageViewerModal = ({
  index,
  setIndex,
}: {
  index: number | null;
  setIndex: React.Dispatch<React.SetStateAction<number | null>>;
}): JSX.Element => {
  const { data, getAllImages, setIsModalOpen } = useContext(AppContext);
  const [image, setImage] = useState<ImageType | null>(index !== null ? data[index] : null);

  const handleArrowClick = (direction: string): void => {
    if (index !== null) {
      if (direction === 'right') {
        setIndex(index + 1);
        return;
      }
      setIndex(index - 1);
    }
  };

  const handleCloseClick = (): void => {
    setImage(null);
    setIndex(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (index === data.length - 1) {
      void getAllImages(data.length);
    }
  }, [index]);

  useEffect(() => {
    if (index !== null) {
      setImage(data[index]);
    }
  }, [index]);
  return (
    <>
      {image && (
        <div className="modal">
          <div className="imageFullCtn">
            <AiFillCloseCircle className="closeIcon" onClick={handleCloseClick} />
            {!!index && (
              <div className="arrowCtn arrowLeft" onClick={() => handleArrowClick('left')}>
                <ImArrowLeft />
              </div>
            )}
            <Image className="imageFull" cloudName="dxnsrmr2w" publicId={image.url} alt={image.label} />

            {!(index !== null && index + 1 === data.length) && (
              <div className="arrowCtn arrowRight" onClick={() => handleArrowClick('right')}>
                <ImArrowRight />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ImageViewerModal;
