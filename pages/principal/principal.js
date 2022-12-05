

let lastStock; // armazena a última ação selecionada para alteração de variação
var playerData;
var storage;

function loadStoragedData(){
    
    if(storage.hasSave()){
        playerData = storage.load();
    } else {
        playerData = new PlayerData();
        playerData.saldo = 50000;
        playerData.stockPositions = [
            new Stock(StockTicket.APPL3, "blue", StockVariation.Zero, 0),
            new Stock(StockTicket.VAL3, "green", StockVariation.Zero, 0),
            new Stock(StockTicket.BB4S, "red", StockVariation.Zero, 0),
            new Stock(StockTicket.AMZ4, "orange", StockVariation.Zero, 0)
        ]
        
        storage.save(playerData);
    }
    
    
    playerData.stockPositions.forEach(stockPosition => {
        acoes.setQuantity(stockPosition.ticket, stockPosition.quantity);
        acoes.setVariation(stockPosition.ticket, stockPosition.variation);
    })
    
    resumoGeral.setSaldo(playerData.saldo);
    
    if(playerData.person) {
        selecionarPersonagem.setPerson(playerData.person?.id);
        modaPersonagem.close();
    }
}

addEventListener("allComponentsReady", () => {
    storage = new Storage("player");
    
    // abrir modal de seleção personagem
    selecionarPersonagem.addPerson(new Person(1, "Márcia", "Advogada"));
    selecionarPersonagem.addPerson(new Person(2, "Jorge", "Motorista de Aplicativo"));
    selecionarPersonagem.addPerson(new Person(3, "Eduardo", "Empresário"));
    selecionarPersonagem.addPerson(new Person(4, "Alex", "Servidor Público"));
    selecionarPersonagem.addPerson(new Person(5, "Leila", "Professora"));
    selecionarPersonagem.addPerson(new Person(6, "Bruno", "Microempresário"));
    
    modaPersonagem.open();
    
    loadStoragedData();
    
    confirmarPersonagem.addEventListener("click", () => {
        const selectedPerson = selecionarPersonagem.getPerson();
        storage.update({
            person: selectedPerson
        })
        modaPersonagem.close();
    }) 
    
    acoes.addEventListener("clickOrder", (event) => {
        const stock = event.detail.stock;
        ordemAcoes.setStock(stock);
        ordemAcoes.setQuantity(stock.quantity || "");
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
        
        // update saved stock positions
        let stockPositions = storage.load().stockPositions;
        stockPositions = stockPositions.map(sp => {
            sp.quantity = acoes.getQuantity(sp.ticket);
            return sp;
        })
        storage.update({ stockPositions });
    })
    
    historicoTransacao.addEventListener("change", (event) => {
        const detail = event.detail;
        const saldo = detail.saldo;
        resumoGeral.setSaldo(saldo);
        storage.update({ saldo });
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
        
        // update saved stock positions
        let stockPositions = storage.load().stockPositions;
        stockPositions = stockPositions.map(sp => {
            sp.variation = acoes.getVariation(sp.ticket);
            return sp;
        })
        storage.update({ stockPositions });
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
    
    buttonDeleteData.addEventListener("click", () => {
        storage.clear();
        document.location.reload();
    })
    
    const addTransaction = document.getElementById("addNovaTransacao");
    addTransaction.addEventListener("click", () => {  
        modalNovaTransacao.open(); 
        
    } 
    );
    
    confirmarNovaTransacao.addEventListener("click", () => {
        modalNovaTransacao.close(); 
    } 
    );
    
})