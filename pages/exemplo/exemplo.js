
// =====================================
// Página Exemplo
// =====================================

addEventListener("allComponentsReady", () => {
    initExemplos();
    loadSelectedComponent();
})

function initExemplos(){
    listaComponents.addItemList(components);
    listaComponents.addEventListener("itemClick", (event) => {
        const componentName = event.detail.item.textContent;
        saveSelectedComponent(componentName);
        showComponent(componentName);
    });
    let componentName = localStorage.getItem("exemplo-component");
    listaComponents.select(componentName);
}

function saveSelectedComponent(componentName){
    localStorage.setItem("exemplo-component", componentName);
}

function loadSelectedComponent(){
    let componentName = localStorage.getItem("exemplo-component");
    showComponent(componentName);
}

function showComponent(componentName){
    document.querySelectorAll("section[exemplo]").forEach(exemplo => {
        exemplo.classList.remove("show");
        const exemploName = exemplo.getAttribute("exemplo");
        if(exemploName === componentName){
            exemplo.classList.add("show");
        }
    })
}

// =====================================
// Exemplo de uso do componente botão 
// personalizado
// =====================================

buttonChangeColor.addEventListener("click", function(){
    const colors = ["deeppink", "green", "red", "blue"];
    
    btnA.changeBgColor(getRandomItem(colors));
    btnB.changeBgColor(getRandomItem(colors));
    btnC.changeBgColor(getRandomItem(colors));
})

buttonChangeText.addEventListener("click", function(){
    const texts = ["Ola", "Tudo bem", "Como vai", "Tchau", "Arigato", "Tomou?!"];
    
    btnA.changeText(getRandomItem(texts));
    btnB.changeText(getRandomItem(texts));
    btnC.changeText(getRandomItem(texts));
})

btnA.addEventListener("click", (event) => {
    notificacao.addNotification(event.target.innerHTML);
})

btnB.addEventListener("click", (event) => {
    notificacao.addNotification(event.target.innerHTML);
})

btnC.addEventListener("click", (event) => {
    notificacao.addNotification(event.target.innerHTML);
})

// =====================================

// =====================================
// Exemplo de uso do componente de ações
// =====================================
acoes.addEventListener("buyStocks", (event) => {
    const eventDetail = event.detail;
    notificacao.addNotification(`Ordem de compra de ${ eventDetail.quantity } ações da ${ eventDetail.stock.ticket} por ${formatCurrency(eventDetail.totalPrice)}.`)
})

acoes.addEventListener("buyStocksError", (event) => {
    const eventDetail = event.detail;
    notificacao.addNotification(eventDetail.message)
})

acoes.addEventListener("sellStocks", (event) => {
    const eventDetail = event.detail;
    notificacao.addNotification(`Ordem de venda de ${ eventDetail.quantity } ações da ${ eventDetail.stock.ticket } por ${formatCurrency(eventDetail.totalPrice)}.`)
})

acoes.addEventListener("sellStocksError", (event) => {
    const eventDetail = event.detail;
    notificacao.addNotification(eventDetail.message)
})

sellStockButton.addEventListener("click", function(){
    acoes.sellStocks(StockTicket.APPL3, 5);
    acoes.sellStocks(StockTicket.VAL3, 50);
    acoes.sellStocks(StockTicket.BB4S, 10);
    acoes.sellStocks(StockTicket.AMZ4, 500);
})

buyStockButton.addEventListener("click", function(){
    acoes.buyStocks(StockTicket.APPL3, 5);
    acoes.buyStocks(StockTicket.VAL3, 50);
    acoes.buyStocks(StockTicket.BB4S, 10);
    acoes.buyStocks(StockTicket.AMZ4, 500);
})

updateVariation.addEventListener("click", function(){
    acoes.setVariation(StockTicket.APPL3, getRandomStockVariation());
    acoes.setVariation(StockTicket.VAL3, getRandomStockVariation());
    acoes.setVariation(StockTicket.BB4S, getRandomStockVariation());
    acoes.setVariation(StockTicket.AMZ4, getRandomStockVariation());
})

acoes.addEventListener("clickTicket", (event) => {
    notificacao.addNotification(`Clicou em TICKET para ${ event.detail.stock.ticket }`);
})

acoes.addEventListener("clickVariation", (event) => {
    notificacao.addNotification(`Clicou em VARIAÇÃO para ${ event.detail.stock.ticket }`);
    acoes.setVariation(event.detail.stock.ticket, getRandomStockVariation());
})

acoes.addEventListener("clickFinalPrice", (event) => {
    notificacao.addNotification(`Clicou em PREÇO para ${ event.detail.stock.ticket }`);
})

acoes.addEventListener("clickOrder", (event) => {
    notificacao.addNotification(`Clicou em ORDEM para ${ event.detail.stock.ticket }`);
})
// =====================================


// =====================================
// Exemplo de uso do componente de lista
// =====================================

buttonAddItem.addEventListener("click", function(){
    listaA.addItem("KKKKK");
})

buttonRemoveLastItem.addEventListener("click", function(){
    listaA.removeLastItem();
})

buttonUpdateLastItemText.addEventListener("click", function(){
    listaA.updateLastItem("O Papa é POP!");
})

listaA.addEventListener("removeAllItens", function(event){
    const detail = event.detail;
    
    notificacao.addNotification(`Removeu todos os itens ${ detail.name }`);
})

buttonRemoveByContent.addEventListener("click", function(){
    const conteudo = inputContent.value;
    listaA.removeByContent(conteudo);
})

listaA.addEventListener("addFive", function(event){
    const detail = event.detail;
    
    notificacao.addNotification(`Adicionou 5 itens, o último é ${ detail.ultimo }`);
})

// =====================================

// =====================================
// Exemplo de uso do componente de 
// selecionar variação
// =====================================

buttonSelectRandomVariation.addEventListener("click", function(){
    const newVariation = getRandomStockVariation();
    selecionarVariacao.setVariation(newVariation);
})

buttonShowSelectedVariation.addEventListener("click", function(){
    notificacao.addNotification(`Variação selecionada é ${selecionarVariacao.getVariation()}`);
})

selecionarVariacao.addEventListener("selectVariation", (event) => {
    notificacao.addNotification(`Nova variação selecionada: ${event.detail.variation}`);
})

// =====================================

// =====================================
// Exemplo de uso do componente de notificação
// =====================================

buttonAddNotification.addEventListener("click", function(){
    const messages = [
        "Bom dia, tudo bem?",
        "Essa semana vai ser complicado!",
        "Hoje é sexta feira!!"
    ]
    const randomMessage = getRandomItem(messages);
    notificacao.addNotification(randomMessage);
})

buttonClearNotifications.addEventListener("click", function(){
    notificacao.clearNotifications();
})

buttonRemoveLastNotification.addEventListener("click", function(){
    notificacao.removeLastNotification();
})

// =====================================

// =====================================
// Exemplo de uso do componente de receitas
// =====================================

receitas.addEventListener("addItem", (event) => {
    const details = event.detail;
    
    notificacao.addNotification(`${details.key} :${details.value} `);
})

receitas.addEventListener("removeItem", (event) => {
    const details = event.detail; 
    notificacao.addNotification(`${details.key} :${details.value} `);
})

// =====================================

// =====================================
// Exemplo de uso do componente de gastos
// =====================================

gastos.addEventListener("addGastos", (event) => {
    const details = event.detail; 
    notificacao.addNotification(`Adicionou :${details.name} :${details.value} `);
})

gastos.addEventListener("removeGastos", (event) => {
    const details = event.detail; 
    notificacao.addNotification(`Removeu :${details.name} :${details.value} `);
})


// addEventListener("allComponentsReady", () => {
//     gastos.addItem({ name: "joao", value: 200, debts: 2000 });
// })

// addEventListener("allComponentsReady", () => {
//     gastos.removeItem(0);
// })

// =====================================

// =====================================
// Exemplo de uso do componente de 
// visualizar ação
// =====================================

buttonChangeStock.addEventListener("click", () => {
    visualizarAcao.setStock(getRandomStock());
})

// =====================================

// =====================================
// Exemplo de uso do componente de ordem
// de compra e venda de ações
// =====================================

changeStock.addEventListener("click", () => {
    ordemAcoes.setStock(getRandomStock());
})

buttonSetQuantity.addEventListener("click", () => {
    ordemAcoes.setQuantity(getRandomItem([1, 0, 15, 500, 100, 150, 3000]));
})

buyStocks.addEventListener("click", () => {
    const total = formatCurrency(ordemAcoes.getTotal());
    const stock = ordemAcoes.getStock();
    const quantity = ordemAcoes.getQuantity();
    
    notificacao.addNotification(`COMPRA de ${quantity} ações da ${stock.ticket} no valor de ${total}`);
})

sellStocks.addEventListener("click", () => {
    const total = formatCurrency(ordemAcoes.getTotal());
    const stock = ordemAcoes.getStock();
    const quantity = ordemAcoes.getQuantity();
    
    notificacao.addNotification(`VENDA de ${quantity} ações da ${stock.ticket} no valor de ${total}`);
})

// =====================================

// =====================================
// Exemplo de uso do componente de ordem
// de compra e venda de ações
// =====================================

addEventListener("allComponentsReady", () => {
    selecionarPersonagem.addPerson(new Person(1, "Jorge", "Empresário"));
    selecionarPersonagem.addPerson(new Person(2, "Maria", "Professora empresário"));
    selecionarPersonagem.addPerson(new Person(3, "José", "Microempresário"));
})

buttonSetPersonagem.addEventListener("click", () => {
    const persons = selecionarPersonagem.getPersons();
    const randomPerson = getRandomItem(persons);
    selecionarPersonagem.setPerson(randomPerson);
})

buttonGetPersonagem.addEventListener("click", () => {
    notificacao.addNotification(`${selecionarPersonagem.getPerson().name} esta selecionado!`)
})

// =====================================

// =====================================
// Exemplo de uso do componente modal
// =====================================

buttonOpenModal.addEventListener("click", () => {
    modal.open();
})

// =====================================

// =====================================
// Exemplo de uso do componente histórico
// de transação
// =====================================

buttonAddTransaction.addEventListener("click", () => {
    const newTransaction = new FinancialMovement();
    newTransaction.description =  getRandomItem(["Imóvel", "Venda de ações", "Compra de ações", "Pequeno Negócio", "Pagamento"]);
    newTransaction.price =  getRandomItem([100,-1500,4500,-200,700, -50]);
    historicoTransacao.addTransaction(newTransaction);
})

buttonRemoveLastTransation.addEventListener("click", () => {
    historicoTransacao.removeLastTransaction();
})

buttonExibirTotal.addEventListener("click", () => {
    const total = formatCurrency(historicoTransacao.getTotal());
    notificacao.addNotification(`Total de transações: ${total}`);
})

historicoTransacao.addEventListener("removeTransaction", (event) => {
    const dados = event.detail;
    const transacaoRemovida = dados.removedTransaction;
    notificacao.addNotification(`Transação removida: ${transacaoRemovida.description} - ${formatCurrency(transacaoRemovida.price)}`);
})

historicoTransacao.addEventListener("addTransaction", (event) => {
    const dados = event.detail;
    const transacao = dados.transaction;
    notificacao.addNotification(`Transação adicionada: ${transacao.description} - ${formatCurrency(transacao.price)}`);
})

historicoTransacao.addEventListener("removeLastTransaction", (event) => {
    const dados = event.detail;
    const transacao = dados.transaction;
    notificacao.addNotification(`Transação removida: ${transacao.description} - ${formatCurrency(transacao.price)}`);
})


// =====================================

