
const cards = [];

// Surpresa

// Variação

// Oferta

// Imóveis
cards.push(new CardProperty("Quitinete", "", (playerData) => {
    playerData.transactions.push({
        uniqueValue: -10000,
        recorrencyValue: -100,
        sellPrice: 180000
    });
}))

cards.push(new CardProperty("Quitinete", "", (playerData) => {
    playerData.transactions.push({
        uniqueValue: -10000,
        recorrencyValue: -150,
        sellPrice: 80000
    });
}))

cards.push(new CardProperty("Quitinete", "", (playerData) => {
    playerData.transactions.push({
        uniqueValue: -20000,
        recorrencyValue: -150,
        sellPrice: 180000
    });
}))

cards.push(new CardProperty("Quitinete", "", (playerData) => {
    playerData.transactions.push({
        uniqueValue: -20000,
        recorrencyValue: 300,
        sellPrice: 200000
    });
}))

cards.push(new CardProperty("AP 4 Quartos", "", (playerData) => {
    playerData.transactions.push({
        uniqueValue: -90000,
        recorrencyValue: 1200,
        sellPrice: 350000
    });
}))

cards.push(new CardProperty("Quitinete", "", (playerData) => {
    playerData.transactions.push({
        uniqueValue: -18000,
        recorrencyValue: 100,
        sellPrice: 200000
    });
}))

cards.push(new CardProperty("AP 4 Quartos", "", (playerData) => {
    playerData.transactions.push({
        uniqueValue: -80000,
        recorrencyValue: -600,
        sellPrice: 400000
    });
}))

cards.push(new CardProperty("AP 4 Quartos", "", (playerData) => {
    playerData.transactions.push({
        uniqueValue: -100000,
        recorrencyValue: 1700,
        sellPrice: 500000
    });
}))

cards.push(new CardProperty("Quitinete", "", (playerData) => {
    playerData.transactions.push({
        uniqueValue: -10000,
        recorrencyValue: 200,
        sellPrice: 80000
    });
}))

cards.push(new CardProperty("Sala Comercial", "", (playerData) => {
    playerData.transactions.push({
        uniqueValue: -70000,
        recorrencyValue: 1200,
        sellPrice: 300000
    });
}))

cards.push(new CardProperty("AP 2 Quartos", "", (playerData) => {
    playerData.transactions.push({
        uniqueValue: -45000,
        recorrencyValue: 700,
        sellPrice: 280000
    });
}))

cards.push(new CardProperty("AP 2 Quartos", "", (playerData) => {
    playerData.transactions.push({
        uniqueValue: -20000,
        recorrencyValue: 350,
        sellPrice: 250000
    });
}))

cards.push(new CardProperty("AP 2 Quartos", "", (playerData) => {
    playerData.transactions.push({
        uniqueValue: -30000,
        recorrencyValue: 450,
        sellPrice: 250000
    });
}))

cards.push(new CardProperty("Sala Comercial", "", (playerData) => {
    playerData.transactions.push({
        uniqueValue: -120000,
        recorrencyValue: 2000,
        sellPrice: 420000
    });
}))

// Consultoria
cards.push(new CardConsultancy("Alex", "", null));
cards.push(new CardConsultancy("Eduardo", "", null));
cards.push(new CardConsultancy("Bruno", "", null));
cards.push(new CardConsultancy("Leila", "", null));
cards.push(new CardConsultancy("Márcia", "", null));
cards.push(new CardConsultancy("Jorge", "", null));

// Renda Fixa
cards.push(new CardFixedIncome("Tesouro Direto", "", (playerData) => {
    playerData.transactions.push({
        uniqueValue: -1000,
        recorrencyValue: 8.25,
        sellPrice: 1000
    });
}))

cards.push(new CardFixedIncome("Tesouro Direto", "", (playerData) => {
    playerData.transactions.push({
        uniqueValue: -1500,
        recorrencyValue: 15,
        sellPrice: 1500
    });
}))

cards.push(new CardFixedIncome("Tesouro Direto", "", (playerData) => {
    playerData.transactions.push({
        uniqueValue: -1500,
        recorrencyValue: 12.50,
        sellPrice: 1500
    });
}))

cards.push(new CardFixedIncome("Tesouro Direto", "", (playerData) => {
    playerData.transactions.push({
        uniqueValue: -1500,
        recorrencyValue: 12.50,
        sellPrice: 1500
    });
}))

cards.push(new CardFixedIncome("LCI", "", (playerData) => {
    playerData.transactions.push({
        uniqueValue: -3000,
        sellPrice: 3350
    });
}))

cards.push(new CardFixedIncome("CDB", "", (playerData) => {
    playerData.transactions.push({
        uniqueValue: -1000,
        recorrencyValue: 15,
        sellPrice: 1000
    });
}))

cards.push(new CardFixedIncome("CDB", "", (playerData) => {
    playerData.transactions.push({
        uniqueValue: -1500,
        recorrencyValue: 20,
        sellPrice: 1500
    });
}))

cards.push(new CardFixedIncome("CDB", "", (playerData) => {
    playerData.transactions.push({
        uniqueValue: -500,
        recorrencyValue: 5,
        sellPrice: 500
    });
}))

// Negócios

var cardsDataLoaded = true;