
var botaoSalvar = document.querySelector("#addNovaTransacao");

botaoSalvar.addEventListener("click", function(event){
debugger;
event.preventDefault();

var formNovatransacao = document.querySelector("#formularioNovatransacao")
console.log(formNovatransacao.tipoTransacao.value);
console.log(formNovatransacao.valorUnitario.value);
console.log(formNovatransacao.valorRecorrente.value);
console.log(formNovatransacao.rendaPassiva.value);

var linhaNovaTransacao = document.createElement("tr");

//cria elemento td
var celulaTipotransacao = document.createElement("td");
var celulaValorUnitario = document.createElement("td");
var celulaValorRecorrente = document.createElement("td");
var celulaRendaPassiva = document.createElement("td");
var celulaExcluir = document.createElement("td");

//adiciona conteudo de cada celula 'td'
celulaTipotransacao.textContent = formNovatransacao.tipoTransacao.value;
celulaValorUnitario.textContent = formNovatransacao.valorUnitario.value;
celulaValorRecorrente.textContent = formNovatransacao.valorRecorrente.value;
celulaRendaPassiva.textContent = formNovatransacao.rendaPassiva.value;
celulaExcluir.textContent = "X"

var tabelaHistoricoTransacao = document.querySelector("#HistoricoTransacao").querySelector("tbody");

linhaNovaTransacao.appendChild(celulaTipotransacao);
linhaNovaTransacao.appendChild(celulaValorUnitario);
linhaNovaTransacao.appendChild(celulaValorRecorrente);
linhaNovaTransacao.appendChild(celulaRendaPassiva);
linhaNovaTransacao.appendChild(celulaExcluir);

tabelaHistoricoTransacao.appendChild(linhaNovaTransacao);

})

