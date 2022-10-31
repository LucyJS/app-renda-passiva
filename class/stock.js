class Stock {
    constructor(){
        this.id = 0;
        this.ticket = "";
        this.basePrice = 25;
        this.color = "#FFF";
        this.variation = "/2";
    }

    getCurrentPrice(){
        if(["/2", "x2", "x0"].includes(this.variation)){
            return 0;
        }

        return this.basePrice + this.variation;
    }
}

const app = new Stock();
app.id = 1;
app.ticket = "APPR3";
app.color = "#00F";
app.variation = 0;

const stocks = {
    "APPR3": app,
    "VAL3": app
}

stocks["APPR3"].getCurrentPrice();
