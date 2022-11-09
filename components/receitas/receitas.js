createComponent("receitas", function (componentInstance, staticContent) {
    componentInstance.receitas = {} 
    let totalReceita = 0;
    var row = document.getElementById('tabela').rows;
    
    function deleteRow(row){
        var d = row.parentNode.parentNode.rowIndex;
        document.getElementById('tabela').deleteRow(d);
    }
    componentInstance.addReceita = ((key, value) => {  
        eventAdd(key, value);
        var index = Object.keys(componentInstance.receitas).length;
        var realKey = key + "," + index;
        componentInstance.receitas[realKey] = value
        upDateReceita(realKey, value);
        updateTotal(); 
        clickCell();
    });
    
    componentInstance.RemoveReceita = (keys => {
        var valor = componentInstance.receitas[keys];
        let key = getFirstText(keys[0]);
        enventRemoveItem(key, valor);
        componentInstance.receitas[keys] = 0;
        updateTotal();
    });
    
    function upDateReceita(key, value) {
        let tr = document.createElement("tr");
        let td = document.createElement("td")
        let td2 = document.createElement("td")
        
        tr.appendChild(td);
        tr.appendChild(td2);
        tbodyReceitas.appendChild(tr);
        
        let wordKey = getFirstText(key);
        tr.classList.add(key);
        td.textContent = wordKey;
        td2.textContent = formatCurrency(value);
        
    } 
    
    
    
    function clickCell() {
        
        for (var i = 0; i < row.length; i++) {
            for (var j = 0; j < row[i].cells.length; j++ ) { 
                row[i].cells[j].addEventListener('click', function(){ 
                    if(this.parentElement.parentElement ===tbodyReceitas& this.classList!= "strik") 
                    {   
                        RemoverByCLick(this.parentElement);   
                    }
                })
            }
        }
    }
    
    function getDomIndex (target) {
        return [].slice.call(target.parentNode.children).indexOf(target)
    }
    
    function RemoverByCLick(thisParentElemet) {
        
        const key = thisParentElemet.childNodes[0];
        const value = thisParentElemet.childNodes[1];
        
        confirmAction(`Deseja excluir : ${key.textContent} - ${value.textContent}`)
        .then(() => {
            key.classList.add("strik");
            value.classList.add("strik"); 
            componentInstance.RemoveReceita(thisParentElemet.classList); 
        });
    }
    
    var add = document.getElementById('addReceita')   
    add.addEventListener('click', (event) => {  
        var receita = document.getElementById('receita').value
        var valor = parseInt(document.getElementById('valor').value)
        if (receita.length != "" & valor > 0)
        {
            componentInstance.addReceita(receita,valor); 
            
        }   
    });
    
    function updateTotal() {
        const values = Object.values(componentInstance.receitas);
        const receitaTotal = values.reduce((accumulator, value) => {
            return accumulator + value;
        }, 0);
        totalReceita = receitaTotal;
        total.textContent = formatCurrency(receitaTotal)   
    } 
    
    componentInstance.getTotalReceita=(()=>{  
        return totalReceita;
    }) 
    //componentInstance.addReceita("salario", 345); 
    
    function eventAdd(key, value) { 
        const customEventName = "addItem";
        const dados = {key, value};
        customDispatchEvent(componentInstance, customEventName, dados); 
    }
    
    function enventRemoveItem(key, value) { 
        const customEventName = "removeItem";
        const dados = {key, value};
        customDispatchEvent(componentInstance, customEventName, dados); 
    } 
    
    function getFirstText(text){
        const myArray = text.split(",");
        return myArray[0]; 
    } 
});