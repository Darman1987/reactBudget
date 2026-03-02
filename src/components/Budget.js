
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { formatWholeNumber, sanitizeDigits } from '../utils/currency';
const Budget = () => {
    const { budget, currency, currencies, dispatch} = useContext(AppContext);
    const [budgetInput, setBudgetInput] = useState(budget.toString());
    const [isBudgetFocused, setIsBudgetFocused] = useState(false);
    
    useEffect(() => {
        if (!isBudgetFocused) {
            setBudgetInput(budget.toString());
        }
    }, [budget, isBudgetFocused]);

    const increaseBudget = (value) => {
        const parsedValue = Number(sanitizeDigits(value));
        if (Number.isNaN(parsedValue) || parsedValue < 0) {
            return;
        }
        
        dispatch({
            type: 'SET_BUDGET',
            payload: parsedValue
        });

    }

    const handleBudgetChange = (value) => {
        const normalizedValue = sanitizeDigits(value);
        if (normalizedValue === '') {
            setBudgetInput('');
            return;
        }

        setBudgetInput(normalizedValue);
        increaseBudget(normalizedValue);
    };

    const commitBudget = () => {
        setIsBudgetFocused(false);

        if (budgetInput === '') {
            dispatch({
                type: 'SET_BUDGET',
                payload: 0
            });
            setBudgetInput('0');
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
            type='text'
            id="budget"
            inputMode='numeric'
            value={isBudgetFocused ? budgetInput : formatWholeNumber(budgetInput)}
            style={{ size: 10}}
            onChange={(event) => handleBudgetChange(event.target.value)}
            onFocus={() => setIsBudgetFocused(true)}
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
