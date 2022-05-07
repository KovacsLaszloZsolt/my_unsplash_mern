import React, { useContext } from 'react';

import './ModalBtns.scss';
import AppContext from '../../context/AppContext';

const ModalBtns = ({
  setIsCurrentModalOpen,
  isBtnDisabled,
  buttonTitle,
  buttonClass,
}: {
  setIsCurrentModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isBtnDisabled: boolean;
  buttonTitle: string;
  buttonClass: string;
}): JSX.Element => {
  const { setIsModalOpen } = useContext(AppContext);
  const handleModalCancelClick = (): void => {
    setIsModalOpen(false);
    setIsCurrentModalOpen(false);
  };
  return (
    <div className="btnsCtn">
      <span className="cancelBtn" onClick={handleModalCancelClick}>
        Cancel
      </span>
      <button className={`btn ${buttonClass}`} type="submit" disabled={isBtnDisabled}>
        {buttonTitle}
      </button>
    </div>
  );
};

export default ModalBtns;
