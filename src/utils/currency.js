export const formatWholeNumber = (value) => {
    const parsedValue = Number(value);
    if (Number.isNaN(parsedValue)) {
        return '0';
    }

    return new Intl.NumberFormat('en-US', {
        maximumFractionDigits: 0,
    }).format(parsedValue);
};

export const formatCurrencyValue = (currency, value) => {
    return `${currency}${formatWholeNumber(value)}`;
};

export const sanitizeDigits = (value) => {
    return value.replace(/[^\d]/g, '');
};
