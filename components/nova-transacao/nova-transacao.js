
createComponent("nova-transacao", (component) => {
    
    component.formDataByTipoTransacao = [];
    const outroContainer = component.querySelector("#outroContainer");
    
    const inputTipoTransacao = component.querySelector("#tipoTransacao");
    inputTipoTransacao.addEventListener("change", () => { 
        component.update();
    })

    component.update = () => {
        component.updateVisibilityOutrosInput();
        component.updateFormDataByInputTipoTransacao();
    }

    component.setFormDataByTipoTransacao = (configuration) => {
        component.formDataByTipoTransacao = configuration;
        component.update();
    }
    
    component.updateVisibilityOutrosInput = () => { 
        outroContainer.style.display = "none";
        containerValorUnitario.style.display = "none";
        containerValorRecorrente.style.display = "none";
        containerRendaPassiva.style.display = "none";

        if (inputTipoTransacao.value !== "pagamento") {
            outroContainer.style.display = "block";
            containerValorUnitario.style.display = "block";
            containerValorRecorrente.style.display = "block";
            containerRendaPassiva.style.display = "block";
        }
    }

    component.updateFormDataByInputTipoTransacao = () => {
        component.querySelector("#valorUnitario").value = "";
        component.querySelector("#valorRecorrente").value = "";

        const configuration = component.formDataByTipoTransacao.find(item => {
            return inputTipoTransacao.value === item.tipo;
        });

        if(!configuration) return;
    
        component.querySelector("#valorUnitario").value = configuration.valorUnitario || "";
        component.querySelector("#valorRecorrente").value = configuration.valorRecorrente || "";
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

        return formData;
    }
    
    component.update();
})