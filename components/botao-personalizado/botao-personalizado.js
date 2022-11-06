
/**
 * Atributtes
 *  bp-bg-color Cor de fundo
 * 
 * Properties
 *  componentInitialized
 * 
 * Methods
 *  changeBgColor
 *  changeText
 *  changeHTML
 */
createComponent("botao-personalizado", (component, staticContent) =>{
    const button = component.querySelector("button")

    // events
    button.addEventListener("click", (event) => {
        const element = event.target;
        customDispatchEvent("click");
    });

    // methods
    component.changeBgColor = (newColor) => {
        button.style.backgroundColor = newColor;
    }

    component.changeText = (newText) => {
        button.textContent = newText;
    }

    component.changeHTML = (newHTML) => {
        button.innerHTML = newHTML;
    }

    // init
    const bgColor = component.getAttribute("bp-bgcolor");
    component.changeBgColor(bgColor);
    button.innerHTML = staticContent;
});