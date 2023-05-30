
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
        
            <select class="form-select" onChange={(event) => handleCurrency(event.target.value)}>
                    {currencies.map((currency) => (
                    <option value={currency.id}> {currency.id+" "+currency.name}</option>
                ))}
            </select>
        
    );
};





export default Dropdown;