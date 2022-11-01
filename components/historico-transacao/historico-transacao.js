
document.querySelectorAll("table[ht]").forEach(table => {
    table.data = [];
    
    table.loadData = (data) => {
        
    }
    
    table.render = () => {
        const row = table.querySelector("tbody tr");
        row.innerHTML = "";
        
        if(Array.isArray(table.data) && table.data.length === 0){
            row.innerHTML = "<td colspan='3'>Nenhum registro de transações</td>"
        }
    }
    
    table.newTransaction = () => {
        
    }
    
    table.deleteTransaction = (id) => {
        table.data = table.data.filter(item => item.id !== id);
    }
    
    table.render();
    
})

