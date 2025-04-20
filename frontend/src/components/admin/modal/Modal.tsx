import React, { useState, useEffect } from "react";
import "./Modal.css";

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  vacation: {
    vacationDestination: string;
    vacationDateStart: string;
    vacationDateEnd: string;
    price: number;
    vacationDescription: string;
    imgFileName: string;
  };
  handleFormChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleFileChange: (file: File | null) => void;
  handleFormSubmit: (e: React.FormEvent) => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  closeModal,
  vacation,
  handleFormChange,
  handleFileChange,
  handleFormSubmit,
}) => {
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [vacationState, setVacationState] = useState(vacation);

  // עדכון ה-state כאשר המודל נפתח
  useEffect(() => {
    if (isOpen) {
      setVacationState({
        ...vacation, // שימור כל הערכים של ה-vacation
      });
    }
  }, [isOpen, vacation]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result as string);
        handleFileChange(file);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={closeModal}>
          ✕
        </button>
        <h2>Edit Vacation</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label>Destination</label>
            <input
              type="text"
              name="vacationDestination"
              value={vacationState.vacationDestination}
              onChange={handleFormChange}
            />
          </div>
          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              name="price"
              value={vacationState.price}
              onChange={handleFormChange}
            />
          </div>
          <div className="form-group">
            <label>Start Date</label>
            <input
              type="date"
              name="vacationDateStart"
              value={vacationState.vacationDateStart}
              onChange={handleFormChange}
            />
          </div>
          <div className="form-group">
            <label>End Date</label>
            <input
              type="date"
              name="vacationDateEnd"
              value={vacationState.vacationDateEnd}
              onChange={handleFormChange}
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="vacationDescription"
              value={vacationState.vacationDescription}
              onChange={handleFormChange}
            ></textarea>
          </div>
          <div className="form-group">
            <label>Current Image</label>
            <input
              type="file"
              name="imgFileName"
              onChange={onFileChange}
            />
            {filePreview && (
              <img
                src={filePreview}
                alt="Vacation"
                className="current-image"
              />
            )}
            {!filePreview && vacationState.imgFileName && (
              <img
                src={`http://localhost:3000/uploads/${vacationState.imgFileName}`}
                alt="Vacation"
                className="current-image"
              />
            )}
          </div>
          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
