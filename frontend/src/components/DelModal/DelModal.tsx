import React, { useContext, useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';

import AppContext from '../../context/AppContext';
import ModalBtns from '../ModalBtns/ModalBtns';

const DelModal = ({
  setIsDelModalOpen,
  isProtected,
  id,
}: {
  setIsDelModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isProtected: boolean;
  id: string;
}): JSX.Element => {
  const { setIsModalOpen, getAllImages } = useContext(AppContext);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isBtnDisabled, setIsBtnDisabled] = useState(isProtected);
  const [delResError, setDelResError] = useState('');

  const handlePasswordChange = (e: React.ChangeEvent): void => {
    const target = e.target as HTMLInputElement;

    setPassword(target.value);
  };

  const handleInputPasswordBlur = (): void => {
    if (!password) {
      setPasswordError('Password is required!');
      return;
    }
    setPasswordError('');
  };

  useEffect(() => {
    if (password) {
      setIsBtnDisabled(false);
    }
  }, [password]);

  const handleFormSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      await axios({
        method: 'delete',
        url: `/images/${id}`,
        data: { password: password },
      });
      setIsModalOpen(false);
      setIsDelModalOpen(false);
      void getAllImages(0);
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.status === 401) {
        setDelResError('Incorrect password!');
      }
    }
  };

  return (
    <div className="modal">
      <form className="modalForm" onSubmit={(e) => void handleFormSubmit(e)}>
        <h3 className="modalTitle">Are you sure?</h3>
        {isProtected && (
          <div className="inputCtn">
            <label className="inputLabel" htmlFor="label">
              Password
            </label>
            <input
              className="inputText"
              type="password"
              name="password"
              id="password"
              placeholder="password"
              value={password}
              onChange={handlePasswordChange}
              onBlur={handleInputPasswordBlur}
            />
          </div>
        )}
        {passwordError && <p className="error">{passwordError}</p>}
        {delResError && <p className="error">{delResError}</p>}
        {/* <button type="submit">submit</button> */}
        <ModalBtns setIsCurrentModalOpen={setIsDelModalOpen} isBtnDisabled={isBtnDisabled} />
      </form>
    </div>
  );
};

export default DelModal;
