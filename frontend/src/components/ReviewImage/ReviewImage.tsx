import { useContext, useState } from 'react';

import { AppContextType, Image } from '../../interfaces';
import './ReviewImage.scss';
import AppContext from '../../context/AppContext';
import DelModal from '../DelModal/DelModal';

const ReviewImage = ({ image }: { image: Image }): JSX.Element => {
  const { setIsModalOpen } = useContext(AppContext) as AppContextType;
  const [isHowered, setIsHowered] = useState<boolean>(false);
  const [isDelModalOpen, setIsDelModalOpen] = useState(false);

  const handleMouseEnter = (): void => {
    setIsHowered(true);
  };

  const handleMouseLeave = (): void => {
    setIsHowered(false);
  };

  const handleDelBtnClick = (): void => {
    setIsDelModalOpen(true);
    setIsModalOpen(true);
  };

  return (
    <>
      <div key={image._id} className="imageWrapper" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <img className="imageReview" src={image.reviewUrl} alt="review" />
        {isHowered && (
          <>
            <span className="imageLabel">{image.label}</span>
            <button className="delBtn" onClick={handleDelBtnClick}>
              delete
            </button>
          </>
        )}
      </div>
      {isDelModalOpen && (
        <DelModal setIsDelModalOpen={setIsDelModalOpen} isProtected={image.isProtected} id={image._id} />
      )}
    </>
  );
};

export default ReviewImage;