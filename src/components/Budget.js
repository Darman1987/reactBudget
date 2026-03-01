
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
const Budget = () => {
    const { budget, expenses, currency, dispatch} = useContext(AppContext);
    const [budgetInput, setBudgetInput] = useState(budget.toString());
    
    const totalExpenses = expenses.reduce((total, item) => {
        return (total += item.cost);
    }, 0);
    
    useEffect(() => {
        setBudgetInput(budget.toString());
    }, [budget]);

    const increaseBudget = (value) => {
        const parsedValue = Number(value);
        if (Number.isNaN(parsedValue) || parsedValue < 0) {
            return;
        }
        
        if(parsedValue > 20000){
            dispatch({
                type: 'SET_MESSAGE',
                payload: 'The value cannot exceed 20,000.',
            });
            return;
        }

        if(parsedValue < totalExpenses){
            dispatch({
                type: 'SET_MESSAGE',
                payload: 'The budget cannot be lower than spending.',
            });
            return;
        }
        
        
        dispatch({
            type: 'SET_BUDGET',
            payload: parsedValue
        });

    }

    const handleBudgetChange = (value) => {
        if (value === '') {
            setBudgetInput('');
            return;
        }
        setBudgetInput(value);
    };

    const commitBudget = () => {
        if (budgetInput === '') {
            dispatch({
                type: 'SET_BUDGET',
                payload: 0
            });
            return;
        }
        increaseBudget(budgetInput);
    };
    
    return (
        <div className='alert alert-secondary'>
            <div className='mb-2 font-weight-bold'>Step 1: Set your initial budget</div>
            <div className='input-group'>
            <span className='pt-2'>Budget:</span>
            <div className="input-group-prepend"  style={{ marginLeft: '1rem' }}>
                        <span className="input-group-text" >{currency}</span>
            </div>
            <input className="form-control"
            required='required'
            type='number'
            id="budget"
            step="10"
            min="0"
            value={budgetInput}
            style={{ size: 10}}
            onChange={(event) => handleBudgetChange(event.target.value)}
            onBlur={commitBudget}
            onKeyDown={(event) => {
                if (event.key === 'Enter') {
                    event.currentTarget.blur();
                }
            }}>
            </input>
            </div>
            <small className='text-muted d-block mt-2'>
                Start with a total budget, then fill each department allocation below.
            </small>
        </div>
    );
};
export default Budget;
