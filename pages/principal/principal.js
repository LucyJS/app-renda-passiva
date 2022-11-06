

let lastStock;

addEventListener("allComponentsReady", () => {
    acoes.addEventListener("clickOrder", (event) => {
        const stock = event.detail.stock;
        ordemAcoes.setStock(stock);
        ordemAcoes.setQuantity(stock.quantity);
        modalOrdem.open();
    })

    buttonBuyStocks.addEventListener("click", () => {
        const total = formatCurrency(ordemAcoes.getTotal());
        const stock = ordemAcoes.getStock();
        acoes.buyStocks(stock.ticket, ordemAcoes.quantity);
        // TODO - registrar nova transação no histórico de transação
        // TODO - calcular o saldo com base no histórico de transação
        notificacao.addNotification(`Comprou ${ordemAcoes.quantity} unidades da ação ${stock.ticket} no valor de  ${total}.`);
        modalOrdem.close();
    })

    buttonSellStocks.addEventListener("click", () => {
        const total = formatCurrency(ordemAcoes.getTotal());
        const stock = ordemAcoes.getStock();
        acoes.sellStocks(stock.ticket, ordemAcoes.quantity);
        // TODO - registrar nova transação no histórico de transação
        // TODO - calcular o saldo com base no histórico de transação
        notificacao.addNotification(`Vendeu ${ordemAcoes.quantity} unidades da ação ${stock.ticket} no valor de  ${total}.`);
        modalOrdem.close();
    })

    acoes.addEventListener("clickVariation", (event) => {
        const stock = event.detail.stock;
        lastStock = stock;
        visualizarAcao.setStock(stock);
        selecionarVariacao.setVariation(StockVariation.Zero);
        modalVariacao.open();
    })

    confirmarVariacao.addEventListener("click", (event) => {
        const variation = selecionarVariacao.getVariation();
        const ticket = lastStock.ticket;
        acoes.setVariation(ticket, variation);
        modalVariacao.close();

        if([StockVariation.Lost, StockVariation.Double, StockVariation.Half].includes(variation)){
            const currentQuantity = acoes.getQuantity(ticket);

            const deParaAction = {};
            deParaAction[StockVariation.Lost] = () => {
                acoes.setQuantity(ticket, 0);
            };
            deParaAction[StockVariation.Double] = () => {
                acoes.setQuantity(ticket, currentQuantity * 2);
                
            };
            deParaAction[StockVariation.Half] = () => {
                acoes.setQuantity(ticket, parseInt(currentQuantity / 2));
            };

            deParaAction[variation]();
        }
    })

    selecionarVariacao.addEventListener("selectVariation", (event) => {
        const variation = event.detail.variation;
        visualizarAcao.setVariation(variation);

        if([StockVariation.Lost, StockVariation.Double, StockVariation.Half].includes(variation)){
            
            const deParaText = {};
            deParaText[StockVariation.Lost] = "Perder Todas Ações";
            deParaText[StockVariation.Double] = "Dobrar Ações";
            deParaText[StockVariation.Half] = "Perder Metade das Ações";
            
            const deParaColor = {};
            deParaColor[StockVariation.Lost] = "red";
            deParaColor[StockVariation.Double] = "gold";
            deParaColor[StockVariation.Half] = "Red";
            
            confirmarVariacao.changeText(deParaText[variation]);
            confirmarVariacao.changeBgColor(deParaColor[variation]);
            return;
        }

        confirmarVariacao.changeText("Confirmar");
        confirmarVariacao.changeBgColor("green");
    })
})