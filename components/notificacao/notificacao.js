createComponent("notificacao", (component, staticContent) => {

    component.addNotification = (description, type=NotificationType.Info) => {
        const lista = component.querySelector("ul");
        const li = document.createElement("li");
        li.textContent = description;
        li.classList.add(`type-${type}`);

        const seconds = parseInt(component.getAttribute("seconds"));
        if(seconds > 0){
            setTimeout(() => {
                component.removeItem(li);
            }, (seconds * 1000).toString())
        }

        const closeButton = document.createElement("span");
        closeButton.textContent = "X";
        closeButton.classList.add("close");
        closeButton.addEventListener("click", function(){
            component.removeItem(li);
        })
        li.append(closeButton)

        lista.prepend(li);
    }

    component.clearNotifications = () => {
        const lista = component.querySelectorAll("ul li:not(.slide-out)");
        lista.forEach(element => {
            component.removeItem(element);
        })
    }

    component.removeLastNotification = () => {
        const lista = component.querySelector("ul");
        const firstItem = lista.querySelector("li:not(.slide-out)");
        component.removeItem(firstItem);
    }
    
    component.removeItem = (item) => {
        if(item.classList.contains("slide-out")) return;

        item.classList.add("slide-out");
        setTimeout(() => {
            item.remove();
        },500)
    }
    
})