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
            
            //const  valoresGastos = Object.values(gasto);
            const keys = Object.keys(gasto);
            const tr = document.createElement("tr"); 
            tr.setAttribute('id',gasto.id)
            tbody.append(tr); 
            
            keys.forEach(key => {  
                if (key === "id") return;
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
        const dividas = {
            name: "",
            value: 0,
            debts: 0,
            id: 0
        }
        dividas.name = document.getElementById('selectGastos').value;
        dividas.value = parseInt(document.getElementById('valorGastos').value);
        dividas.debts = parseInt(document.getElementById('dividaGastos').value);  
        dividas.id = Object.keys(componetInst.dataArray).length;
        
        if (dividas.value > 0)   //!isNaN( dividas.value))
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
    
    function clickCell() {
        var row = document.getElementById('gastosTabela').rows; 
        for (var i = 0; i < row.length; i++) { 
            for (var j = 0; j < row[i].cells.length; j++) {  
                var index = row[i].Index;
                row[i].cells[j].addEventListener('click', function () {  
                    if (this.parentElement.parentElement === TbodyGastos & this.classList != "gastosRemoved") 
                    {      
                        let id = this.parentElement.getAttribute("id");
                        RemoverByCLick(this.parentElement,id);  
                        
                    }
                })
            }
        }
    }
    
    function RemoverByCLick(thisParentElemet,id) { 
        const name = thisParentElemet.childNodes[0];
        const gasto = thisParentElemet.childNodes[1];
        const divida = thisParentElemet.childNodes[2];
        
        confirmAction(`Deseja excluir : ${name.textContent} - ${ gasto.textContent} -Divida: ${ divida.textContent}`)
        .then(() => {
            RemoveGastos(id);
            name.classList.add("gastosRemoved");
            gasto.classList.add("gastosRemoved");
            divida.classList.add("gastosRemoved");  
        });
    }
    
    
    function RemoveGastos(index) {   
        const itemRemoved = componetInst.dataArray[index];  
        componetInst.dataArray[index].value = 0;
        componetInst.updateTotal(); 
        componetInst.eventRemoveGastos(itemRemoved);  
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
