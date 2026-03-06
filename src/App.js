import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { AppProvider } from './context/AppContext';
import Budget from './components/Budget';
import ExpenseTotal from './components/ExpenseTotal';
import ExpenseList from './components/ExpenseList';
import RemainingBudget from './components/Remaining';
import MessagePopup from './components/MessagePopup';

const App = () => {
    return (
        <AppProvider>
            <div className='container app-shell py-4'>
                <div className='summary-sticky'>
                    <div className='d-flex justify-content-between align-items-center app-header'>
                        <h1 className='mb-0'>Budget Allocation</h1>
                    </div>
                    <div className='row g-3 mt-2'>
                        <div className='col-12 col-md-6 col-xl-4'>
                            <Budget />
                        </div>
                        <div className='col-12 col-md-6 col-xl-4'>
                            <RemainingBudget />
                        </div>
                        <div className='col-12 col-md-6 col-xl-4'>
                            <ExpenseTotal />
                        </div>
                    </div>
                </div>
                <div className='row mt-3'>
                    <div className='col-12'>
                        <ExpenseList />
                    </div>
                </div>
            </div>
            <MessagePopup />
        </AppProvider>
    );
};

export default App;
