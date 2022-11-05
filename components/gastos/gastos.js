createComponent("gastos",(componetInst,staticContent)=>{
    componetInst.dataArray = [
        {
            name: "gastos fixos",
            value: 1111,
            debts:222
        },
        {
            name: "gastos fixos",
            value: 333,
            debts:444
        },
        {
            name: "gastos fixos",
            value: 555,
            debts:4444
        }];
        
        const firstItem = componetInst.dataArray[0];  
        
        componetInst.render = () => { 
            const valores = Object.values(firstItem);
            // limpa o corpo da tabela
            const tbody = componetInst.querySelector("table tbody");
            tbody.innerHTML = "";
            const tr = document.createElement("tr");
            tbody.append(tr);
            
            valores.forEach(item => {
                
                
                const itemLista = document.createElement("td");
                itemLista.textContent = item;
                tr.append(itemLista);
            })   
        }
        
        
        componetInst.addItem = (itemGastos) => {
            componetInst.dataArray.push(itemGastos);
            componetInst.render();
            
        }
        componetInst.addItem(firstItem);
        // componetInst.addItemList = (itemList) => {
        //         itemList.forEach(item => {
        //             componetInst.addItem(item);
        //         })
        //     }
        
        componetInst.render();
    })
    