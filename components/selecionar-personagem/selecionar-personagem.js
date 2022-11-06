createComponent("selecionar-personagem", (component) => {

    component.persons = [];
    component.value = null;
    
    const person1 = new Person();
    person1.id = 1;
    person1.name = "Jorge";
    person1.description = "Jorge é um cara muito bacana";
    component.persons.push(person1);

    const person2 = new Person();
    person2.id = 2;
    person2.name = "Maria";
    person2.description = "Maria é uma moça muito bacana";
    component.persons.push(person2);
    
    const person3 = new Person();
    person3.id = 3;
    person3.name = "José";
    person3.description = "José é uma cara muito bacana";
    component.persons.push(person3);

    component.setPerson = (person) => {
        component.value = component.persons.find(p => p.id === parseInt(person) || p === person);
        component.render();
        customDispatchEvent(component, "change", { value: component.value });
    }

    component.getPersons = () => {
        return component.persons;
    }

    component.getPerson = () => {
        return component.value;
    }

    component.render = () => {
        const ul = component.querySelector("ul");
        ul.innerHTML = "";

        component.persons.forEach(person => {
            const li = document.createElement("li");
            
            li.setAttribute("person-id", person.id);

            if(person === component.value){
                li.classList.add("selected");
            }

            li.innerHTML = `
                <span class="person-name">${person.name}</span>
                <span class="person-description">${person.description}</span>
            `;
            ul.append(li);
        })

        initEvents();
    }

    function initEvents(){
        const liItens = component.querySelectorAll("ul li");
        liItens.forEach(item => {
            item.addEventListener("click", () => {
                const personId = item.getAttribute("person-id");
                component.setPerson(personId);
            })
        })
    }

    component.setPerson(1);
    component.render();
});