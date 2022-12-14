

var __cacheComponent = {};

const components = [
    "acoes",
    "botao-personalizado",
    "historico-transacao",
    "lista",
    "notificacao",
    "gastos",
    "receitas",
    "resumo",
    "selecionar-variacao",
    "nova-transacao",
    "visualizar-acao",
    "ordem-acoes",
    "modal",
    "selecionar-personagem",
]

const constants = [
    "financial-movement-type",
    "stock-ticket",
    "stock-variation",
    "notification-type",
    "card-type",
]

const classes = [
    "stock",
    "person",
    "debt",
    "player-data",
    "stock-position",
    "transation-type",
    "financial-movement",
    "card",
    "storage"
]

const utils = [
    "util"
]

const data = [
    "cards",
]

document.__autoloadTime = 0;

resolvePromisesSeq([
    loadScriptList("../../utils", utils),
    loadScriptList("../../constants", constants),
    loadScriptList("../../class", classes),
    loadComponentList(components),
    loadScriptList("../../data", data),
]).then(() => {
    waitFor(() => {
        const lastComponentName = components[components.length - 1];
        const lastConstant = constants[constants.length - 1];
        const lastClass = classes[classes.length - 1];
        const lastData= data[data.length - 1];
        return isComponentLoaded(lastComponentName) && isConstantLoaded(lastConstant) && isClassLoaded(lastClass) && isDataLoaded(lastData);
    }).then(() => {
        dispatchEvent(new CustomEvent("allComponentsReady"));
    })
})

function isDataLoaded(dataName){
    const pascalCaseName = `${dataName}DataLoaded`;
    return !!eval(pascalCaseName);
}

function isClassLoaded(className){
    const pascalCaseName = hifenToPascalCase(className);
    return !!eval(pascalCaseName);
}

function isConstantLoaded(constantName){
    const pascalCaseName = hifenToPascalCase(constantName);
    return !!eval(pascalCaseName);
}

function hifenToPascalCase(hifenedText){
    let parts = hifenedText.split("-");
    parts = parts.map(p => {
        const firstLetter = p[0].toUpperCase() 
        const otherLetters = p.slice(1, p.length);
        const pascalCaseWord = `${firstLetter}${otherLetters}`;
        return pascalCaseWord;
    });
    return parts.join("");
}


async function waitFor(predicate){
    return new Promise((resolve, reject) => {
        let counter = 0;
        const interval = setInterval(() => {
            try{
                if(predicate()){
                    clearInterval(interval);
                    resolve();
                }
            }catch(e){
                counter++;
            }
            
            if(counter > 500){
                reject();
            }
        }, 10)
    })
    
}

async function resolvePromisesSeq(tasks) {
    const results = [];
    for (const task of tasks) {
        results.push(await task);
    }
    return await results;
};

async function loadScriptList(path, list){
    const promiseLoads = list.map(name => loadScript(`${path}/${name}.js`));
    return await resolvePromisesSeq(promiseLoads);
}

async function loadComponentList(componentList){
    const promiseComponents = componentList.map(componentName => loadComponent(componentName));
    return await resolvePromisesSeq(promiseComponents)
}

async function loadComponent(componentName){
    return await Promise.all([
        loadScript(getComponentJs(componentName)),
        loadCss(getComponentCss(componentName))
    ])
}

async function loadCss(url){
    var link = document.createElement('link');
    link.rel = "stylesheet";
    link.href = url;
    console.log(`loading stylesheet ${link.href}`);
    document.head.append(link);
    return await link.onload;
}

async function loadScript(url){
    var script = document.createElement('script');
    script.src = url + "?time=" + (new Date().getTime());
    console.log(`loading script ${script.src}`);
    document.body.append(script);
    await setTimeout(() =>{}, 500);
    return await script.onload;
}

function getComponentHtml(componentName){
    return getComponentFile(componentName, "html");
}

function getComponentCss(componentName){
    return getComponentFile(componentName, "css");
}

function getComponentJs(componentName){
    return getComponentFile(componentName, "js");
}

function getComponentFile(componentName, extension){
    return `${ getComponentFolder(componentName) }/${componentName}.${extension}`;
}

function getComponentFolder(componentName){
    return `../../components/${componentName}`;
}

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

function isComponentLoaded(componentName){
    const cachedKeys = Object.keys(__cacheComponent);
    return cachedKeys.some(k => k === componentName);
}

function _createComponent(componentName){
    console.log(`creating component ${componentName}`);
    const cache = __cacheComponent[componentName];
    const html = cache.html;
    document.querySelectorAll(componentName).forEach(element => {
        if(element.componentInitialized) {
            return; // componente j?? inicializado
        }
        
        const staticContent = element.innerHTML;
        if(element.getAttribute("norender") === null){
            element.innerHTML = html;
        }
        
        element.componentInitialized = false;
        cache.initComponentFn(element, staticContent);
        element.componentInitialized = true;
        customDispatchEvent(element, "componentReady", { componentName });
    });
}

function refreshAllComponents(){
    components.forEach(refreshComponent);
}

function refreshComponent(componentName){
    _createComponent(componentName);
}

function customDispatchEvent(componentInstance, eventName, data={}){
    const customEventName = eventName;
    const detail = { detail: data };
    
    const customEvent = new CustomEvent(customEventName, detail);
    componentInstance.dispatchEvent(customEvent);
}

const loading = document.createElement("div");
loading.textContent = "S?? um momento...";
loading.classList.add("loading");
document.body.append(loading);
addEventListener("allComponentsReady", () => {
    setTimeout(() => {
        loading.remove();
    }, 500)
})