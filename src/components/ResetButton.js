import React, { useContext } from 'react';
import { FiRefreshCw } from 'react-icons/fi';
import { AppContext } from '../context/AppContext';

const ResetButton = () => {
    const { dispatch } = useContext(AppContext);

    const handleReset = () => {
        dispatch({ type: 'RESET_ALL' });
    };

    return (
        <button
            type='button'
            className='btn btn-outline-danger btn-sm d-inline-flex align-items-center justify-content-center reset-btn'
            onClick={handleReset}
            aria-label='Reset all allocations and budget'
            title='Reset all'
        >
            <FiRefreshCw size={16} />
            <span className='ms-1'>Reset</span>
        </button>
    );
};

export default ResetButton;
