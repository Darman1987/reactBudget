import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { FiSettings } from 'react-icons/fi';

const DepartmentSettings = () => {
    const { expenses, dispatch } = useContext(AppContext);
    const [isOpen, setIsOpen] = useState(false);
    const [editedNames, setEditedNames] = useState({});
    const [newDepartmentName, setNewDepartmentName] = useState('');

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const initialNames = {};
        expenses.forEach((expense) => {
            initialNames[expense.id] = expense.name;
        });
        setEditedNames(initialNames);
    }, [expenses, isOpen]);

    const handleRename = (id) => {
        const currentName = editedNames[id] ?? '';
        dispatch({
            type: 'RENAME_DEPARTMENT',
            payload: {
                id,
                name: currentName,
            },
        });
    };

    const handleAddDepartment = () => {
        dispatch({
            type: 'ADD_DEPARTMENT',
            payload: {
                name: newDepartmentName,
            },
        });
        setNewDepartmentName('');
    };

    const handleDeleteDepartment = (id) => {
        dispatch({
            type: 'DELETE_DEPARTMENT',
            payload: {
                id,
            },
        });
    };

    return (
        <>
            <button
                type='button'
                className='btn btn-outline-secondary btn-sm d-inline-flex align-items-center justify-content-center'
                onClick={() => setIsOpen(true)}
                aria-label='Open expense settings'
                title='Expense settings'
            >
                <FiSettings size={18} />
            </button>

            {isOpen && (
                <div className='settings-modal-backdrop' role='dialog' aria-modal='true' aria-label='Expense settings'>
                    <div className='settings-modal-card shadow-lg'>
                        <div className='settings-modal-header'>
                            <h5 className='mb-0'>Expense Settings</h5>
                            <button
                                type='button'
                                className='settings-close-btn'
                                aria-label='Close'
                                onClick={() => setIsOpen(false)}
                            >
                                <span aria-hidden='true'>&times;</span>
                            </button>
                        </div>

                        <div className='settings-modal-body'>
                            <p className='text-muted mb-3'>Rename expenses or add new ones.</p>

                            {expenses.map((expense) => (
                                <div className='input-group mb-2' key={expense.id}>
                                    <input
                                        type='text'
                                        className='form-control form-control-sm'
                                        value={editedNames[expense.id] ?? expense.name}
                                        onChange={(event) => {
                                            setEditedNames({
                                                ...editedNames,
                                                [expense.id]: event.target.value,
                                            });
                                        }}
                                        onKeyDown={(event) => {
                                            if (event.key === 'Enter') {
                                                handleRename(expense.id);
                                            }
                                        }}
                                    />
                                    <div className='input-group-append'>
                                        <button
                                            type='button'
                                            className='btn btn-sm btn-primary'
                                            onClick={() => handleRename(expense.id)}
                                        >
                                            Save
                                        </button>
                                        <button
                                            type='button'
                                            className='btn btn-sm btn-outline-danger settings-delete-btn'
                                            onClick={() => handleDeleteDepartment(expense.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}

                            <hr />

                            <label htmlFor='new-department' className='small text-muted mb-1 d-block'>
                                Add expense
                            </label>
                            <div className='input-group'>
                                <input
                                    id='new-department'
                                    type='text'
                                    className='form-control form-control-sm'
                                    placeholder='Expense name'
                                    value={newDepartmentName}
                                    onChange={(event) => setNewDepartmentName(event.target.value)}
                                    onKeyDown={(event) => {
                                        if (event.key === 'Enter') {
                                            handleAddDepartment();
                                        }
                                    }}
                                />
                                <div className='input-group-append'>
                                    <button
                                        type='button'
                                        className='btn btn-sm btn-success'
                                        onClick={handleAddDepartment}
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default DepartmentSettings;
