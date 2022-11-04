
const components = [
    "acoes",
    "botao-personalizado",
    "historico-transacao",
    "lista",
    "notificacao",
    "receitas",
    "resumo",
    "selecionar-variacao"
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

loadScriptList("./utils", utils);
loadScriptList("./class", classes);
loadScriptList("./constants", constants);
loadComponentList(components);
loadCss("index.css");
loadScript("index.js");

function loadScriptList(path, list){
    list.forEach(name => {
        loadScript(`${path}/${name}.js`);
    })
}

function loadComponentList(componentList){
    componentList.forEach(componentName => {
        loadComponent(componentName);
    })
}

function loadComponent(componentName){
    loadScript(getComponentJs(componentName));
    loadCss(getComponentCss(componentName));
}

function loadCss(url){
    var link = document.createElement('link');
    link.rel = "stylesheet";
    link.href = url;
    document.head.append(link);
}

function loadScript(url){
    var script = document.createElement('script');
    script.src = url + "?time=" + (new Date().getTime());
    document.body.append(script);
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
    return `./components/${componentName}`;
}


