
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';


const Dropdown = () => {
    const { currencies, dispatch } = useContext(AppContext);

    const handleCurrency = (value) => {
        dispatch({
            type: 'UPDATE_CURRENCY',
            payload: value,
        });
    };

    return (
        <div className='metric-card compact-mobile metric-card-currency h-100'>
            <label className='metric-title mb-2 d-block'>Currency</label>
            <select className="form-select" onChange={(event) => handleCurrency(event.target.value)}>
                    {currencies.map((currency) => (
                    <option key={currency.id} value={currency.id}> {currency.id+" "+currency.name}</option>
                ))}
            </select>
        </div>
    );
};





export default Dropdown;
