
createComponent("nova-transacao", (component) => {
    
    component.botaoSalvar = document.querySelector("#addNovaTransacao");
    
    component.botaoSalvar.addEventListener("click", function (event) {
        
        event.preventDefault();
        
        formNovatransacao = document.querySelector("#formularioNovatransacao")
        console.log(formNovatransacao.tipoTransacao.value);
        console.log(formNovatransacao.valorUnitario.value);
        console.log(formNovatransacao.valorRecorrente.value);
        console.log(formNovatransacao.rendaPassiva.value);
        
        linhaNovaTransacao = document.createElement("tr");
        
        //cria elemento td
        celulaTipotransacao = document.createElement("td");
        celulaValorUnitario = document.createElement("td");
        celulaValorRecorrente = document.createElement("td");
        celulaRendaPassiva = document.createElement("td");
        celulaExcluir = document.createElement("td");
        
        //adiciona conteudo de cada celula 'td'
        celulaTipotransacao.textContent = formNovatransacao.tipoTransacao.value;
        celulaValorUnitario.textContent = formNovatransacao.valorUnitario.value;
        celulaValorRecorrente.textContent = formNovatransacao.valorRecorrente.value;
        celulaRendaPassiva.textContent = formNovatransacao.rendaPassiva.value;
        celulaExcluir.textContent = "X"
        
        tabelaHistoricoTransacao = document.querySelector("#HistoricoTransacao").querySelector("tbody");
        
        linhaNovaTransacao.appendChild(celulaTipotransacao);
        linhaNovaTransacao.appendChild(celulaValorUnitario);
        linhaNovaTransacao.appendChild(celulaValorRecorrente);
        appendChild(celulaRendaPassiva);
        linhaNovaTransacao.appendChild(celulaExcluir);
        
        tabelaHistoricoTransacao.appendChild(linhaNovaTransacao);
        
    })
    
})