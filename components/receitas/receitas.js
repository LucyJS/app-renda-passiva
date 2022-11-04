createComponent("receitas", function (componentInstance, staticContent) {
    componentInstance.receitas = {}
    const Total = 0;
    
    function addReceita(key, value) {  
        eventAdd(key, value);
        var index = Object.keys(componentInstance.receitas).length;
        var realKey = key + "," + index;
        componentInstance.receitas[realKey] = value  
        upDateReceita(realKey,value); 
        updateTotal();
    }
    
    //addReceita("salario", 345);
    
    function upDateReceita(key,value) {  
        let tr = document.createElement("tr"); 
        let td = document.createElement("td")
        let td2 = document.createElement("td")
        
        tr.appendChild(td);
        tr.appendChild(td2);
        Tbody.appendChild(tr); 
        
        let wordKey = getFirstText(key); 
        tr.classList.add(key); 
        td.textContent = wordKey; 
        td2.textContent = formatCurrency(value);   
    }
    
    function clickCell() {
        var row = document.getElementById('tabela').rows;
        for (var i = 0; i < row.length; i++) {
            for (var j = 0; j < row[i].cells.length; j++ ) { 
                row[i].cells[j].addEventListener('click', function(){ 
                    if(this.parentElement.parentElement ===Tbody& this.classList!= "strik") 
                    {  
                        RemoveReceita(this.parentElement.classList); 
                        this.parentElement.childNodes[0].classList.add("strik");
                        this.parentElement.childNodes[1].classList.add("strik"); 
                    }
                })
            }
        }
    }
    
    function RemoveReceita(keys) { 
        
        var valor = componentInstance.receitas[keys];
        let key = getFirstText(keys[0]); 
        // alert(`Voce removeu :" ${key}, =  ${formatCurrency(valor)}`); 
        enventRemoveItem(key, valor); 
        componentInstance.receitas[keys] = 0; 
        updateTotal(); 
    } 
    
    var add = document.getElementById('addReceita')   
    add.addEventListener('click', (event) => { 
        var receita =document.getElementById('receita').value
        var valor = parseInt(document.getElementById('valor').value)
        if (receita.length != "" & valor > 0)
        {
            addReceita(receita,valor);
            clickCell()
        }
    });
    
    function updateTotal() {
        const values = Object.values(componentInstance.receitas);
        const receitaTotal = values.reduce((accumulator, value) => {
            return accumulator + value;
        }, 0);
        total.textContent = formatCurrency(receitaTotal)   
    } 
    
    function getTotalReceita(){  
        return total.textContent;
    }
    
    function eventAdd(key, value) { 
        const customEventName = "addItem";
        const dados = {key, value};
        dispatchEvent(componentInstance, customEventName, dados); 
    }
    
    function enventRemoveItem(key, value) { 
        const customEventName = "removeItem";
        const dados = {key, value};
        dispatchEvent(componentInstance, customEventName, dados); 
    } 
    
    function getFirstText(text){
        const myArray = text.split(",");
        return myArray[0]; 
    } 
});