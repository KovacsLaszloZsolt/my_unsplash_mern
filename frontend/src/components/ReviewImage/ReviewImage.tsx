import { useContext, useState } from 'react';

import { Image } from '../../interfaces';
import './ReviewImage.scss';
import AppContext from '../../context/AppContext';
import DelModal from '../DelModal/DelModal';

const ReviewImage = ({
  image,
  setViewImageIndex,
  index,
}: {
  image: Image;
  setViewImageIndex: React.Dispatch<React.SetStateAction<number | null>>;
  index: number;
}): JSX.Element => {
  const { setIsModalOpen } = useContext(AppContext);
  const [isHowered, setIsHowered] = useState<boolean>(false);
  const [isDelModalOpen, setIsDelModalOpen] = useState(false);

  const handleMouseEnter = (): void => {
    setIsHowered(true);
  };

  const handleMouseLeave = (): void => {
    setIsHowered(false);
  };

  const handleViewImageClick = (): void => {
    setViewImageIndex(index);
    setIsModalOpen(true);
  };

  const handleDelBtnClick = (): void => {
    setIsDelModalOpen(true);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="imageWrapper" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <img className={`${isHowered ? 'hover' : ''} imageReview`} src={image.reviewUrl} alt="review" />
        {isHowered && (
          <div className="layerCtn">
            <span className="imageLabel">{image.label}</span>
            <button className="viewImageBtn" onClick={handleViewImageClick}>
              View
            </button>
            <button className="delBtn" onClick={handleDelBtnClick}>
              delete
            </button>
          </div>
        )}
      </div>
      {isDelModalOpen && (
        <DelModal setIsDelModalOpen={setIsDelModalOpen} isProtected={image.isProtected} id={image._id} />
      )}
    </>
  );
};

export default ReviewImage;
