
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
const Budget = () => {
    const { budget, expenses, currency, dispatch} = useContext(AppContext);
    
    const totalExpenses = expenses.reduce((total, item) => {
        return (total += item.cost);
    }, 0);
    
    const increaseBudget = (value) => {
        
        if(value>20000){
            alert("The value cannot exceed 20,000");
            return;
        }

        if(value<totalExpenses){
            alert("The budget can not be lower than spending");
            return;
        }
        
        
        dispatch({
            type: 'SET_BUDGET',
            payload: value
        });

    }
    
    return (
        <div className='alert alert-secondary input-group'>
            
            <span>Budget:</span>
            <div class="input-group-prepend"  style={{ marginLeft: '1rem' }}>
                        <span class="input-group-text" >{currency}</span>
            </div>
            <input class="form-control"
            required='required'
            type='number'
            id="budget"
            step="10"
            value={budget}
            style={{ size: 10}}
            onChange={(event) => increaseBudget(event.target.value)}>
            </input>
        </div>
    );
};
export default Budget;