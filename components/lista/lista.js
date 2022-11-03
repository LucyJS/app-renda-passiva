createComponent("lista", function(componentInstance, staticContent){

    componentInstance.dados = [];

    componentInstance.render = () => {
        componentInstance.innerHTML = "";
        const lista = document.createElement("ul");

        componentInstance.dados.forEach(item => {
            const itemLista = document.createElement("li");
            itemLista.textContent = item;
            lista.append(itemLista);
        })

        componentInstance.append(lista);
        setTimeout(() => {
            initEvents();
        }, 0)
    }

    componentInstance.addItemList = (itemList) => {
        itemList.forEach(item => {
            componentInstance.addItem(item);
        })
    }

    componentInstance.addItem = (description) => {
        componentInstance.dados.push(description);
        componentInstance.render();

        if(componentInstance.dados.length === 5){
            const customEventName = "addFive";
            const dados = { dados: componentInstance.dados, ultimo: description };
            dispatchEvent(componentInstance, customEventName, dados);
        }
    }

    componentInstance.removeLastItem = () => {
        componentInstance.dados.pop();
        componentInstance.render();

        if(componentInstance.dados.length === 0){
            const customEventName = "removeAllItens";
            const dados = { name: "Programador" };
            dispatchEvent(componentInstance, customEventName, dados);
        }
    }

    componentInstance.updateLastItem = (text) => {
        const lastIndex = componentInstance.dados.length - 1;
        componentInstance.dados[lastIndex] = text;
        componentInstance.render();
    }

    componentInstance.removeByContent = (conteudo) => {
        const index = componentInstance.dados.indexOf(conteudo);

        if(index == -1) return;

        componentInstance.dados.splice(index, 1);
        componentInstance.render();    
    }

    componentInstance.select = (itemContent) => {
        const lis = componentInstance.querySelectorAll("li");
        lis.forEach((item) => {
            item.classList.remove("selected");
            if(item.textContent === itemContent){
                item.classList.add("selected");
            }
        });
    }

    function initEvents(){
        const lis = componentInstance.querySelectorAll("li");
        lis.forEach((item) => {
            if(item.addedEvent) return;
            
            item.addedEvent = true;
            item.addEventListener("click", () => {
                componentInstance.select(item.textContent);
                dispatchEvent(componentInstance, "itemClick", { item });
            })
        })
    }

    componentInstance.render();   
})