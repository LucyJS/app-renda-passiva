

let lastStock; // armazena a última ação selecionada para alteração de variação
var playerData;
var storage;

function loadStoragedData(){
    
    if(storage.hasSave()){
        playerData = storage.load();
    } else {
        playerData = new PlayerData();
        playerData.saldo = 0;
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
    resumoGeral.setPagamento(playerData.pagamento);
    
    playerData.transactions.forEach(transaction => { 
        historicoTransacao.addTransaction(transaction);
        
        if (transaction.recorrency > 0) { 
            const receita = {
                name: transaction.description,
                value: transaction.recorrency,  
            }
            receitas.addItem(receita);
        }
        
        if (transaction.recorrency < 0) { 
            const gasto = {
                name: transaction.description,
                value: transaction.recorrency,  
                debts: transaction.price
            }
            gastos.addItem(gasto);
        }
        
        
    })
    
    if(playerData.person) {
        selecionarPersonagem.setPerson(playerData.person?.id);
        modaPersonagem.close();
    }
    updateResumoGeral();
}

addEventListener("allComponentsReady", () => {
    
    storage = new Storage("player");
    
    // dados de seleção de personagem
    selecionarPersonagem.setPersons([
        {
            id: 1,
            name: "Márcia",
            description: "Advogada",
            defaultReceiveds: [
                {description: "salario", price: 0, recorrency: 500, passiveIncome: false }
            ],
            defaultSpendings: [
                {description: "diversos", price: 0, recorrency: -300, passiveIncome: false }
            ]
        },
        {
            id: 2,
            name: "Jorge",
            description: "Motorista de Aplicativo",
            defaultReceiveds: [
                {description: "salario", price: 0, recorrency: 999, passiveIncome: false }
            ],
            defaultSpendings: [
                {description: "diversos", price: 0, recorrency: -999, passiveIncome: false }
            ]
        },
        {
            id: 3,
            name: "Eduardo",
            description: "Empresário",
            defaultReceiveds: [
                {description: "salario", price: 0, recorrency: 999, passiveIncome: false }
            ],
            defaultSpendings: [
                {description: "diversos", price: 0, recorrency: -999, passiveIncome: false }
            ]
        },
        {
            id: 4,
            name: "Alex",
            description: "Servidor Público",
            defaultReceiveds: [
                {description: "salario", price: 0, recorrency: 999, passiveIncome: false }
            ],
            defaultSpendings: [
                {description: "diversos", price: 0, recorrency: -999, passiveIncome: false }
            ]
        },
        {
            id: 5,
            name: "Leila",
            description: "Professora",
            defaultReceiveds: [
                {description: "salario", price: 0, recorrency: 999, passiveIncome: false }
            ],
            defaultSpendings: [
                {description: "diversos", price: 0, recorrency: -999, passiveIncome: false }
            ]
        },
        {
            id: 6,
            name: "Bruno",
            description: "Microempresário",
            defaultReceiveds: [
                {description: "salario", price: 0, recorrency: 999, passiveIncome: false }
            ],
            defaultSpendings: [
                {description: "diversos", price: 0, recorrency: -999, passiveIncome: false }
            ]
        },
    ]);
    
    // abrir modal de seleção personagem
    modaPersonagem.open();
    
    loadStoragedData();
    
    confirmarPersonagem.addEventListener("click", () => { 
        const selectedPerson = selecionarPersonagem.getPerson();
        storage.update({
            person: selectedPerson
        })
        
        selectedPerson.defaultReceiveds.forEach(transaction => { 
            historicoTransacao.addTransaction(transaction);
            
            if (transaction.recorrency > 0) { 
                const receita = {
                    name: transaction.description,
                    value: transaction.recorrency,  
                }
                receitas.addItem(receita);
            }  
        })
        
        selectedPerson.defaultSpendings.forEach(transaction => { 
            historicoTransacao.addTransaction(transaction);
            
            if (transaction.recorrency < 0) { 
                const gasto = {
                    name: transaction.description,
                    value: transaction.recorrency,  
                    debts: transaction.price
                }
                gastos.addItem(gasto);
            }  
        })
        
        updateResumoGeral();
        
        const newTransaction = new FinancialMovement();
        newTransaction.description = "pagamento";
        newTransaction.price = resumoGeral.getPagamento();
        newTransaction.passiveIcome = false;
        historicoTransacao.addTransaction(newTransaction);
        
        updateResumoGeral();
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
            description: detail.description,
            passiveIncome: false
        })
        
        // update saved stock positions
        let stockPositions = storage.load().stockPositions;
        stockPositions = stockPositions.map(sp => {
            sp.quantity = acoes.getQuantity(sp.ticket);
            return sp;
        })
        storage.update({ stockPositions });
    })
    
    acoes.addEventListener("buyStocks", (event) => {
        const detail = event.detail;
        
        historicoTransacao.addTransaction({
            price: detail.totalPrice,
            description: detail.description,
            passiveIncome: false
        })
        
        // update saved stock positions
        let stockPositions = storage.load().stockPositions;
        stockPositions = stockPositions.map(sp => {
            sp.quantity = acoes.getQuantity(sp.ticket);
            return sp;
        })
        storage.update({ stockPositions });
    })
    
    historicoTransacao.addEventListener("removeTransaction", (event) => {
        const detail = event.detail;
        const transaction = detail.removedTransaction;
        
        const index = receitas.getIndex(transaction.description, transaction.recorrency); 
        if (index >= 0)
        {
            receitas.removeItem(index);
        }
        
        const index2 = gastos.getIndex(transaction.description, transaction.recorrency);
        if (index2 >= 0)
        {
            gastos.removeItem(index2);
        }  
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
        novatransacao.setFormDataByTipoTransacao([
            {
                tipo: "pagamento",
                valorUnitario: resumoGeral.getPagamento(),
                valorRecorrente: 0,
                hidden: [ 'CanBeSold', "ValorUnitario", 'RelatedItens', "RendaPassiva", "ValorRecorrente", "OutroDescricao" ]
            },
            {
                tipo: "venda",
                relatedItens: historicoTransacao.getTransactionsCanBeSold().map(transaction => {
                    const description = `${transaction.description} - ${ transaction.recorrency > 0 ? 'receita' : 'gasto' } ${ formatCurrency(transaction.recorrency) }`;

                    return { 
                        value: transaction.id,
                        description: description
                    }
                }),
                relatedItensLabel: "Itens pra Venda: ",
                hidden: ['OutroDescricao', 'ValorRecorrente', 'RendaPassiva', 'CanBeSold']
            },
            {
                tipo: 'outros',
                hidden: [ 'RelatedItens' ]
            }
        ])
        modalNovaTransacao.open(); 
    });
    
    historicoTransacao.addEventListener("change", () => { 
        setTimeout(() =>{
            updateResumoGeral();
        }, 100);
        //updateResumoGeral();
    })
    
    confirmarNovaTransacao.addEventListener("click", () => {
        const formData = novatransacao.getFormData();
        
        if (formData.recorrency > 0) { 
            const receita = {
                name: formData.description,
                value: formData.recorrency,  
            }
            receitas.addItem(receita);
        }
        
        if (formData.recorrency < 0) { 
            const gasto = {
                name: formData.description,
                value: formData.recorrency,  
                debts: formData.price
            }
            gastos.addItem(gasto);
        }

        const newTransaction = new FinancialMovement();
        newTransaction.description = formData.description;
        newTransaction.price = formData.price;
        newTransaction.recorrency = formData.recorrency;
        newTransaction.passiveIncome = formData.passiveIncome;
        newTransaction.canBeSold = formData.canBeSold;
        historicoTransacao.addTransaction(newTransaction);
        
        if(formData.type === "venda") {
            historicoTransacao.removeItemById(formData.relatedItem);
        }

        modalNovaTransacao.close(); 
    });
})

function updateResumoGeral() { 
    const saldo = historicoTransacao.getTotal();
    const pagamento = receitas.getTotalReceita() + gastos.getTotalGastos();
    const passiveIncome = historicoTransacao.getTotalPassiveIncome();
    
    resumoGeral.setSaldo(saldo);
    resumoGeral.setPagamento(pagamento);
    resumoGeral.setRendaPassiva(passiveIncome);
    
    transactions = historicoTransacao.getTransactions();
    
    storage.update({ saldo, pagamento, transactions });
}