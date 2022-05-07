import React, { useContext, useEffect, useState } from 'react';

import './AddPhotoModal.scss';
import AppContext from '../../context/AppContext';
import ModalBtns from '../ModalBtns/ModalBtns';

type InputValues = {
  label: string;
  password: string;
  images: null | FileList;
};

const AddPhotoModal = ({
  setIsAddModalOpen,
}: {
  setIsAddModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element => {
  const { setIsModalOpen, uploadImages } = useContext(AppContext);
  const [inputValues, setInputValues] = useState<InputValues>({
    label: '',
    images: null,
    password: '',
  });
  const [errors, setErrors] = useState({ label: '', image: '' });
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);

  const handleInputChange = (e: React.ChangeEvent, key: string): void => {
    const target = e.target as HTMLInputElement;
    setInputValues({ ...inputValues, [key]: target.value });
  };

  const handleFileSelect = (e: React.ChangeEvent): void => {
    const target = e.target as HTMLInputElement;

    const images: null | FileList = target.files?.length ? target.files : null;
    if (inputValues.images && !images) {
      return;
    }
    setInputValues({ ...inputValues, images: images });
  };

  const handleInputTextBlur = (e: React.ChangeEvent): void => {
    const target = e.target as HTMLInputElement;
    if (!target.value) {
      setErrors({ ...errors, label: 'Field is required' });
      return;
    }

    setErrors({ ...errors, label: '' });
  };

  const handleFormSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    const formData = new FormData();

    if (inputValues.images) {
      Array.from(inputValues.images).forEach((image) => formData.append('images', image));
    }

    formData.append('label', inputValues.label);
    if (inputValues.password) {
      formData.append('password', inputValues.password);
    }
    void uploadImages(formData);
    setIsAddModalOpen(false);
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (inputValues.label && inputValues.images) {
      setIsBtnDisabled(false);
      return;
    }

    setIsBtnDisabled(true);
  }, [inputValues]);
  return (
    <div className="modal">
      <form className="modalForm" onSubmit={handleFormSubmit}>
        <h3 className="modalTitle">Add a new photo</h3>
        <div className="inputCtn">
          <label className="inputLabel" htmlFor="label">
            Label
          </label>
          <input
            className="inputText"
            type="text"
            name="label"
            id="label"
            placeholder="Write your image label"
            value={inputValues.label}
            onChange={(e) => handleInputChange(e, 'label')}
            onBlur={(e) => handleInputTextBlur(e)}
          />
        </div>
        {errors.label && <p className="error">{errors.label}</p>}
        <div className="inputCtn">
          <label className="inputLabel" htmlFor="password">
            Password
          </label>
          <input
            className="inputPassword"
            type="password"
            name="password"
            id="password"
            placeholder="Set your image a password"
            value={inputValues.password}
            onChange={(e) => handleInputChange(e, 'password')}
          />
        </div>
        <label className="inputFileLabel" htmlFor="image">
          {inputValues.images ? 'Change photos' : 'Choose photos'}
        </label>
        <input
          multiple
          className="inputFile"
          type="file"
          name="image"
          id="image"
          accept="image/png, image/jpeg, image/gif"
          onChange={(e) => handleFileSelect(e)}
        />
        {errors.image && <p className="error">{errors.image}</p>}
        {inputValues.images && (
          <>
            <h4>Selected images:</h4>
            {Array.from(inputValues.images).map((image: File) => (
              <p key={image.lastModified} className="selectedImage">
                {image.name}{' '}
              </p>
            ))}
          </>
        )}
        <ModalBtns
          setIsCurrentModalOpen={setIsAddModalOpen}
          isBtnDisabled={isBtnDisabled}
          buttonTitle="Submit"
          buttonClass="submitBtn"
        />
      </form>
    </div>
  );
};

export default AddPhotoModal;
