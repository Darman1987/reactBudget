
import React, { useContext } from 'react';
import ExpenseItem from './ExpenseItem';
import { AppContext } from '../context/AppContext';
import AddDepartmentButton from './AddDepartmentButton';
import ResetButton from './ResetButton';

const ExpenseList = () => {
    const { expenses } = useContext(AppContext);
    
    return (
        <>
        <div className='d-flex justify-content-between align-items-center mt-3 mb-2 allocation-title-wrap'>
            <h3 className='mb-0'>Allocations</h3>
            <div className='allocation-actions'>
                <ResetButton />
                <AddDepartmentButton />
            </div>
        </div>
        <div className='allocation-table-card'>
        <table className='table table-modern mb-0'>
          <thead>
            <tr>
              <th scope="col">Actions</th>
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
        </div>
        </>
    );
};

export default ExpenseList;
