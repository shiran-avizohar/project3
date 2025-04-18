import React, { useState } from "react";
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

  if (!isOpen) return null;

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result as string); // שומרים את התמונה ב-preview
        handleFileChange(file); // מעבירים את הקובץ לפונקציה שתשמור אותו ב-state
      };
      reader.readAsDataURL(file); // המרת הקובץ ל-Base64
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={closeModal}>
          X
        </button>
        <h2>Edit Vacation</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label>Destination</label>
            <input
              type="text"
              name="vacationDestination"
              value={vacation.vacationDestination}
              onChange={handleFormChange}
            />
          </div>
          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              name="price"
              value={vacation.price}
              onChange={handleFormChange}
            />
          </div>
          <div className="form-group">
            <label>Start Date</label>
            <input
              type="date"
              name="vacationDateStart"
              value={vacation.vacationDateStart}
              onChange={handleFormChange}
            />
          </div>
          <div className="form-group">
            <label>End Date</label>
            <input
              type="date"
              name="vacationDateEnd"
              value={vacation.vacationDateEnd}
              onChange={handleFormChange}
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="vacationDescription"
              value={vacation.vacationDescription}
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
          </div>

          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
