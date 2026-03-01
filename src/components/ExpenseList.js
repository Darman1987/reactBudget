
import React, { useContext } from 'react';
import ExpenseItem from './ExpenseItem';
import { AppContext } from '../context/AppContext';

const ExpenseList = () => {
    const { expenses, budget } = useContext(AppContext);
    
    return (
        <>
        <div className='d-flex justify-content-between align-items-center mt-3 mb-2'>
            <h3 className='mb-0'>Step 2: Add allocations by department</h3>
            {budget <= 0 && <small className='text-danger'>Set a budget first to enable allocation inputs.</small>}
        </div>
        <table className='table'>
              <thead className="thead-light">
            <tr>
              <th scope="col">Department</th>
              <th scope="col">Allocation</th>
            </tr>
          </thead>
            <tbody>
            {expenses.map((expense) => (
                <ExpenseItem key={expense.id} id={expense.id} name={expense.name} cost={expense.cost} />
            ))}
            </tbody>
        </table>
        </>
    );
};

export default ExpenseList;
