
createComponent("historico-transacao", (component) => {
    
    component.transactions = [];
    component.counter = 1;
    
    component.filterTransactionByDescription = (description) => {
        return component.transactions.filter(transaction => transaction.description === description);
    }
    
    component.filterTransactionByPrice = (price) => {
        return component.transactions.filter(transaction => transaction.price === price);
    }
    
    component.getTransactions = () => {
        return component.transactions;
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
        if(transaction.id <= 0){
            transaction.id = component.counter++;
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
            td4.classList.add("transaction-delete");
            
            td1.textContent = transaction.description + transaction.id ;
            td2.textContent = formatCurrency(transaction.price || 0);
            td3.textContent = formatCurrency(transaction.recorrency || 0);
            td4.innerHTML = "X";
            
            tr.append(td1);
            tr.append(td2);
            tr.append(td3);
            tr.append(td4);
            
            td4.addEventListener("click", () => {
                component.removeTransaction(transaction);
            })
            
            tBody.append(tr);
        })
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
    
    component.render();
})

