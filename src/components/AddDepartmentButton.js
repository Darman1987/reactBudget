import React, { useContext, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { AppContext } from '../context/AppContext';

const AddDepartmentButton = () => {
    const { dispatch } = useContext(AppContext);
    const [isOpen, setIsOpen] = useState(false);
    const [departmentName, setDepartmentName] = useState('');

    const addDepartment = () => {
        dispatch({
            type: 'ADD_DEPARTMENT',
            payload: {
                name: departmentName,
            },
        });
        setDepartmentName('');
        setIsOpen(false);
    };

    return (
        <>
        <button
            type='button'
            className='btn btn-outline-secondary btn-sm d-inline-flex align-items-center justify-content-center'
            onClick={() => setIsOpen(true)}
            aria-label='Add department'
            title='Add department'
        >
            <FiPlus size={18} />
        </button>

        {isOpen && (
            <div className='add-modal-backdrop' role='dialog' aria-modal='true' aria-label='Add department'>
                <div className='add-modal-card shadow-lg'>
                    <div className='add-modal-header'>
                        <h5 className='mb-0'>Add Department</h5>
                        <button
                            type='button'
                            className='add-close-btn'
                            aria-label='Close'
                            onClick={() => setIsOpen(false)}
                        >
                            <span aria-hidden='true'>&times;</span>
                        </button>
                    </div>
                    <div className='add-modal-body'>
                        <label htmlFor='new-department-name' className='small d-block mb-2'>Department name</label>
                        <input
                            id='new-department-name'
                            type='text'
                            className='form-control'
                            value={departmentName}
                            onChange={(event) => setDepartmentName(event.target.value)}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    addDepartment();
                                }
                            }}
                            autoFocus
                        />
                    </div>
                    <div className='message-popup-footer'>
                        <button
                            type='button'
                            className='btn btn-outline-secondary btn-sm'
                            onClick={() => setIsOpen(false)}
                        >
                            Cancel
                        </button>
                        <button
                            type='button'
                            className='btn btn-primary btn-sm row-action-delete-btn'
                            onClick={addDepartment}
                        >
                            Add
                        </button>
                    </div>
                </div>
            </div>
        )}
        </>
    );
};

export default AddDepartmentButton;
