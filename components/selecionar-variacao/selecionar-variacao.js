createComponent("selecionar-variacao", function (component, staticContent) { 
    
    component.value = component.getAttribute("value");

    component.getVariation = () => {
        return component.value;
    }

    component.setVariation = (newVariation) => {
        component.value =  newVariation;
        component.render();
        dispatchEvent(component, "selectVariation", { variation: newVariation })
    }

    component.render = () => {
        const elements = component.querySelectorAll("li");
        elements.forEach(element => {
            element.classList.remove("selected");

            if(element.textContent.toLowerCase() === component.value){
                element.classList.add("selected");
            }
        })
    }

    initEvents = () => {
        const elements = component.querySelectorAll("li");
        elements.forEach(element => {
            element.addEventListener("click", () => {
                const newVariation = element.textContent.toLowerCase();
                component.setVariation(newVariation);
            })
        })


    }

    initEvents();
    component.render();
});