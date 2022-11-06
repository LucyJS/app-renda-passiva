
function formatCurrency(value){
    let formatCurrency = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2
    });

    return formatCurrency.format(value);
}

function getRandomStockVariation(){
    const variationList = Object.values(StockVariation);
    return getRandomItem(variationList);
}

function getRandomItem(list){
    const randomIndex = Math.floor(Math.random() * list.length);
    return list[randomIndex];
}