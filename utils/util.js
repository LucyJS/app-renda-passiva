
function formatCurrency(value){
    let formatCurrency = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2
    });

    return formatCurrency.format(value);
}

function getRandomStockVariation(){
    const variation = Object.values(StockVariation);
    const randomIndex = Math.floor(Math.random() * variation.length);
    return variation[randomIndex];
}