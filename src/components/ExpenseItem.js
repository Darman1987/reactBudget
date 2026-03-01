
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';

const ExpenseItem = (props) => {
    const { dispatch, budget } = useContext(AppContext);
    const [allocationInput, setAllocationInput] = useState(props.cost.toString());

    useEffect(() => {
        setAllocationInput(props.cost.toString());
    }, [props.cost]);

    const updateAllocation = () => {
        if (budget <= 0) {
            return;
        }

        const parsedCost = parseInt(allocationInput, 10);
        if (Number.isNaN(parsedCost)) {
            setAllocationInput(props.cost.toString());
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

    return (
        <tr>
        <td>{props.name}</td>
        <td>
            <input
                type="number"
                min="0"
                className="form-control form-control-sm"
                value={allocationInput}
                disabled={budget <= 0}
                placeholder={budget <= 0 ? 'Set budget first' : '0'}
                onChange={(event) => setAllocationInput(event.target.value)}
                onBlur={updateAllocation}
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
