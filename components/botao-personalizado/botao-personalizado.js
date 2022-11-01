

function initBpComponents() {
    document.querySelectorAll("button[bp]").forEach(button => {
        if(button.componentInitialized) return;

        button.componentInitialized = false;

        button.addEventListener("click", (event) => {
            const element = event.target;
            const message = element.getAttribute("bp-message");
            
            alert(message);
        });

        button.changeBgColor = (newColor) => {
            button.style.backgroundColor = newColor;
        }

        button.changeText = (newText) => {
            button.textContent = newText;
        }

        button.changeHTML = (newHTML) => {
            button.innerHTML = newHTML;
        }

        const bgColor = button.getAttribute("bp-bgcolor");
        button.changeBgColor(bgColor);
        
        button.componentInitialized = true;
    })
}

initBpComponents();