class Card {
    constructor(title="Sem título", description="Sem descrição", execute=null){
        this.type = CardType.None;
        this.title = title;
        this.description = description;
        this.execute = execute;
    }
}

class CardSurprise extends Card {
    constructor(title="Sem título", description="Sem descrição", execute=null){
        super(title, description, execute);
        this.type = CardType.Surprise;
    }
}

class CardVariation extends Card {
    constructor(title="Sem título", description="Sem descrição", execute=null){
        super(title, description, execute);
        this.type = CardType.Variation;
    }
}

class CardOffer extends Card {
    constructor(title="Sem título", description="Sem descrição", execute=null){
        super(title, description, execute);
        this.type = CardType.Offer;
    }
}

class CardProperty extends Card {
    constructor(title="Sem título", description="Sem descrição", execute=null){
        super(title, description, execute);
        this.type = CardType.Property;
    }
}

class CardConsultancy extends Card {
    constructor(title="Sem título", description="Sem descrição", execute=null){
        super(title, description, execute);
        this.type = CardType.Consultancy;
    }
}

class CardBussiness extends Card {
    constructor(title="Sem título", description="Sem descrição", execute=null){
        super(title, description, execute);
        this.type = CardType.Bussiness;
    }
}

class CardFixedIncome extends Card {
    constructor(title="Sem título", description="Sem descrição", execute=null){
        super(title, description, execute);
        this.type = CardType.FixedIncome;
    }
}

