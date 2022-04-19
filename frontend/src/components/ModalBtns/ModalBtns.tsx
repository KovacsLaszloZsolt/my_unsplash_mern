import React, { useContext } from 'react';

import { AppContextType } from '../../interfaces';
import './ModalBtns.scss';
import AppContext from '../../context/AppContext';

const ModalBtns = ({
  setIsCurrentModalOpen,
  isBtnDisabled,
}: {
  setIsCurrentModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isBtnDisabled: boolean;
}): JSX.Element => {
  const { setIsModalOpen } = useContext(AppContext) as AppContextType;
  const handleModalCancelClick = (): void => {
    setIsModalOpen(false);
    setIsCurrentModalOpen(false);
  };
  return (
    <div className="btnsCtn">
      <span className="cancelBtn" onClick={handleModalCancelClick}>
        Cancel
      </span>
      <button className="btn primary" type="submit" disabled={isBtnDisabled}>
        Submit
      </button>
    </div>
  );
};

export default ModalBtns;
