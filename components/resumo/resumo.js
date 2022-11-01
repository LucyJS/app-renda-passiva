function Resumo(pgo,rp,sa){
    pagamento.textContent = formatCurrency(pgo);  
    rendaPassive.textContent = formatCurrency(rp);
    saldo.textContent = formatCurrency(sa);
}
Resumo(100, 0, 200);