
createComponent("nova-transacao", (component) => {
    
    component.formDataByTipoTransacao = [];

    const inputTipoTransacao = component.querySelector("#tipoTransacao");
    inputTipoTransacao.addEventListener("change", () => { 
        component.update();
    })

    component.hasRelatedItens = () => {
        const configuration = component.getConfiguration();

        if(!configuration) return false;

        return Array.isArray(configuration.relatedItens) && configuration.relatedItens.length >= 1;
    }

    component.update = () => {
        component.updateVisibilityInputs();
        component.resetForm();
        component.updateFormDataByInputTipoTransacao();
    }

    component.setFormDataByTipoTransacao = (configuration) => {
        component.formDataByTipoTransacao = configuration;
        component.update();
    }
    
    component.updateVisibilityInputs = () => { 
        containerOutroDescricao.style.display = "block";
        containerValorUnitario.style.display = "block";
        containerValorRecorrente.style.display = "block";
        containerRendaPassiva.style.display = "block";
        containerRelatedItens.style.display = "block";
        containerCanBeSold.style.display = "block";

        const configuration = component.getConfiguration();

        if(!configuration) return;

        if(Array.isArray(configuration.hidden) && configuration.hidden.length > 0){
            configuration.hidden.forEach(containerName => {
                const element = component.querySelector(`#container${containerName}`);
                element.style.display = "none";
            })
        }
    }

    component.getConfiguration = () => {
        const configuration = component.formDataByTipoTransacao.find(item => {
            return inputTipoTransacao.value === item.tipo;
        });

        return configuration;
    }

    component.updateFormDataByInputTipoTransacao = () => {
        component.querySelector("#valorUnitario").value = "";
        component.querySelector("#valorRecorrente").value = "";

        const configuration = component.getConfiguration();

        if(!configuration) return;
    
        component.querySelector("#valorUnitario").value = configuration.valorUnitario || "";
        component.querySelector("#valorRecorrente").value = configuration.valorRecorrente || "";
        
        const relatedItens = component.querySelector("#relatedItens")
        relatedItens.innerHTML = "";
        component.querySelector('[for="relatedItens"]').textContent = configuration.relatedItensLabel || "Item: ";
        if(component.hasRelatedItens()){
            configuration.relatedItens.forEach(item => {
                const option = document.createElement("option");
                option.setAttribute("value", item.value);
                option.textContent = item.description;
                relatedItens.append(option);
            })
        }
    }

    component.getFormData = () => { 
        const formData = {};
        
        if(inputTipoTransacao.value === "outros") { 
            formData.description = component.querySelector("#outroDescricao").value;
        } else {
            formData.description = component.querySelector("#tipoTransacao").value;
        }
        
        formData.price = parseFloat(component.querySelector("#valorUnitario").value) || 0;
        formData.recorrency = parseFloat(component.querySelector("#valorRecorrente").value) || 0;
        formData.type = component.querySelector("#tipoTransacao").value;
        formData.passiveIncome = component.querySelector("#rendaPassiva").checked;
        formData.relatedItem = component.querySelector("#relatedItens").value;
        formData.canBeSold = component.querySelector("#canBeSold").checked;
        
        return formData;
    }

    component.resetForm = () => {
        component.querySelector("#outroDescricao").value = "";
        component.querySelector("#valorUnitario").value = "";
        component.querySelector("#valorRecorrente").value = "";
        component.querySelector("#rendaPassiva").checked = false;
        component.querySelector("#relatedItens").value = "";
        component.querySelector("#canBeSold").checked = false;
    }
    
    component.update();
})