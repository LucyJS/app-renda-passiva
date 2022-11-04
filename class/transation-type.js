class TransactionType {

    constructor(id=0,description="",unique=TransactionFinancal.None, recorrency=TransactionFinancal.None){
        this.id = id;
        this.description = description;
        this.uniqueFinancal = unique;
        this.recorrencyFinancal = recorrency;
    }

}