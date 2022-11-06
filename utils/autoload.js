

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
    "nova-transacao"
]

const constants = [
    "financial-movement-type",
    "stock-ticket",
    "stock-variation",
]

const classes = [
    "stock"
]

const utils = [
    "util"
]

document.__autoloadTime = 0;

resolvePromisesSeq([
    loadScriptList("../../utils", utils),
    loadScriptList("../../class", classes),
    loadScriptList("../../constants", constants),
    loadComponentList(components)
]).then(() => {
    dispatchEvent(new CustomEvent("allComponentsReady"));
})

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

function _createComponent(componentName){
    console.log(`creating component ${componentName}`);
    const cache = __cacheComponent[componentName];
    const html = cache.html;
    document.querySelectorAll(componentName).forEach(element => {
        if(element.componentInitialized) return; // componente já inicializado
        
        const staticContent = element.innerHTML;
        element.innerHTML = html;
        element.componentInitialized = false;
        cache.initComponentFn(element, staticContent);
        element.componentInitialized = true;
        customDispatchEvent(element, "componentReady", { componentName });
    });
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
