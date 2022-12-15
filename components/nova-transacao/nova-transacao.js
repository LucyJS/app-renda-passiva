
createComponent("nova-transacao", (component) => {
    
    const outroContainer = component.querySelector("#outroContainer");
    
    const inputTipoTransacao = component.querySelector("#tipoTransacao");
    inputTipoTransacao.addEventListener("change", () => { 
        component.updateVisibilityOutrosInput();
    })
    
    component.updateVisibilityOutrosInput = () => { 
        outroContainer.style.display = "none";
        if (inputTipoTransacao.value === "outros") {
            outroContainer.style.display = "block";
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
        
        return formData;
    }
    
    component.updateVisibilityOutrosInput();
})