
document.querySelectorAll("button[bp]").forEach(button => {
    button.addEventListener("click", (event) => {
        const element = event.target;
        const message = element.getAttribute("bp-message");
        
        alert(message);
    });

    button.changeBgColor = (newColor) => {
        button.style.backgroundColor = newColor;
    }

    const bgColor = button.getAttribute("bp-bgcolor");
    button.changeBgColor(bgColor);
})