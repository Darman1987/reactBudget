
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext'; 
const Remaining = () => {
    const { expenses, budget, currency } = useContext(AppContext);
    const totalExpenses = expenses.reduce((total, item) => {
        return (total = total + item.cost);
    }, 0);
    const cardType = totalExpenses > budget ? 'metric-card-danger' : 'metric-card-success';
    return (
        <div className={`metric-card compact-mobile h-100 ${cardType}`}>
            <span>Remaining: {currency+(budget - totalExpenses)}</span>
        </div>
    );
};
export default Remaining;
