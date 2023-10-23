/* eslint-disable react/prop-types */
import Modal from 'react-modal';
import MyCart from './MyCart';

const customStyles = {
  overlay: {
    zIndex: 100,
    overflow: 'auto',
  },
  content: {
    overflow: 'auto',
    width: '80%',
    top: '50%',
    zIndex: 1000,
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    paddingBottom: '60px',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: '5px 5px 10px lightgrey',
  },
};

Modal.setAppElement('#root');

const CartModal = ({modalIsOpen, closeModal}) => {
    
    return (
        <div className='absolute'>     
          <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          >
            <div className='text-right'>
              <button onClick={closeModal} className='font-bold text-3xl'>
                <ion-icon name="close"></ion-icon>
              </button>
              </div>
            <MyCart></MyCart>
          </Modal>
        </div>
    );
};

export default CartModal;