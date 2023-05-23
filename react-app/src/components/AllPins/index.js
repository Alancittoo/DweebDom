import { useState } from 'react';
import OpenModalPinDetail from '../SinglePinDetail';
import { Modal } from '../../context/Modal';
import './AllPins.css'

function PinImage({ pin }) {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      {/* <img
        className='HomePage-pin-image'
        src={pin.image_url}
        alt={pin.title}
        onClick={openModal}
      /> */}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <OpenModalPinDetail pin={pin} />
        </Modal>
      )}
    </>
  );
}

export default PinImage;
