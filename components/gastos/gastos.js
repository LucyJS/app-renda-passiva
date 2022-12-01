createComponent("gastos", (componetInst, staticContent) => {
    componetInst.dataArray = []; 
    
    const tbody = componetInst.querySelector("table tbody");  
    componetInst.render = () => { 
        tbody.innerHTML = "";  
        
        componetInst.dataArray.forEach(gasto => { 
            
            if (gasto.value === 0) {
                delete gasto;
                return;
            }
            
            const keys = Object.keys(gasto);
            const tr = document.createElement("tr"); 
            tr.setAttribute('index',gasto.index)
            tbody.append(tr); 
            
            keys.forEach(key => {  
                if (key === "index") return;
                const celula = document.createElement("td"); 
                
                if ( key === "name") { 
                    celula.textContent = gasto[key];
                    tr.append(celula); 
                    return;
                }  
                celula.textContent = formatCurrency(gasto[key]); 
                
                tr.append(celula); 
            })
        })
        clickCell(); 
    }
    
    componetInst.addItem = (itemGastos) => { 
        index = Object.keys(componetInst.dataArray).length; 
        itemGastos['index'] = index; 
        componetInst.dataArray.push(itemGastos);
        componetInst.render(); 
        componetInst.updateTotal();
        componetInst.eventAddGastos(itemGastos);
    }
    
    function getObjKey(obj, value) {
        return Object.keys(obj).find(key => obj[key] === value);
    }
    
    var add = document.getElementById('addGastos')   
    add.addEventListener('click', (event) => { 
        const gasto = {
            name: "",
            value: 0,
            debts: 0, 
        }
        gasto.name = document.getElementById('selectGastos').value;
        gasto.value = parseInt(document.getElementById('valorGastos').value);
        gasto.debts = parseInt(document.getElementById('dividaGastos').value);  
        
        if (gasto.value > 0)   //!isNaN( dividas.value))
        { 
            if (!isNaN(gasto.debts) && gasto.debts !==0) {
                gasto.value = per(gasto.debts, gasto.value); 
            }else{ gasto.debts = 0;}
            componetInst.addItem(gasto)  
            componetInst.updateTotal(); 
        }else {
            alert("Digite % da divida")
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
    
    function clickCell() {
        var row = document.getElementById('gastosTabela').rows; 
        for (var i = 0; i < row.length; i++) { 
            for (var j = 0; j < row[i].cells.length; j++) {  
                var index = row[i].Index;
                row[i].cells[j].addEventListener('click', function () {  
                    if (this.parentElement.parentElement === TbodyGastos & this.classList != "gastosRemoved") 
                    {      
                        let index = this.parentElement.getAttribute("index");
                        RemoverByCLick(this.parentElement,index);  
                        
                    }
                })
            }
        }
    }
    
    function RemoverByCLick(thisParentElemet,index) { 
        const name = thisParentElemet.childNodes[0];
        const gasto = thisParentElemet.childNodes[1];
        const divida = thisParentElemet.childNodes[2];
        
        confirmAction(`Deseja excluir : ${name.textContent} - ${ gasto.textContent} -Divida: ${ divida.textContent}`)
        .then(() => {
            RemoveGastos(index);
            name.classList.add("gastosRemoved");
            gasto.classList.add("gastosRemoved");
            divida.classList.add("gastosRemoved");  
        });
    }
    
    
    function RemoveGastos(index) {   
        const gastoRemovido = componetInst.dataArray[index];  
        componetInst.eventRemoveGastos(gastoRemovido);  
        componetInst.dataArray[index].value = 0;
        componetInst.updateTotal();  
    } 
    
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
            if ( !isNaN(item)) { 
                return 0;
            }  
            return total + (item.value);
        }   
        totalGastos.textContent = formatCurrency(total);   
    } 
    
    componetInst.getTotalGastos = ()=>{  
        return totalGastos.textContent;
    }
    
    componetInst.render();
    componetInst.removeItem = ((index) => { 
        RemoveGastos(index);
        componetInst.render();
    });
    
})
