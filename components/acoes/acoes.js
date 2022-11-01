
/**
 * Properties
 *  stocks
 *  validationErrors
 * 
 * Methods
 *  getStockByTicket
 *  canSellStock
 *  sellStocks
 *  canBuyStocks
 *  buyStocks
 *  setVariation
 *  getStockRowByTicket
 *  render
 * 
 * Events
 *  sellStocksError
 *  sellStocks
 *  buyStocksError
 *  buyStocks
 *  clickTicket
 *  clickVariation
 *  clickFinalPrice
 *  clickOrder
 */
 createComponent("acoes", (componentInstance, staticContent) => {
    if(componentInstance.componentInitialized) return;

    // stock data
    componentInstance.stocks = {};
    componentInstance.stocks[StockTicket.APPL3] = new Stock(StockTicket.APPL3, "blue", StockVariation.NegativeNumber08, 0);
    componentInstance.stocks[StockTicket.VAL3] = new Stock(StockTicket.VAL3, "green", StockVariation.PositiveNumber10, 5);
    componentInstance.stocks[StockTicket.BB4S] = new Stock(StockTicket.BB4S, "red", StockVariation.Half, 250);
    componentInstance.stocks[StockTicket.AMZ4] = new Stock(StockTicket.AMZ4, "orange", StockVariation.Double, 2);

    componentInstance.validationErrors = {};

    // methods
    componentInstance.getStockByTicket = (ticket) => {
        return componentInstance.stocks[ticket];
    }


    componentInstance.canSellStock = (ticket, quantity) => {
        const stockItem = componentInstance.stocks[ticket];
        let can;

        if([StockVariation.Double, StockVariation.Half, StockVariation.Lost, StockVariation.Zero].includes(stockItem.variation)){
            componentInstance.validationErrors["sellStocks"] = `Não é possível vender ${quantity} ações da ${stockItem.ticket}. Porque a variação ${stockItem.variation} é inválida.`;
            
            return false;
        }

        if(stockItem.getQuantity() < quantity){
            componentInstance.validationErrors["sellStocks"] = `Não é possível vender ${quantity} ações da ${stockItem.ticket}. Porque você só tem ${stockItem.getQuantity()} ações.`;

            return false;
        }

        return true;
    }

    componentInstance.sellStocks = (ticket, quantity) => {
        const stockItem = componentInstance.stocks[ticket];

        if(!componentInstance.canSellStock(ticket, quantity)){
            componentInstance.dispatchEvent(new CustomEvent("sellStocksError", { detail: { stock: stockItem, quantity, message: componentInstance.validationErrors["sellStocks"] }}));
            return;
        }

        stockItem.quantity -= quantity;
        componentInstance.render();
        
        const totalPrice = quantity * stockItem.getFinalPrice();
        componentInstance.dispatchEvent(new CustomEvent("sellStocks", { detail: { stock: stockItem, quantity, totalPrice }}));
    }

    componentInstance.canBuyStocks = (ticket, quantity) => {
        const stockItem = componentInstance.stocks[ticket];

        if([StockVariation.Double, StockVariation.Half, StockVariation.Lost, StockVariation.Zero].includes(stockItem.variation)){
            componentInstance.validationErrors["buyStocks"] = `Não é possível comprar ${quantity} ações da ${stockItem.ticket}. Porque a variação ${stockItem.variation} é inválida.`;
            
            return false;
        }

        return true;
    }
    
    componentInstance.buyStocks = (ticket, quantity) => {
        const stockItem = componentInstance.stocks[ticket];

        if(!componentInstance.canBuyStocks(ticket, quantity)){
            componentInstance.dispatchEvent(new CustomEvent("buyStocksError", { detail: { stock: stockItem, quantity, message: componentInstance.validationErrors["buyStocks"] }}));
            return;
        }

        stockItem.quantity += quantity;
        componentInstance.render();

        const totalPrice = quantity * stockItem.getFinalPrice();
        componentInstance.dispatchEvent(new CustomEvent("buyStocks", { detail: { stock: stockItem, quantity, totalPrice }}));
    }
    
    componentInstance.setVariation = (stockTicket, variationValue) => {
        componentInstance.stocks[stockTicket].variation = variationValue;
        componentInstance.render();
    }
    
    componentInstance.getStockRowByTicket = (ticket) => {
        return componentInstance.querySelector(`tbody tr.stock-${ticket}`);
    }

    componentInstance.render = () => {
        const stockList = Object.values(componentInstance.stocks);

        // update ticket colors
        stockList.forEach(stockItem => {
            const row = componentInstance.getStockRowByTicket(stockItem.ticket);

            const ticketCol = row.querySelector("td.stock-ticket");
            ticketCol.style.backgroundColor = stockItem.getColor();

            const variationCol = row.querySelector("td.stock-variation");
            variationCol.textContent = stockItem.variation;

            const finalPriceCol = row.querySelector("td.stock-final-price");
            finalPriceCol.textContent = formatCurrency(stockItem.getFinalPrice());

            const stockQuantitySpan = row.querySelector("td span.stock-quantity");
            stockQuantitySpan.textContent = `(${stockItem.getQuantity()})`;
        });
    }

    //events
    initEvents = () => {
        const stockList = Object.values(componentInstance.stocks);
        stockList.forEach(stockItem => {
            const row = componentInstance.getStockRowByTicket(stockItem.ticket);
    
            const ticketCol = row.querySelector("td.stock-ticket");
            const variationCol = row.querySelector("td.stock-variation");
            const finalPriceCol = row.querySelector("td.stock-final-price");
            const orderCol = row.querySelector("td.stock-order");
            
    
            ticketCol.addEventListener("click", () => {
                componentInstance.dispatchEvent(new CustomEvent("clickTicket", { detail: { stock: stockItem }}));
            })
    
            variationCol.addEventListener("click", () => {
                componentInstance.dispatchEvent(new CustomEvent("clickVariation", { detail: { stock: stockItem }}));
            })
    
            finalPriceCol.addEventListener("click", () => {
                componentInstance.dispatchEvent(new CustomEvent("clickFinalPrice", { detail: { stock: stockItem }}));
            })
    
            orderCol.addEventListener("click", () => {
                componentInstance.dispatchEvent(new CustomEvent("clickOrder", { detail: { stock: stockItem }}));
            })
        });
    }
    
    // init
    componentInstance.render();
    initEvents();
})

