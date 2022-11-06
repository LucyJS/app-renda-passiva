document.querySelectorAll("modal").forEach((element) => {
    element.setAttribute("norender", "true");
})

createComponent("modal", (component, staticContent) => {
    component.open = () => {
        component.classList.add("show");
    };

    component.close = () => {
        component.classList.remove("show");
    };

    component.getTitle = () => {
        const titleAttribute = component.getAttribute("title");
        if(titleAttribute === null) return "Sem título";
        return titleAttribute;
    }

    function initComponent(){
        // dynamic close button
        const closeButton = document.createElement("div");
        closeButton.classList.add("close");
        closeButton.textContent = "X";
        closeButton.addEventListener("click", () => {
            component.close();
        })
        component.prepend(closeButton);
        const defaultOpened = component.getAttribute("opened") != null;
        if(defaultOpened){
            component.open();
        }
    
        // dynamic title bar
        const titleBar = document.createElement("div");
        titleBar.classList.add("title");
        titleBar.textContent = component.getTitle();
        component.prepend(titleBar);

         // dynamic title bar
         const background = document.createElement("div");
         background.classList.add("background");
         component.prepend(background);
    }

    initComponent();
})

