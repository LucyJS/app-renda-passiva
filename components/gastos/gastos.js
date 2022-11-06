createComponent("gastos",(componetInst,staticContent)=>{
    componetInst.dataArray = [
        {
            name: "Fixos",
            value: 1111,
            debts:222
        },
        {
            name: "Variavéis",
            value: 333,
            debts:444
        },
        {
            name: "Inpostos",
            value: 555,
            debts:4444
        }];
        
        componetInst.render = () => { 
            //  const valores = Object.values(firstItem);
            // limpa o corpo da tabela
            const tbody = componetInst.querySelector("table tbody");
            tbody.innerHTML = "";
            
            
            componetInst.dataArray.forEach(item => {
                // const correntItem = item;
                const valores = Object.values(item);
                const tr = document.createElement("tr");
                tbody.append(tr);
                valores.forEach(itemB => {
                    
                    
                    const itemLista = document.createElement("td");
                    itemLista.textContent = itemB;
                    tr.append(itemLista);
                })   
            })  
        }
        
        console.warn(componetInst.dataArray);  
        componetInst.addItem = (itemGastos) => {
            componetInst.dataArray.push(itemGastos);
            componetInst.render();
            
        }
        //  componetInst.addItem(firstItem);
        
        // componetInst.addItemList = (itemList) => {
        //         itemList.forEach(item => {
        //             componetInst.addItem(item);
        //         })
        //     }
        
        componetInst.render();
    })
    