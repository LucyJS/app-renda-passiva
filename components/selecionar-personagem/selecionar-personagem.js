createComponent("selecionar-personagem", (component) => {

    component.persons = [];
    component.value = null;

    component.setPerson = (filter) => {
        component.value = component.persons.find(p => p.id === parseInt(filter?.id) || p.id === parseInt(filter));
        component.render();
        customDispatchEvent(component, "change", { value: component.value });
    }

    component.setPersons = (personList) => {
        component.persons = personList;
        component.render();
    }

    component.addPerson = (newPerson) => {
        component.persons.push(newPerson);
        component.render();
    }

    component.removeLastPerson = () => {
        component.person.pop();
        component.render();
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