
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

function getRandomStock(){
    const stocks = [
        new Stock(StockTicket.APPL3, "blue", StockVariation.NegativeNumber08, 0),
        new Stock(StockTicket.VAL3, "green", StockVariation.PositiveNumber10, 5),
        new Stock(StockTicket.BB4S, "red", StockVariation.NegativeNumber01, 250),
        new Stock(StockTicket.AMZ4, "orange", StockVariation.PositiveNumber02, 2)
    ];
    const newStock = getRandomItem(stocks);
    return newStock;
}

async function confirmAction(message){
    const confirmed = confirm(message);
    if(!confirmed) return Promise.reject();
    return await confirmed;
}