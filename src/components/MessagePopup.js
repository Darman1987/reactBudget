import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const MessagePopup = () => {
    const { message, confirmDelete, dispatch } = useContext(AppContext);

    const isDeleteConfirm = Boolean(confirmDelete);

    const closeAndFocusBudget = () => {
        if (isDeleteConfirm) {
            dispatch({ type: 'CANCEL_DELETE_DEPARTMENT' });
            return;
        }

        dispatch({ type: 'CLEAR_MESSAGE' });

        setTimeout(() => {
            const budgetInput = document.getElementById('budget');
            if (!budgetInput) {
                return;
            }
            budgetInput.focus();
        }, 0);
    };

    if (!message && !isDeleteConfirm) {
        return null;
    }

    return (
        <div className='message-popup-backdrop' role='dialog' aria-modal='true' aria-label='Message popup'>
            <div className='message-popup-card shadow-lg'>
                <div className='message-popup-header'>
                    <h5 className='mb-0'>{isDeleteConfirm ? 'Confirm Delete' : 'Attention'}</h5>
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
                    {isDeleteConfirm ? (
                        <>Are you sure you want to delete <strong>{confirmDelete.name}</strong>? This action cannot be undone.</>
                    ) : (
                        message
                    )}
                </div>
                <div className='message-popup-footer'>
                    {isDeleteConfirm ? (
                        <>
                            <button
                                type='button'
                                className='btn btn-outline-secondary btn-sm'
                                onClick={() => dispatch({ type: 'CANCEL_DELETE_DEPARTMENT' })}
                            >
                                Cancel
                            </button>
                            <button
                                type='button'
                                className='btn btn-outline-danger btn-sm row-action-delete-btn'
                                onClick={() => dispatch({ type: 'CONFIRM_DELETE_DEPARTMENT' })}
                            >
                                Delete
                            </button>
                        </>
                    ) : (
                        <button
                            type='button'
                            className='btn btn-danger'
                            onClick={closeAndFocusBudget}
                        >
                            OK
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MessagePopup;
