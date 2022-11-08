
createComponent("historico-transacao", (component) => {

    component.transactions = [];

    component.filterTransactionByDescription = (description) => {
        return component.transactions.filter(transaction => transaction.description === description);
    }

    component.filterTransactionByPrice = (price) => {
        return component.transactions.filter(transaction => transaction.price === price);
    }

    component.getTransaction = (index) => {
        return component.transactions[index];
    }

    component.removeLastTransaction = () => {
        const transaction = component.transactions[0];
        component.transactions.shift();
        component.render();
        customDispatchEvent(component, "removeLastTransaction", { index: 0, transaction });
    }

    component.addTransaction = (transaction) => {
        component.transactions.unshift(transaction);
        component.render();
        customDispatchEvent(component, "addTransaction", { transaction });
    }

    component.render = () => {
        const tBody = component.querySelector("tbody");

        tBody.innerHTML = "";

        component.transactions.forEach(transaction => {
            const tr = document.createElement("tr");

            const td1 = document.createElement("td");
            const td2 = document.createElement("td");
            const td3 = document.createElement("td");

            td1.classList.add("transaction-description");
            td2.classList.add("transaction-price");
            td3.classList.add("transaction-delete");
            
            td1.textContent = transaction.description;
            td2.textContent = formatCurrency(transaction.price);
            td3.innerHTML = "X";
            
            tr.append(td1);
            tr.append(td2);
            tr.append(td3);
            
            td3.addEventListener("click", () => {
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
            if(index === -1) return;
            component.transactions.splice(index, 1);
            component.render();
            customDispatchEvent(component, "removeTransaction", { index, removedTransaction });
        })
    }


    component.getTotal = () => {
        return component.transactions.reduce((acc, transaction) => {
            return acc + transaction.price;
        },0)
    }

    component.render();
})

