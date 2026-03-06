import React, { useState } from 'react';
import { FiHelpCircle } from 'react-icons/fi';

const HelpButton = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                type='button'
                className='btn btn-outline-secondary btn-sm d-inline-flex align-items-center justify-content-center'
                onClick={() => setIsOpen(true)}
                aria-label='Open help'
                title='Help'
            >
                <FiHelpCircle size={18} />
            </button>

            {isOpen && (
                <div className='help-modal-backdrop' role='dialog' aria-modal='true' aria-label='Help'>
                    <div className='help-modal-card shadow-lg'>
                        <div className='help-modal-header'>
                            <h5 className='mb-0'>How to Use</h5>
                            <button
                                type='button'
                                className='help-close-btn'
                                aria-label='Close'
                                onClick={() => setIsOpen(false)}
                            >
                                <span aria-hidden='true'>&times;</span>
                            </button>
                        </div>
                        <div className='help-modal-body'>
                            <p className='mb-2'>1. Set the total budget first.</p>
                            <p className='mb-2'>2. Add allocations for each expense.</p>
                            <p className='mb-0'>3. Use Settings to rename, add, or delete expenses.</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default HelpButton;
