function Resumo(pagamento,rendaPassive,saldo){
    pgo.textContent = formatCurrency(pagamento);  
    rp.textContent = formatCurrency(rendaPassive);
    sa.textContent = formatCurrency(saldo);
}
Resumo(150, 0, 300);