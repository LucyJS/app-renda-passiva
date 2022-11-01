class Stock {
    constructor(ticket="AAA3", color="gray", variation=StockVariation.Zero, quantity=0){
        this.quantity = quantity;
        this.ticket = ticket;
        this.basePrice = 25;
        this.color = color;
        this.variation = variation;
    }

    getVariation(){
        return this.variation;
    }

    setVariation(newVvariation){
        this.variation = newVvariation;
    }

    setColor(newColor){
        this.color = newColor;
    }

    getColor(){
        return this.color;
    }

    getFinalPrice(){
        if([StockVariation.Half, StockVariation.Double, StockVariation.Lost, StockVariation.Zero].includes(this.variation)){
            return 0;
        }

        return this.basePrice + parseInt(this.variation);
    }

    getQuantity(){
        return this.quantity;
    }

    setQuantity(newQuantity){
        this.quantity = newQuantity;
    }
}