createComponent("receitas", (componetInst, staticContent) => {
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
                if (!isNaN(valor) ) {
                    itemLista.textContent = formatCurrency(valor); 
                } else {
                    itemLista.textContent = valor;
                } 
                tr.append(itemLista); 
            })
        })
        clickCell(); 
    }
    
    componetInst.addItem = (itemReceitas) => {
        componetInst.dataArray.push(itemReceitas);
        componetInst.render(); 
        componetInst.updateTotal();
        componetInst.eventAddGastos(itemReceitas);
    }
    
    var add = document.getElementById('addReceita')   
    add.addEventListener('click', (event) => { 
        const receitas = {
            name: "",
            value: 0, 
        }
        receitas.name = document.getElementById('selectReceita').value;
        receitas.value = parseInt(document.getElementById('valorReceitas').value);
        
        if(receitas.value > 0)
        {  
            componetInst.addItem(receitas)  
            componetInst.updateTotal(); 
        }
    });
    
    componetInst.addItemList = (itemList) => {
        itemList.forEach(item => {
            componetInst.addItem(item); 
        }) 
    }
    
    function getDomIndex (target) {
        return [].slice.call(target.parentNode.children).indexOf(target)
    }
    
    function clickCell() {
        var row = document.getElementById('receitasTabela').rows; 
        for (var i = 0; i < row.length; i++) { 
            for (var j = 0; j < row[i].cells.length; j++) {  
                var index = row[i].Index;
                row[i].cells[j].addEventListener('click', function () {  
                    if (this.parentElement.parentElement === tbodyReceitas & this.classList != "receitasRemoved") 
                    {    
                        RemoverByCLick(this.parentElement);    
                    }
                })
            }
        }
    }
    
    function RemoverByCLick(thisParentElemet) {
        const name = thisParentElemet.childNodes[0];
        const receita = thisParentElemet.childNodes[1];
        
        
        confirmAction(`Deseja excluir : ${name.textContent} - ${receita.textContent} `)
        .then(() => {
            removeReceitas(getDomIndex (thisParentElemet));
            name.classList.add("receitasRemoved");
            receita.classList.add("receitasRemoved"); 
        });
    }
    
    function removeReceitas(index) {   
        const itemRemoved = componetInst.dataArray[index]; 
        componetInst.dataDeleted.push(itemRemoved);
        componetInst.updateTotal();
        componetInst.dataArray.splice(index, 1);
        componetInst.eventRemoveGastos(itemRemoved);  
    } 
    
    componetInst.eventAddGastos = ((objectReceita) => {
        const customEventName = "addReceita";
        const dados = objectReceita;
        customDispatchEvent(componetInst, customEventName, dados);
    });
    
    componetInst.eventRemoveGastos = ((objectReceita) => {
        const customEventName = "removeReceitas";
        const dados = objectReceita;
        customDispatchEvent(componetInst, customEventName, dados);
    });
    
    componetInst.updateTotal = () => {    
        var total = componetInst.dataArray.reduce(getTotal, 0);
        function getTotal(total, item) {
            if (item === "name" || !isNaN(item) || item === undefined) {
                total = 0;
                return
            }   
            return total + (item.value); 
        }  
        
        var deleteds = componetInst.dataDeleted.reduce(getDeleted, 0);
        function getDeleted(deleteds, item) {
            if (item === "name" || !isNaN(item) || item === undefined) {
                deleteds = 0;
                return
            } 
            console.warn(item.value);
            return deleteds + (item.value);
        }  
        
        componetInst.dataDeleted = [];
        totalReceita.textContent = formatCurrency(total - deleteds)   
    } 
    
    componetInst.getTotalReceita = ()=>{  
        return totalReceita.textContent;
    }
    
    componetInst.render();
    componetInst.removeItem = ((index) => { 
        removeReceitas(index);
        componetInst.render();
    });
    
})
