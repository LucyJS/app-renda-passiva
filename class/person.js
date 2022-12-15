class Person {
    
    constructor(id=0,name="Sem Nome", description="Sem descrição",defaultReceiveds =[]){
        this.id = id;
        this.name = name;
        this.description = description;
        this.defaultReceiveds = defaultReceiveds
        this.defaultSpendings = [];
    }
}