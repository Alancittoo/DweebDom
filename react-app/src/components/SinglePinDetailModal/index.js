import React from 'react';
import { useModal } from "../../context/Modal";
import './PinDetail.css'

const OpenModalPinDetail = ({ pin, onClose }) => {
    const { closeModal } = useModal();

    const handleCloseClick = () => {
        onClose();
      };

    return (
        <div className="modal pin-modal">
          <div className="pin-modal-image">
            <img src={pin.image_url} alt={pin.title} />
          </div>
          <div className="pin-modal-details">
            <h1>{pin.title}</h1>
            <p>{pin.description}</p>
          </div>
          <button onClick={closeModal}>Close</button>
        </div>
      );
    }

export default OpenModalPinDetail;
