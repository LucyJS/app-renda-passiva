
function formatCurrency(value){
    let formatCurrency = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2
    });

    return formatCurrency.format(value);
}

function getRandomStockVariation(){
    const variationList = Object.values(StockVariation);
    return getRandomItem(variationList);
}

function getRandomItem(list){
    const randomIndex = Math.floor(Math.random() * list.length);
    return list[randomIndex];
}

function createComponent(componentName, initComponentFn){
    fetch(`./components/${componentName}/${componentName}.html`)
    .then((response) => response.text())
    .then((html) => {
        document.querySelectorAll(componentName).forEach(element => {
            if(element.componentInitialized) return; // componente já inicializado

            const staticContent = element.innerHTML;
            element.innerHTML = html;
            element.componentInitialized = false;
            initComponentFn(element, staticContent);
            element.componentInitialized = true;
        });
     })
    .catch((error) => {
        console.error(componentName);
        console.error(error);
    });
}