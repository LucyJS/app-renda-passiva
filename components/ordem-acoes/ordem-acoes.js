createComponent("ordem-acoes", (component) => {

    component.stock = new Stock("AAPL3", "blue", StockVariation.PositiveNumber01, 1);
    component.quantity = "";

    component.setStock = (newStock) => {
        component.stock = newStock;
        component.render();
    }

    component.getStock = () => {
        return component.stock;
    }

    component.setQuantity = (quantity) => {
        component.quantity = quantity;
        component.render();
    }

    component.getQuantity = () => {
        return component.quantity;
    }

    component.getTotal = () => {
        return component.stock.finalPrice * component.quantity;;
    }

    component.render = () => {
        const ticket = component.querySelector(".stock-ticket");
        ticket.textContent = component.stock.ticket;
        ticket.style.backgroundColor = component.stock.color;

        const variation = component.querySelector(".stock-variation");
        variation.textContent = component.stock.variation;

        const price = component.querySelector(".stock-price");
        price.textContent = formatCurrency(component.stock.finalPrice);

        const quantityInput = component.querySelector(".stock-quantity input");
        quantityInput.value = component.quantity;

        const totalElement = component.querySelector(".stock-total");
        totalElement.textContent = formatCurrency(component.getTotal ());
    }

    function initEvents(){
        const quantityInput = component.querySelector(".stock-quantity input");
        quantityInput.addEventListener("change", () => {
            component.quantity = parseInt(quantityInput.value);
            component.render();
        })
    }

    initEvents();
    component.render();
})