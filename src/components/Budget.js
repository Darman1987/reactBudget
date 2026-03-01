
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
const Budget = () => {
    const { budget, expenses, currency, currencies, dispatch} = useContext(AppContext);
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

    const cycleCurrency = () => {
        const currentIndex = currencies.findIndex((item) => item.id === currency);
        const nextIndex = currentIndex >= 0 ? (currentIndex + 1) % currencies.length : 0;

        dispatch({
            type: 'UPDATE_CURRENCY',
            payload: currencies[nextIndex].id,
        });
    };
    
    return (
        <div className='metric-card compact-mobile metric-card-budget h-100'>
            <div className='input-group'>
            <span className='pt-2 metric-label'>Budget:</span>
            <div className="input-group-prepend"  style={{ marginLeft: '1rem' }}>
                        <button
                            type="button"
                            className="input-group-text budget-currency-btn"
                            onClick={cycleCurrency}
                            title="Change currency"
                            aria-label="Change currency"
                        >
                            {currency}
                        </button>
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
        </div>
    );
};
export default Budget;
