createComponent("resumo", (componetInst, staticContent) => {
    let pagamento = 0;
    let rendaPassiva = 0;
    let saldo = 0;
    
    componetInst.setPagamento = (valor) => { 
        pagamento = valor;
        pgo.textContent = formatCurrency(valor);
    }
    
    componetInst.setrendaPassive = (valor) => { 
        rendaPassiva = valor;
        rp.textContent = formatCurrency(valor);
    }
    
    componetInst.setSaldo = (valor) => { 
        saldo = valor;
        sa.textContent = formatCurrency(valor);
    }
    
    componetInst.getPagamento = () => { 
        return pagamento; 
    }
    
    componetInst.getrendaPassive = () => { 
        return rendaPassiva; 
    }
    
    componetInst.getSaldo = () => { 
        return saldo; 
    }
    
    componetInst.getSaldo = () => { 
        return saldo; 
    };
    // componetInst.setPagamento(1); 
    // componetInst.setrendaPassive(2);
    // componetInst.setSaldo(3); 
})