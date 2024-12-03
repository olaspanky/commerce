// Modal.js
import React from 'react';

const Modal = ({ isOpen, onClose, message }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full flex flex-col justify-center items-center ">
            <p className='text-center'>Congratulations. Your Report is on the way. <br/> <span className='text-xs'>Please check your spam or junk folder if the email does not appear in your inbox.</span></p>






<button
                    onClick={onClose}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default Modal;
