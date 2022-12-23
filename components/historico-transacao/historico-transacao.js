
createComponent("historico-transacao", (component) => {
    
    component.transactions = [];

    component.getMaxId = () => {
        let maxId = 0;
        component.transactions.forEach((transaction) => {
            if(parseInt(transaction.id) > maxId){
                maxId = parseInt(transaction.id);
            }
        })
        return maxId;
    }

    component.removeItemById = (id) => {
        const transaction = component.transactions.find(item =>  item.id === id);
        if(!transaction) return;

        component.removeTransaction(transaction);
    }

    component.filterTransactionByDescription = (description) => {
        return component.transactions.filter(transaction => transaction.description === description);
    }
    
    component.filterTransactionByPrice = (price) => {
        return component.transactions.filter(transaction => transaction.price === price);
    }
    
    component.getTransactions = () => {
        return component.transactions;
    }

    component.getTransactionsCanBeSold = () => {
        return component.transactions.filter(transaction => transaction.canBeSold);
    }

    component.getTransaction = (index) => {
        return component.transactions[index];
    }
    
    component.removeLastTransaction = () => {
        const transaction = component.transactions[0];
        component.transactions.shift();
        component.render();
        customDispatchEvent(component, "removeLastTransaction", { index: 0, transaction });
        dispatchChagenEvent();
    }
    
    function dispatchChagenEvent(){
        customDispatchEvent(component, "change", { transactions: component.transactions, saldo: component.getTotal() });
    }
    
    component.addTransaction = (transaction) => {
        const hasId = !!transaction.id;
        if(!hasId){
            transaction.id = component.getMaxId() + 1;
        }
        
        component.transactions.unshift(transaction);
        component.render();
        customDispatchEvent(component, "addTransaction", { transaction });
        dispatchChagenEvent();
    }
    
    component.render = () => {
        const tBody = component.querySelector("tbody");
        
        tBody.innerHTML = "";
        
        if(component.transactions.length === 0){
            tBody.innerHTML = "<tr><td colspan='3' class='no-transactions'>Nenhum registro de transação encontrado.</td></tr>";
            return;
        }
        
        const transactionsOrdered = component.transactions.sort((a, b) => parseInt(a.id) > parseInt(b.id) ? -1 : 1)
        
        transactionsOrdered.forEach(transaction => {
            const tr = document.createElement("tr");
            
            const td1 = document.createElement("td");
            const td2 = document.createElement("td");
            const td3 = document.createElement("td");
            const td4 = document.createElement("td");
            
            td1.classList.add("transaction-description");
            td2.classList.add("transaction-price");
            td3.classList.add("transaction-recorrency");
            td4.classList.add("transaction-actions");
            
            td1.textContent = transaction.description; // + " ("+transaction.id+")";
            td2.textContent = formatCurrency(transaction.price || 0);
            td3.textContent = formatCurrency(transaction.recorrency || 0) + (transaction.passiveIncome ? "*": "");
            
            if(transaction.canBeSold){
                const acaoVender = document.createElement("span");
                acaoVender.classList.add("sell");
                acaoVender.textContent = "Vender";
                acaoVender.addEventListener("click", () => {
                    component.sellTransaction(transaction);
                })
                td4.append(acaoVender);
            }

            const acaoExcluir = document.createElement("span");
            acaoExcluir.classList.add("delete");
            acaoExcluir.textContent = "X";
            acaoExcluir.addEventListener("click", () => {
                component.removeTransaction(transaction);
            })
            td4.append(acaoExcluir);


            tr.append(td1);
            tr.append(td2);
            tr.append(td3);
            tr.append(td4);
            
            tBody.append(tr);
        })
    }

    component.sellTransaction = (transaction) => {
        console.warn(transaction);
    }
    
    component.removeTransaction = (transaction) => {
        confirmAction(`Deseja excluir a transação: ${transaction.description} - ${formatCurrency(transaction.price)}`)
        .then(() => {
            const index = component.transactions.findIndex(item => item.id === transaction.id);
            const removedTransaction = component.transactions[index];
            if (index === -1) return;
            customDispatchEvent(component, "removeTransaction", { index, removedTransaction });
            component.transactions.splice(index, 1);
            component.render();
            dispatchChagenEvent();
        })
    }
    
    component.getTotal = () => {
        return component.transactions.reduce((acc, transaction) => {
            return acc + transaction.price;
        },0)
    }

    component.getTotalPassiveIncome = () => {
        return component.transactions.reduce((acc, transaction) => {
            const value = transaction.passiveIncome ? transaction.recorrency : 0;
            return acc + value;
        },0)
    }

    component.render();
})

