import React, { createContext, useEffect, useReducer } from 'react';

// The reducer updates global state based on action type.
export const AppReducer = (state, action) => {
    let budget = 0;

    switch (action.type) {
        case 'ADD_EXPENSE': {
            let totalBudget = state.expenses.reduce((previousExp, currentExp) => {
                return previousExp + currentExp.cost;
            }, 0);
            totalBudget = totalBudget + action.payload.cost;

            if (totalBudget <= state.budget) {
                state.expenses.map((currentExp) => {
                    if (currentExp.name === action.payload.name) {
                        currentExp.cost = action.payload.cost + currentExp.cost;
                    }
                    return currentExp;
                });

                return {
                    ...state,
                    message: null,
                };
            }

            return {
                ...state,
                message: 'Cannot increase the allocation. Out of funds.',
            };
        }
        case 'RED_EXPENSE': {
            const redExpenses = state.expenses.map((currentExp) => {
                if (currentExp.name === action.payload.name && currentExp.cost - action.payload.cost >= 0) {
                    currentExp.cost = currentExp.cost - action.payload.cost;
                    budget = state.budget + action.payload.cost;
                }
                return currentExp;
            });

            return {
                ...state,
                expenses: [...redExpenses],
                message: null,
            };
        }
        case 'DELETE_EXPENSE':
            state.expenses.map((currentExp) => {
                if (currentExp.name === action.payload) {
                    budget = state.budget + currentExp.cost;
                    currentExp.cost = 0;
                }
                return currentExp;
            });

            return {
                ...state,
                budget,
                message: null,
            };
        case 'SET_BUDGET':
            state.budget = action.payload;
            return {
                ...state,
                message: null,
            };
        case 'UPDATE_CURRENCY':
            state.currency = action.payload;
            return {
                ...state,
                message: null,
            };
        case 'SET_EXPENSE_ALLOCATION': {
            const { id, cost } = action.payload;
            if (cost < 0 || Number.isNaN(cost)) {
                return state;
            }

            const currentExpense = state.expenses.find((expense) => expense.id === id);
            if (!currentExpense) {
                return state;
            }

            return {
                ...state,
                expenses: state.expenses.map((expense) => {
                    if (expense.id === id) {
                        return { ...expense, cost };
                    }
                    return expense;
                }),
                message: null,
            };
        }
        case 'RENAME_DEPARTMENT': {
            const { id, name } = action.payload;
            const trimmedName = name.trim();

            if (!trimmedName) {
                return {
                    ...state,
                    message: 'Department name cannot be empty.',
                };
            }

            const duplicate = state.expenses.some((expense) => {
                return expense.id !== id && expense.name.toLowerCase() === trimmedName.toLowerCase();
            });

            if (duplicate) {
                return {
                    ...state,
                    message: 'Department name already exists.',
                };
            }

            return {
                ...state,
                expenses: state.expenses.map((expense) => {
                    if (expense.id === id) {
                        return { ...expense, name: trimmedName };
                    }
                    return expense;
                }),
                message: null,
            };
        }
        case 'ADD_DEPARTMENT': {
            const trimmedName = action.payload.name.trim();
            if (!trimmedName) {
                return {
                    ...state,
                    message: 'Department name cannot be empty.',
                };
            }

            const duplicate = state.expenses.some((expense) => {
                return expense.name.toLowerCase() === trimmedName.toLowerCase();
            });

            if (duplicate) {
                return {
                    ...state,
                    message: 'Department name already exists.',
                };
            }

            const newDepartment = {
                id: `dept-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
                name: trimmedName,
                cost: 0,
            };

            return {
                ...state,
                expenses: [...state.expenses, newDepartment],
                message: null,
            };
        }
        case 'DELETE_DEPARTMENT': {
            const { id } = action.payload;

            if (state.expenses.length <= 1) {
                return {
                    ...state,
                    message: 'At least one department is required.',
                };
            }

            return {
                ...state,
                expenses: state.expenses.filter((expense) => expense.id !== id),
                message: null,
            };
        }
        case 'SET_MESSAGE':
            return {
                ...state,
                message: action.payload,
            };
        case 'CLEAR_MESSAGE':
            return {
                ...state,
                message: null,
            };
        default:
            return state;
    }
};

const initialState = {
    budget: 0,
    expenses: [
        { id: 'Marketing', name: 'Marketing', cost: 0 },
        { id: 'Finance', name: 'Finance', cost: 0 },
        { id: 'Sales', name: 'Sales', cost: 0 },
        { id: 'Human Resource', name: 'Human Resource', cost: 0 },
        { id: 'IT', name: 'IT', cost: 0 },
    ],
    currency: '$',
    currencies: [
        { id: '$', name: 'Dollar' },
        { id: '£', name: 'Pound' },
        { id: '€', name: 'Euro' },
        { id: '₹', name: 'Rupee' },
    ],
    message: null,
};

const STORAGE_KEY = 'budget_allocation_state_v1';

const getInitialState = () => {
    if (typeof window === 'undefined') {
        return initialState;
    }

    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) {
            return initialState;
        }

        const parsed = JSON.parse(raw);
        const parsedExpenses = Array.isArray(parsed.expenses)
            ? parsed.expenses.filter((item) => {
                return item && typeof item.id === 'string' && typeof item.name === 'string' && typeof item.cost === 'number';
            })
            : initialState.expenses;

        return {
            ...initialState,
            budget: typeof parsed.budget === 'number' ? parsed.budget : initialState.budget,
            currency: typeof parsed.currency === 'string' ? parsed.currency : initialState.currency,
            expenses: parsedExpenses,
            message: null,
        };
    } catch (error) {
        return initialState;
    }
};

export const AppContext = createContext();

export const AppProvider = (props) => {
    const [state, dispatch] = useReducer(AppReducer, undefined, getInitialState);
    let remaining = 0;

    if (state.expenses) {
        const totalExpenses = state.expenses.reduce((total, item) => {
            return total + item.cost;
        }, 0);
        remaining = state.budget - totalExpenses;
    }

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

        const persistedState = {
            budget: state.budget,
            expenses: state.expenses,
            currency: state.currency,
        };

        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(persistedState));
    }, [state.budget, state.expenses, state.currency]);

    return (
        <AppContext.Provider
            value={{
                expenses: state.expenses,
                budget: state.budget,
                remaining,
                dispatch,
                currencies: state.currencies,
                currency: state.currency,
                message: state.message,
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};
