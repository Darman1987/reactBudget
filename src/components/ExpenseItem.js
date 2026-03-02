
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { FiEdit2, FiTrash2, FiCheck } from 'react-icons/fi';

const ExpenseItem = (props) => {
    const { dispatch } = useContext(AppContext);
    const [allocationInput, setAllocationInput] = useState(props.cost.toString());
    const [departmentName, setDepartmentName] = useState(props.name);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        setAllocationInput(props.cost.toString());
    }, [props.cost]);

    useEffect(() => {
        setDepartmentName(props.name);
    }, [props.name]);

    const updateAllocation = (nextValue) => {
        if (nextValue === '') {
            return;
        }

        const parsedCost = parseInt(nextValue, 10);
        if (Number.isNaN(parsedCost) || parsedCost < 0) {
            return;
        }

        dispatch({
            type: 'SET_EXPENSE_ALLOCATION',
            payload: {
                id: props.id,
                cost: parsedCost,
            },
        });
    };

    const saveDepartmentName = () => {
        dispatch({
            type: 'RENAME_DEPARTMENT',
            payload: {
                id: props.id,
                name: departmentName,
            },
        });
        setIsEditing(false);
    };

    const deleteDepartment = () => {
        dispatch({
            type: 'REQUEST_DELETE_DEPARTMENT',
            payload: {
                id: props.id,
                name: props.name,
            },
        });
    };

    return (
        <tr>
        <td>
            {isEditing ? (
                <input
                    type="text"
                    className="form-control form-control-sm"
                    value={departmentName}
                    onChange={(event) => setDepartmentName(event.target.value)}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                            saveDepartmentName();
                        }
                    }}
                />
            ) : (
                props.name
            )}
        </td>
        <td>
            <input
                type="number"
                min="0"
                className="form-control form-control-sm allocation-input"
                value={allocationInput}
                placeholder='0'
                onChange={(event) => {
                    const nextValue = event.target.value;
                    setAllocationInput(nextValue);
                    updateAllocation(nextValue);
                }}
                onBlur={() => {
                    if (allocationInput === '') {
                        setAllocationInput(props.cost.toString());
                    }
                }}
                onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        event.currentTarget.blur();
                    }
                }}
            />
        </td>
        <td className="row-actions-cell">
            {isEditing ? (
                <button
                    type="button"
                    className="btn btn-sm btn-primary action-icon-btn"
                    onClick={saveDepartmentName}
                    aria-label="Save department name"
                    title="Save"
                >
                    <FiCheck size={16} />
                </button>
            ) : (
                <button
                    type="button"
                    className="btn btn-sm btn-outline-info action-icon-btn"
                    onClick={() => setIsEditing(true)}
                    aria-label="Edit department"
                    title="Edit"
                >
                    <FiEdit2 size={16} />
                </button>
            )}
            <button
                type="button"
                className="btn btn-sm btn-outline-danger row-action-delete-btn action-icon-btn"
                onClick={deleteDepartment}
                aria-label="Delete department"
                title="Delete"
            >
                <FiTrash2 size={16} />
            </button>
        </td>
        </tr>
    );
};

export default ExpenseItem;
