
buttonChangeColor.addEventListener("click", function(){
    const colors = ["deeppink", "green", "red", "blue"];

    btnA.changeBgColor(getRandomItem(colors));
    btnB.changeBgColor(getRandomItem(colors));
    btnC.changeBgColor(getRandomItem(colors));
})

buttonChangeText.addEventListener("click", function(){
    const texts = ["Ola", "Tudo bem", "Como vai", "Tchau", "Arigato", "Tomou?!"];

    btnA.changeText(getRandomItem(texts));
    btnB.changeText(getRandomItem(texts));
    btnC.changeText(getRandomItem(texts));
})

// =====================================
// Exemplo de uso do componte de ações
// =====================================
acoes.addEventListener("buyStocks", (event) => {
    const eventDetail = event.detail;
    console.warn(`Ordem de compra de ${ eventDetail.quantity } ações da ${ eventDetail.stock.ticket} por ${formatCurrency(eventDetail.totalPrice)}.`)
})

acoes.addEventListener("buyStocksError", (event) => {
    const eventDetail = event.detail;
    console.warn(eventDetail.message)
})

acoes.addEventListener("sellStocks", (event) => {
    const eventDetail = event.detail;
    console.warn(`Ordem de venda de ${ eventDetail.quantity } ações da ${ eventDetail.stock.ticket } por ${formatCurrency(eventDetail.totalPrice)}.`)
})

acoes.addEventListener("sellStocksError", (event) => {
    const eventDetail = event.detail;
    console.warn(eventDetail.message)
})

sellStockButton.addEventListener("click", function(){
    acoes.sellStocks(StockTicket.APPL3, 5);
    acoes.sellStocks(StockTicket.VAL3, 50);
    acoes.sellStocks(StockTicket.BB4S, 10);
    acoes.sellStocks(StockTicket.AMZ4, 500);
})

buyStockButton.addEventListener("click", function(){
    acoes.buyStocks(StockTicket.APPL3, 5);
    acoes.buyStocks(StockTicket.VAL3, 50);
    acoes.buyStocks(StockTicket.BB4S, 10);
    acoes.buyStocks(StockTicket.AMZ4, 500);
})

updateVariation.addEventListener("click", function(){
    acoes.setVariation(StockTicket.APPL3, getRandomStockVariation());
    acoes.setVariation(StockTicket.VAL3, getRandomStockVariation());
    acoes.setVariation(StockTicket.BB4S, getRandomStockVariation());
    acoes.setVariation(StockTicket.AMZ4, getRandomStockVariation());
})

acoes.addEventListener("clickTicket", (event) => {
    console.warn(`Clicou em TICKET para ${ event.detail.stock.ticket }`);
})

acoes.addEventListener("clickVariation", (event) => {
    console.warn(`Clicou em VARIAÇÃO para ${ event.detail.stock.ticket }`);
    acoes.setVariation(event.detail.stock.ticket, getRandomStockVariation());
})

acoes.addEventListener("clickFinalPrice", (event) => {
    console.warn(`Clicou em PREÇO para ${ event.detail.stock.ticket }`);
})

acoes.addEventListener("clickOrder", (event) => {
    console.warn(`Clicou em ORDEM para ${ event.detail.stock.ticket }`);
})
// =====================================


