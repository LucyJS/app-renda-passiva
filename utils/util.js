
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

var __cacheComponent = {};

function createComponent(componentName, initComponentFn){
    fetch(`../../components/${componentName}/${componentName}.html`)
    .then((response) => response.text())
    .then((html) => {
        __cacheComponent[componentName] = { html, initComponentFn }
        _createComponent(componentName);
     })
    .catch((error) => {
        console.error(componentName);
        console.error(error);
    });
}

function _createComponent(componentName){
    const cache = __cacheComponent[componentName];
    const html = cache.html;
    document.querySelectorAll(componentName).forEach(element => {
        if(element.componentInitialized) return; // componente já inicializado
        
        const staticContent = element.innerHTML;
        element.innerHTML = html;
        element.componentInitialized = false;
        cache.initComponentFn(element, staticContent);
        element.componentInitialized = true;
        dispatchEvent(element, "componentReady");
    });
}

function refreshComponent(componentName){
    _createComponent(componentName);
}

function dispatchEvent(componentInstance, eventName, data={}){
    const customEventName = eventName;
    const detail = { detail: data };
    
    const customEvent = new CustomEvent(customEventName, detail);

    setTimeout(() => {
        componentInstance.dispatchEvent(customEvent);
    }, 0)
}