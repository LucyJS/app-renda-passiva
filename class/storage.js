class Storage{
    constructor(key){
        this.key = key;
        this.storage = localStorage;
    }

    hasSave(){
        return !!this.storage.getItem(this.key);
    }

    update(object){
        this.save({ ...this.load(), ...object })
    }

    save(objectValue){
        const jsonString = JSON.stringify(objectValue);
        this.storage.setItem(this.key, jsonString);
    }

    load(){
        const jsonString = this.storage.getItem(this.key);
        const object = JSON.parse(jsonString);
        return object;
    }

    clear(){
        this.storage.removeItem(this.key)
    }
}