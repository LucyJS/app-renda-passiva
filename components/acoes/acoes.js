
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
createComponent("acoes", (component, staticContent) => {
    
    // stock data
    component.stocks = {};
    component.stocks[StockTicket.APPL3] = new Stock(StockTicket.APPL3, "blue", StockVariation.NegativeNumber08, 0);
    component.stocks[StockTicket.VAL3] = new Stock(StockTicket.VAL3, "green", StockVariation.PositiveNumber10, 5);
    component.stocks[StockTicket.BB4S] = new Stock(StockTicket.BB4S, "red", StockVariation.Half, 250);
    component.stocks[StockTicket.AMZ4] = new Stock(StockTicket.AMZ4, "orange", StockVariation.Double, 2);
    
    component.validationErrors = {};
    
    // methods
    component.getStockByTicket = (ticket) => {
        return component.stocks[ticket];
    }
    
    component.canSellStock = (ticket, quantity) => {
        const stockItem = component.stocks[ticket];
        let can;
        
        if([StockVariation.Double, StockVariation.Half, StockVariation.Lost, StockVariation.Zero].includes(stockItem.variation)){
            component.validationErrors["sellStocks"] = `Não é possível vender ${quantity} ações da ${stockItem.ticket}. Porque a variação ${stockItem.variation} é inválida.`;
            
            return false;
        }
        
        if(stockItem.quantity < quantity){
            component.validationErrors["sellStocks"] = `Não é possível vender ${quantity} ações da ${stockItem.ticket}. Porque você só tem ${stockItem.quantity} ações.`;
            
            return false;
        }
        
        return true;
    }
    
    component.sellStocks = (ticket, quantity) => {
        const stockItem = component.stocks[ticket];
        
        if(!component.canSellStock(ticket, quantity)){
            component.dispatchEvent(new CustomEvent("sellStocksError", { detail: { stock: stockItem, quantity, message: component.validationErrors["sellStocks"] }}));
            return;
        }
        
        stockItem.quantity -= quantity;
        component.render();
        
        const totalPrice = quantity * stockItem.finalPrice;
        component.dispatchEvent(new CustomEvent("sellStocks", { detail: { stock: stockItem, quantity, totalPrice }}));
    }
    
    component.canBuyStocks = (ticket, quantity) => {
        const stockItem = component.stocks[ticket];
        
        if([StockVariation.Double, StockVariation.Half, StockVariation.Lost, StockVariation.Zero].includes(stockItem.variation)){
            component.validationErrors["buyStocks"] = `Não é possível comprar ${quantity} ações da ${stockItem.ticket}. Porque a variação ${stockItem.variation} é inválida.`;
            
            return false;
        }
        
        return true;
    }
    
    component.buyStocks = (ticket, quantity) => {
        const stockItem = component.stocks[ticket];
        
        if(!component.canBuyStocks(ticket, quantity)){
            component.dispatchEvent(new CustomEvent("buyStocksError", { detail: { stock: stockItem, quantity, message: component.validationErrors["buyStocks"] }}));
            return;
        }
        
        stockItem.quantity += quantity;
        component.render();
        
        const totalPrice = quantity * stockItem.finalPrice;
        component.dispatchEvent(new CustomEvent("buyStocks", { detail: { stock: stockItem, quantity, totalPrice }}));
    }
    
    component.setVariation = (stockTicket, variationValue) => {
        component.stocks[stockTicket].variation = variationValue;
        component.render();
    }
    
    component.getStockRowByTicket = (ticket) => {
        return component.querySelector(`tbody tr.stock-${ticket}`);
    }
    
    component.render = () => {
        const stockList = Object.values(component.stocks);
        
        // update ticket colors
        stockList.forEach(stockItem => {
            const row = component.getStockRowByTicket(stockItem.ticket);
            
            const ticketCol = row.querySelector("td.stock-ticket");
            ticketCol.style.backgroundColor = stockItem.color;
            
            const variationCol = row.querySelector("td.stock-variation");
            variationCol.textContent = stockItem.variation;
            
            const finalPriceCol = row.querySelector("td.stock-final-price");
            finalPriceCol.textContent = formatCurrency(stockItem.finalPrice);
            
            const stockQuantitySpan = row.querySelector("td span.stock-quantity");
            stockQuantitySpan.textContent = `(${stockItem.quantity})`;
        });
    }
    
    //events
    initEvents = () => {
        const stockList = Object.values(component.stocks);
        stockList.forEach(stockItem => {
            const row = component.getStockRowByTicket(stockItem.ticket);
            
            const ticketCol = row.querySelector("td.stock-ticket");
            const variationCol = row.querySelector("td.stock-variation");
            const finalPriceCol = row.querySelector("td.stock-final-price");
            const orderCol = row.querySelector("td.stock-order");
            
            
            ticketCol.addEventListener("click", () => {
                component.dispatchEvent(new CustomEvent("clickTicket", { detail: { stock: stockItem }}));
            })
            
            variationCol.addEventListener("click", () => {
                component.dispatchEvent(new CustomEvent("clickVariation", { detail: { stock: stockItem }}));
            })
            
            finalPriceCol.addEventListener("click", () => {
                component.dispatchEvent(new CustomEvent("clickFinalPrice", { detail: { stock: stockItem }}));
            })
            
            orderCol.addEventListener("click", () => {
                component.dispatchEvent(new CustomEvent("clickOrder", { detail: { stock: stockItem }}));
            })
        });
    }
    
    // init
    component.render();
    initEvents();
})

