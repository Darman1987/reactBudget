import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const MessagePopup = () => {
    const { message, dispatch } = useContext(AppContext);

    const closeAndFocusBudget = () => {
        dispatch({ type: 'CLEAR_MESSAGE' });

        setTimeout(() => {
            const budgetInput = document.getElementById('budget');
            if (!budgetInput) {
                return;
            }
            budgetInput.focus();
        }, 0);
    };

    if (!message) {
        return null;
    }

    return (
        <div className='message-popup-backdrop' role='dialog' aria-modal='true' aria-label='Emergency message'>
            <div className='message-popup-card shadow-lg'>
                <div className='message-popup-header'>
                    <h5 className='mb-0'>Attention</h5>
                    <button
                        type='button'
                        className='close message-popup-close'
                        aria-label='Close'
                        onClick={closeAndFocusBudget}
                    >
                        <span aria-hidden='true'>&times;</span>
                    </button>
                </div>
                <div className='message-popup-body'>
                    {message}
                </div>
                <div className='message-popup-footer'>
                    <button
                        type='button'
                        className='btn btn-danger'
                        onClick={closeAndFocusBudget}
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MessagePopup;
