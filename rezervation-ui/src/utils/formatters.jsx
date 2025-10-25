export const formatCurrency = (n, currency = 'TRY') => new Intl.NumberFormat('tr-TR', { style: 'currency', currency }).format(n);
