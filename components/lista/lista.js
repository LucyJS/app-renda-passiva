createComponent("lista", function(componentInstance, staticContent){

    componentInstance.dados = ["teste1", "teste 2", "teste 3" ];

    componentInstance.render = () => {
        componentInstance.innerHTML = "";
        const lista = document.createElement("ul");

        componentInstance.dados.forEach(item => {
            const itemLista = document.createElement("li");
            itemLista.textContent = item;
            lista.append(itemLista);
        })

        componentInstance.append(lista);
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
            const dados = { name: "Joney" };
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

    componentInstance.render();    
})