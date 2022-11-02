createComponent("receitas", function (componentInstance, staticContent) { 
    componentInstance.receitas = { "salario": 100, "aumento": 200 }
    
    function addReceita(key, value) {
        componentInstance.receitas[key] = value
    }
    
    function RemoveReceita(key) {
        delete componentInstance.receitas[key];
    }
    //addReceita("negocio",300)
    //addReceita("imovel", 400) 
    
    var receitaCount = Object.keys(componentInstance.receitas).length
    var chavesDoObjeto = Object.keys(componentInstance.receitas)
    
    //document.getElementById('tabela').innerHTML = ''; 
    let td = document.createElement("td")
    let keyValues = document.createElement("tr")
    tabela.appendChild(keyValues)
    
    
    // for (let i = 0; i < receitaCount; i++) {
    //     tr[i] = document.createElement('tr');
    //     td[i] = document.createElement('td');
    
    //     const key = chavesDoObjeto[i];
    //     td[i].textContent = key
    
    //     tr[i].appendChild(td[i])  
    //     tabela.appendChild(tr[i])  
    //     // keyValues.appendChild(td[i])
    //     //tr[i].classList.add("chaves")
    // } 
    
    
    
    const values = Object.values(componentInstance.receitas);
    const receitaTotal = values.reduce((accumulator, value) => {
        return accumulator + value;
    }, 0);
    total2.textContent = receitaTotal///JSON.stringify(Receitas)
});