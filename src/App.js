import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { AppProvider } from './context/AppContext';
import Budget from './components/Budget';
import ExpenseTotal from './components/ExpenseTotal';
import ExpenseList from './components/ExpenseList';
import RemainingBudget from './components/Remaining';
import Dropdown from './components/Dropdown';
import MessagePopup from './components/MessagePopup';
import DepartmentSettings from './components/DepartmentSettings';

const App = () => {
    return (
        <AppProvider>
            <div className='container'>
                <div className='d-flex justify-content-between align-items-center mt-3'>
                    <h1 className='mb-0'>Company's Budget Allocation</h1>
                    <DepartmentSettings />
                </div>
                <p className='text-muted mb-2'>
                    First define the total budget, then distribute that amount across departments.
                </p>
                <div className='row mt-3'>
                    <div className='col-sm'>
                        <Budget />
                    </div>
                    <div className='col-sm'>
                        <RemainingBudget />
                    </div>
                    <div className='col-sm'>
                        <ExpenseTotal />
                    </div>
                    <div className='col-sm'>
                        <Dropdown />
                    </div>
                </div>
                <div className='row '>
                    <div className='col-sm'>
                        <ExpenseList />
                    </div>
                </div>
            </div>
            <MessagePopup />
        </AppProvider>
    );
};

export default App;
