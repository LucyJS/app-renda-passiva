createComponent("gastos", (componetInst, staticContent) => {
    componetInst.dataArray = [];
    
    componetInst.dataDeleted = [];
    const tbody = componetInst.querySelector("table tbody");
    componetInst.render = () => { 
        tbody.innerHTML = "";  
        componetInst.dataArray.forEach(item => { 
            const valores = Object.values(item);
            const key = Object.keys(item);
            const tr = document.createElement("tr"); 
            tbody.append(tr);
            
            valores.forEach(valor => {
                const itemLista = document.createElement("td"); 
                itemLista.textContent = valor;
                tr.append(itemLista); 
            })
        })
        clickCell(); 
    }
    
    componetInst.addItem = (itemGastos) => {
        componetInst.dataArray.push(itemGastos);
        componetInst.render(); 
        componetInst.updateTotal();
        componetInst.eventAddGastos(itemGastos);
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
            if (!isNaN(dividas.debts) && dividas.debts !==0) {
                dividas.value = per(dividas.debts, dividas.value); 
            }else{ dividas.debts = 0;}
            componetInst.addItem(dividas)  
            componetInst.updateTotal(); 
        }
    });
    
    function per(num, amount){
        return num*amount/100;
    }
    
    componetInst.addItemList = (itemList) => {
        itemList.forEach(item => {
            componetInst.addItem(item);
            
        }) 
    }
    
    function getDomIndex (target) {
        return [].slice.call(target.parentNode.children).indexOf(target)
    }
    
    function clickCell() {
        var row = document.getElementById('gastosTabela').rows; 
        for (var i = 0; i < row.length; i++) { 
            for (var j = 0; j < row[i].cells.length; j++) {  
                var index = row[i].Index;
                row[i].cells[j].addEventListener('click', function () {  
                    if (this.parentElement.parentElement === TbodyGastos & this.classList != "gastosRemoved") 
                    {   
                        this.parentElement.childNodes[0].classList.add("gastosRemoved");
                        this.parentElement.childNodes[1].classList.add("gastosRemoved");
                        this.parentElement.childNodes[2].classList.add("gastosRemoved"); 
                        RemoveGastos(getDomIndex (this.parentElement));    
                    }
                })
            }
        }
    }
    
    function RemoveGastos(index) {   
        const itemRemoved = componetInst.dataArray[index]; 
        componetInst.dataDeleted.push(itemRemoved);
        componetInst.updateTotal();
        componetInst.dataArray.splice(index, 1);
        componetInst.eventRemoveGastos(itemRemoved);
        
    } 
    
    // componetInst.removeItem((index) => {
    //     RemoveGastos(index);
    // });
    
    
    componetInst.eventAddGastos = ((objectGastos) => {
        const customEventName = "addGastos";
        const dados = objectGastos;
        customDispatchEvent(componetInst, customEventName, dados);
    });
    
    componetInst.eventRemoveGastos = ((objectGastos) => {
        const customEventName = "removeGastos";
        const dados = objectGastos;
        customDispatchEvent(componetInst, customEventName, dados);
    });
    
    componetInst.updateTotal = () => {   
        
        
        var total = componetInst.dataArray.reduce(getTotal, 0);
        function getTotal(total, item) {
            if (item === "name" || item === undefined) {
                total = 0;
                return
            }  
            return total + (item.value);
        }  
        
        var deleteds = componetInst.dataDeleted.reduce(getDeleted, 0);
        function getDeleted(deleteds, item) {
            if (item === "name" || item === undefined) {
                deleteds = 0;
                return
            } 
            return deleteds + (item.value);
        }  
        
        componetInst.dataDeleted = [];
        totalGastos.textContent = formatCurrency(total - deleteds)   
    } 
    
    componetInst.getTotalReceita=()=>{  
        return totalGastos.textContent;
    }
    componetInst.render();
})
