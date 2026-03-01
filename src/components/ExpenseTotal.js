
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
const ExpenseTotal = () => {
    const { expenses, currency } = useContext(AppContext);
    const totalExpenses = expenses.reduce((total, item) => {
        return (total += item.cost);
    }, 0);
    return (
        <div className='metric-card compact-mobile metric-card-info h-100'>
            <span>Spent so far: {currency+totalExpenses}</span>
        </div>
    );
};
export default ExpenseTotal;
