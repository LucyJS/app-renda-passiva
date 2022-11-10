

let lastStock; // armazena a última ação selecionada para alteração de variação

addEventListener("allComponentsReady", () => {

    // abrir modal de seleção personagem
    selecionarPersonagem.addPerson(new Person(1, "Márcia", "Advogada"));
    selecionarPersonagem.addPerson(new Person(2, "Jorge", "Motorista de Aplicativo"));
    selecionarPersonagem.addPerson(new Person(3, "Eduardo", "Empresário"));
    selecionarPersonagem.addPerson(new Person(4, "Alex", "Servidor Público"));
    selecionarPersonagem.addPerson(new Person(5, "Leila", "Professora"));
    selecionarPersonagem.addPerson(new Person(6, "Bruno", "Microempresário"));
    modaPersonagem.open();
    confirmarPersonagem.addEventListener("click", () => {
        modaPersonagem.close();
    }) 
    
    acoes.addEventListener("clickOrder", (event) => {
        const stock = event.detail.stock;
        ordemAcoes.setStock(stock);
        ordemAcoes.setQuantity(stock.quantity);
        modalOrdem.open();
    })

    buttonBuyStocks.addEventListener("click", () => {
        const total = formatCurrency(ordemAcoes.getTotal());
        const stock = ordemAcoes.getStock();
        const buyed = acoes.buyStocks(stock.ticket, ordemAcoes.quantity, resumoGeral.getSaldo());
        if(!buyed) {
            notificacao.addNotification(acoes.validationErrors["buyStocks"], NotificationType.Warning);
            return;
        }
        notificacao.addNotification(`Comprou ${ordemAcoes.quantity} unidades da ação ${stock.ticket} no valor de  ${total}.`);
        modalOrdem.close();
    })

    buttonSellStocks.addEventListener("click", () => {
        const total = formatCurrency(ordemAcoes.getTotal());
        const stock = ordemAcoes.getStock();
        const selled = acoes.sellStocks(stock.ticket, ordemAcoes.quantity);
        if(!selled) {
            notificacao.addNotification(acoes.validationErrors["sellStocks"], NotificationType.Warning);
            return;
        }

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

    acoes.addEventListener("sellStocks", (event) => {
        const detail = event.detail;

        historicoTransacao.addTransaction({
            price: detail.totalPrice,
            description: detail.description
        })
    })

    acoes.addEventListener("buyStocks", (event) => {
        const detail = event.detail;

        historicoTransacao.addTransaction({
            price: detail.totalPrice,
            description: detail.description
        })
    })

    historicoTransacao.addEventListener("change", (event) => {
        const detail = event.detail;
        const saldo = detail.saldo;
        resumoGeral.setSaldo(saldo);
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