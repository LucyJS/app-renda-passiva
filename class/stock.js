class Stock {
    constructor(ticket="AAA3", color="gray", variation=StockVariation.Zero, quantity=0){
        this.basePrice = 25;
        this.quantity = quantity;
        this.ticket = ticket;
        this.color = color;
        this.variation = variation;
    }

    get finalPrice(){
        if([StockVariation.Half, StockVariation.Double, StockVariation.Lost].includes(this.variation)){
            return 0;
        }

        return this.basePrice + parseInt(this.variation);
    }
}