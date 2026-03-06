
import React, { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { FiEdit2, FiTrash2, FiCheck } from 'react-icons/fi';
import { formatWholeNumber, sanitizeDigits } from '../utils/currency';

const ExpenseItem = (props) => {
    const { dispatch } = useContext(AppContext);
    const [allocationInput, setAllocationInput] = useState(props.cost.toString());
    const [departmentName, setDepartmentName] = useState(props.name);
    const [isEditing, setIsEditing] = useState(false);
    const [isAllocationFocused, setIsAllocationFocused] = useState(false);
    const departmentInputRef = useRef(null);

    useEffect(() => {
        setAllocationInput(props.cost.toString());
    }, [props.cost]);

    useEffect(() => {
        setDepartmentName(props.name);
    }, [props.name]);

    useEffect(() => {
        if (isEditing && departmentInputRef.current) {
            departmentInputRef.current.focus();
            departmentInputRef.current.select();
        }
    }, [isEditing]);

    const updateAllocation = (nextValue) => {
        const normalizedValue = sanitizeDigits(nextValue);

        if (normalizedValue === '') {
            return;
        }

        const parsedCost = parseInt(normalizedValue, 10);
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
        <td className="row-actions-cell">
            <button
                type="button"
                className="btn btn-sm btn-outline-danger row-action-delete-btn action-icon-btn"
                onClick={deleteDepartment}
                aria-label="Delete expense"
                title="Delete"
            >
                <FiTrash2 size={16} />
            </button>
            {isEditing ? (
                <button
                    type="button"
                    className="btn btn-sm btn-success action-icon-btn"
                    onClick={saveDepartmentName}
                    aria-label="Save expense name"
                    title="Save"
                >
                    <FiCheck size={16} />
                </button>
            ) : (
                <button
                    type="button"
                    className="btn btn-sm btn-outline-info action-icon-btn"
                    onClick={() => setIsEditing(true)}
                    aria-label="Edit expense"
                    title="Edit"
                >
                    <FiEdit2 size={16} />
                </button>
            )}
        </td>
        <td>
            {isEditing ? (
                <input
                    ref={departmentInputRef}
                    type="text"
                    className="form-control form-control-sm"
                    value={departmentName}
                    onChange={(event) => setDepartmentName(event.target.value)}
                    onBlur={saveDepartmentName}
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
                type="text"
                inputMode="numeric"
                className="form-control form-control-sm allocation-input"
                value={isAllocationFocused ? allocationInput : formatWholeNumber(allocationInput)}
                placeholder='0'
                onChange={(event) => {
                    const nextValue = sanitizeDigits(event.target.value);
                    setAllocationInput(nextValue);
                    updateAllocation(nextValue);
                }}
                onFocus={() => setIsAllocationFocused(true)}
                onBlur={() => {
                    setIsAllocationFocused(false);
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
        </tr>
    );
};

export default ExpenseItem;
