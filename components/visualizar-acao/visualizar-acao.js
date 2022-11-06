createComponent("visualizar-acao", (component) => {

    component.stock = new Stock("AAA3", "gray", StockVariation.Zero, 0);
   
    component.setVariation = (newVariation) => {
        component.stock.variation = newVariation;
        component.render();
    }

    component.setStock = (newStock) => {
        component.stock = newStock;
        component.render();
    }

    component.render = () => {
        const ticket = component.querySelector(".stock-ticket");
        ticket.textContent = component.stock.ticket;
        ticket.style.backgroundColor = component.stock.color;

        const variation = component.querySelector(".stock-variation");
        variation.textContent = component.stock.variation;

        const price = component.querySelector(".stock-price");
        price.textContent = formatCurrency(component.stock.finalPrice);
    }

    component.render();
})