class FinancialMovement {
    
    constructor(){
        FinancialMovement.counter = (FinancialMovement.counter || 0) + 1;
        this.id = FinancialMovement.counter;
        this.description = "Sem descrição"
        this.price = 0;
        this.type = FinancialMovementType.None;
        this.debtId = 0;
        this.passiveIncome = false;
    }
}
