createComponent("receitas", (componetInst, staticContent) => {
    componetInst.dataArray = [];  
    
    const tbody = componetInst.querySelector("table tbody");  
    componetInst.render = () => { 
        tbody.innerHTML = "";  
        componetInst.dataArray.forEach(receita => { 
            
            if (receita.value === 0) {
                delete receita;
                return;
            }
            
            // const valores = Object.values(item);
            const keys = Object.keys(receita);
            const tr = document.createElement("tr"); 
            tr.setAttribute('index',receita.index)
            tbody.append(tr);
            
            keys.forEach(key => {  
                if (key === "index") return;
                const celula = document.createElement("td");  
                if ( key === "name") { 
                    celula.textContent = receita[key];
                    tr.append(celula); 
                    return;
                }  
                celula.textContent = formatCurrency(receita[key]); 
                
                tr.append(celula); 
            })
        })
        clickCell(); 
    }
    
    componetInst.addItem = (itemReceitas) => {
        index = Object.keys(componetInst.dataArray).length; 
        itemReceitas['index'] = index; 
        componetInst.dataArray.push(itemReceitas);
        componetInst.render(); 
        updateTotal();
        eventAddReceita(itemReceitas);
    }
    
    var add = document.getElementById('addReceita')   
    add.addEventListener('click', (event) => { 
        const receita = {
            name: "",
            value: 0,  
        }
        receita.name = document.getElementById('selectReceita').value;
        receita.value = parseInt(document.getElementById('valorReceitas').value); 
        
        if (receita.value > 0)   //!isNaN( dividas.value))
        {  
            componetInst.addItem(receita) 
            updateTotal();
        } else {
            alert("Digite o valor")
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
                        let index = this.parentElement.getAttribute("index");
                        RemoverByCLick(this.parentElement,index);   
                    }
                })
            }
        }
    }
    
    function RemoverByCLick(thisParentElemet,index) {
        const name = thisParentElemet.childNodes[0];
        const receita = thisParentElemet.childNodes[1];
        
        confirmAction(`Deseja excluir : ${name.textContent} - ${receita.textContent} `)
        .then(() => {
            removeReceitas(index);
            name.classList.add("receitasRemoved");
            receita.classList.add("receitasRemoved"); 
        });
    }
    
    function removeReceitas(index) {   
        const receitaRemovida = componetInst.dataArray[index];  
        eventRemoveReceita(receitaRemovida); 
        componetInst.dataArray[index].value = 0;
        updateTotal();
        
    } 
    
    function eventAddReceita(objectReceita) { 
        const customEventName = "addReceita";
        const dados = objectReceita;
        customDispatchEvent(componetInst, customEventName, dados); 
    }
    
    function eventRemoveReceita(objectReceita) {
        const customEventName = "removeReceitas";
        const dados = objectReceita;
        customDispatchEvent(componetInst, customEventName, dados);
    };
    
    function updateTotal() {    
        var total = componetInst.dataArray.reduce(getTotal, 0);
        function getTotal(total, item) {
            if ( !isNaN(item)) { 
                return 0;
            }  
            return total + (item.value);
        }   
        totalReceita.textContent = formatCurrency(total)   
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
