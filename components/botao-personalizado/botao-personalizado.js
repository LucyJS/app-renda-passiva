
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
createComponent("botao-personalizado", (componentInstance, staticContent) =>{
    const button = componentInstance.querySelector("button")



    // events
    button.addEventListener("click", (event) => {
        const element = event.target;
        alert(element.innerHTML);
    });

    // methods
    componentInstance.changeBgColor = (newColor) => {
        button.style.backgroundColor = newColor;
    }

    componentInstance.changeText = (newText) => {
        button.textContent = newText;
    }

    componentInstance.changeHTML = (newHTML) => {
        button.innerHTML = newHTML;
    }

    // init
    const bgColor = componentInstance.getAttribute("bp-bgcolor");
    componentInstance.changeBgColor(bgColor);
    button.innerHTML = staticContent;
});