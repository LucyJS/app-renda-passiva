
function formatCurrency(valor){
    let formatCurrency = new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: 'BRL'
    });

    return formatCurrency.format(valor);
}