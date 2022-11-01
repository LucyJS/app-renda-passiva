
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
function initAcoesComponents(){
    document.querySelectorAll("table[acoes]").forEach(table => {
        if(table.componentInitialized) return;

        // stock data
        table.componentInitialized = false;

        table.stocks = {};
        table.stocks[StockTicket.APPL3] = new Stock(StockTicket.APPL3, "blue", StockVariation.NegativeNumber08, 0);
        table.stocks[StockTicket.VAL3] = new Stock(StockTicket.VAL3, "green", StockVariation.PositiveNumber10, 5);
        table.stocks[StockTicket.BB4S] = new Stock(StockTicket.BB4S, "red", StockVariation.Half, 250);
        table.stocks[StockTicket.AMZ4] = new Stock(StockTicket.AMZ4, "orange", StockVariation.Double, 2);

        table.validationErrors = {};

        // methods
        table.getStockByTicket = (ticket) => {
            return table.stocks[ticket];
        }


        table.canSellStock = (ticket, quantity) => {
            const stockItem = table.stocks[ticket];
            let can;

            if([StockVariation.Double, StockVariation.Half, StockVariation.Lost, StockVariation.Zero].includes(stockItem.variation)){
                table.validationErrors["sellStocks"] = `Não é possível vender ${quantity} ações da ${stockItem.ticket}. Porque a variação ${stockItem.variation} é inválida.`;
                
                return false;
            }

            if(stockItem.getQuantity() < quantity){
                table.validationErrors["sellStocks"] = `Não é possível vender ${quantity} ações da ${stockItem.ticket}. Porque você só tem ${stockItem.getQuantity()} ações.`;

                return false;
            }

            return true;
        }

        table.sellStocks = (ticket, quantity) => {
            const stockItem = table.stocks[ticket];

            if(!table.canSellStock(ticket, quantity)){
                table.dispatchEvent(new CustomEvent("sellStocksError", { detail: { stock: stockItem, quantity, message: table.validationErrors["sellStocks"] }}));
                return;
            }

            stockItem.quantity -= quantity;
            table.render();
            
            const totalPrice = quantity * stockItem.getFinalPrice();
            table.dispatchEvent(new CustomEvent("sellStocks", { detail: { stock: stockItem, quantity, totalPrice }}));
        }

        table.canBuyStocks = (ticket, quantity) => {
            const stockItem = table.stocks[ticket];

            if([StockVariation.Double, StockVariation.Half, StockVariation.Lost, StockVariation.Zero].includes(stockItem.variation)){
                table.validationErrors["buyStocks"] = `Não é possível comprar ${quantity} ações da ${stockItem.ticket}. Porque a variação ${stockItem.variation} é inválida.`;
                
                return false;
            }

            return true;
        }
        
        table.buyStocks = (ticket, quantity) => {
            const stockItem = table.stocks[ticket];

            if(!table.canBuyStocks(ticket, quantity)){
                table.dispatchEvent(new CustomEvent("buyStocksError", { detail: { stock: stockItem, quantity, message: table.validationErrors["buyStocks"] }}));
                return;
            }

            stockItem.quantity += quantity;
            table.render();

            const totalPrice = quantity * stockItem.getFinalPrice();
            table.dispatchEvent(new CustomEvent("buyStocks", { detail: { stock: stockItem, quantity, totalPrice }}));
        }
        
        table.setVariation = (stockTicket, variationValue) => {
            table.stocks[stockTicket].variation = variationValue;
            table.render();
        }
        
        table.getStockRowByTicket = (ticket) => {
            return table.querySelector(`tbody tr.stock-${ticket}`);
        }

        table.render = () => {
            const stockList = Object.values(table.stocks);

            // update ticket colors
            stockList.forEach(stockItem => {
                const row = table.getStockRowByTicket(stockItem.ticket);

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
            const stockList = Object.values(table.stocks);
            stockList.forEach(stockItem => {
                const row = table.getStockRowByTicket(stockItem.ticket);
        
                const ticketCol = row.querySelector("td.stock-ticket");
                const variationCol = row.querySelector("td.stock-variation");
                const finalPriceCol = row.querySelector("td.stock-final-price");
                const orderCol = row.querySelector("td.stock-order");
                
        
                ticketCol.addEventListener("click", () => {
                    table.dispatchEvent(new CustomEvent("clickTicket", { detail: { stock: stockItem }}));
                })
        
                variationCol.addEventListener("click", () => {
                    table.dispatchEvent(new CustomEvent("clickVariation", { detail: { stock: stockItem }}));
                })
        
                finalPriceCol.addEventListener("click", () => {
                    table.dispatchEvent(new CustomEvent("clickFinalPrice", { detail: { stock: stockItem }}));
                })
        
                orderCol.addEventListener("click", () => {
                    table.dispatchEvent(new CustomEvent("clickOrder", { detail: { stock: stockItem }}));
                })
            });
        }
        
        // init
        table.render();
        initEvents();
        table.componentInitialized = true;
    })
}

initAcoesComponents();