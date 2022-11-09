function Resumo(pagamento,rendaPassive,saldo){
    pgo.textContent = formatCurrency(pagamento);  
    rp.textContent = formatCurrency(rendaPassive);
    sa.textContent = formatCurrency(saldo);
}
Resumo(0, 0, 0);

function getSaldo(){
    const numbers = sa.textContent.replace(/\D/g, "")
    return parseInt(numbers / 100);
}