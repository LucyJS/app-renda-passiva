createComponent("gastos", (componetInst, staticContent) => {
    componetInst.dataArray = [
        {
            name: "Fixos",
            value: 11,
            debts: 222
        },
        {
            name: "Variavéis",
            value: 11,
            debts: 444
        },
        {
            name: "Inpostos",
            value: 11,
            debts: 4444
        }];
        
        componetInst.render = () => {
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
            componetInst.updateTotal();
        }
        
        componetInst.addItem = (itemGastos) => {
            componetInst.dataArray.push(itemGastos);
            componetInst.render();  
        }
        
        
        
        var add = document.getElementById('addGastos')   
        add.addEventListener('click', (event) => { 
            const dividas = {
                name: "",
                value: 0,
                debts: 0
            }
            dividas.name = document.getElementById('selectGastos').value;
            dividas.value = parseInt(document.getElementById('valorGastos').value);
            dividas.debts = parseInt(document.getElementById('dividaGastos').value); 
            
            if(dividas.value > 0)
            { 
                if (!isNaN(dividas.debts)) {
                    dividas.value = per(dividas.debts, dividas.value); 
                }else{ dividas.debts = 0;}
                
                componetInst.addItem(dividas) 
            }
        });
        
        function per(num, amount){
            return num*amount/100;
        }
        // componetInst.addItem(emprestimos)
        
        componetInst.addItemList = (itemList) => {
            itemList.forEach(item => {
                componetInst.addItem(item);
                //  eventAdd(item);
            })
        }
        
        
        // componetInst.eventAdd((objectGastos) => {
        //     const customEventName = "addGastos";
        //     const dados = objectGastos;
        //     customDispatchEvent(componetInst, customEventName, dados);
        // });
        
        
        componetInst.updateTotal = () => { 
            var total = componetInst.dataArray.reduce(getTotal, 0);
            function getTotal(total, item) {
                return total + (item.value);
            } 
            totalGastos.textContent = formatCurrency(total)   
        } 
        
        componetInst.getTotalReceita=()=>{  
            return totalGastos.textContent;
        }
        componetInst.render();
    })
    