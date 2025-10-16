# 📥 ONDE BAIXAR OS ARTIFACTS - Guia Visual

## 🎯 Localização dos Relatórios no GitHub Actions

### ⚠️ IMPORTANTE: Os artifacts aparecem NO FINAL DA PÁGINA!

---

## 📍 Passo a Passo COMPLETO:

### **1️⃣ Acesse a aba Actions**
```
https://github.com/TomazVC/atv-19/actions
```
Ou clique na aba **"Actions"** no topo do repositório.

---

### **2️⃣ Clique no workflow que acabou de executar**

Você verá algo como:
```
✅ fix: corrige workflow ZAP para sempre gerar artifacts...
   ou
❌ OWASP ZAP Security Scan - ClickSeguro
```

**Clique no nome do workflow** (na linha inteira).

---

### **3️⃣ Você está na página de detalhes do workflow**

Aqui você vê:
- ✅ ou ❌ Status (Feito ou Failure)
- Job: "Scan de Segurança com OWASP ZAP"
- Summary com as estatísticas
- Annotations (erros, se houver)

---

### **4️⃣ ROLE A PÁGINA ATÉ O FINAL** 👇👇👇

**MUITO IMPORTANTE:** Os artifacts **NÃO** ficam no topo!

Continue rolando... rolando... até chegar no **rodapé** da página.

---

### **5️⃣ Procure pela seção "Artifacts"**

Você vai ver uma caixa assim:

```
┌─────────────────────────────────────────┐
│ 📦 Artifacts                            │
├─────────────────────────────────────────┤
│ Produced during runtime                 │
├─────────────────────────────────────────┤
│ 📄 zap-report-clickseguro               │
│    Size: ~2 MB                          │
│    Uploaded X minutes ago               │
│    [↓ Download]                         │
└─────────────────────────────────────────┘
```

---

### **6️⃣ Clique em "zap-report-clickseguro"**

Um arquivo ZIP será baixado automaticamente:
- **Nome:** `zap-report-clickseguro.zip`
- **Conteúdo:**
  - `zap-report.html` ← Abra este no navegador!
  - `zap-report.json` ← Dados estruturados

---

## 🔍 Se NÃO Aparecer a Seção "Artifacts":

### Possíveis Causas:

1. **Pipeline ainda está executando**
   - Aguarde até aparecer ✅ ou ❌
   - O upload só acontece no final

2. **Pipeline falhou ANTES do upload**
   - Verifique o log do step "Upload dos Relatórios"
   - Procure por erros nos steps anteriores

3. **Você não rolou até o final**
   - Sério, role MAIS! 👇
   - Os artifacts ficam DEPOIS de tudo

4. **Artifacts expiraram**
   - Configurado para 30 dias
   - Execute o workflow novamente

---

## 🖼️ Estrutura Visual da Página:

```
┌──────────────────────────────────────┐
│  GitHub Navigation Bar               │ ← Topo
├──────────────────────────────────────┤
│  [Actions Tab] [Code] [Issues]...    │
├──────────────────────────────────────┤
│                                      │
│  Workflow Name & Status              │
│  ✅ OWASP ZAP Security Scan          │
│                                      │
│  Triggered by TomazVC                │
│  Run #123 · Commit 747c714           │
│                                      │
├──────────────────────────────────────┤
│                                      │
│  [Summary Tab]                       │
│                                      │
│  🛡️ Relatório de Segurança           │
│  📋 Resumo por Severidade            │
│  🎯 Top 10 Vulnerabilidades          │
│  📄 Instruções para acessar          │
│                                      │
├──────────────────────────────────────┤
│                                      │
│  Annotations (se houver)             │
│  - Warnings                          │
│  - Errors                            │
│                                      │
├──────────────────────────────────────┤
│                                      │
│  ... Role, role, role ...            │ ← CONTINUE ROLANDO!
│                                      │
├──────────────────────────────────────┤
│                                      │
│  📦 Artifacts                        │ ← AQUI! NO FINAL!
│  ┌────────────────────────────────┐  │
│  │ zap-report-clickseguro         │  │ ← CLIQUE AQUI
│  │ ↓ Download                     │  │
│  └────────────────────────────────┘  │
│                                      │
└──────────────────────────────────────┘
```

---

## 💡 Dica Pro:

### Acesso Direto via URL:

```
https://github.com/TomazVC/atv-19/actions/runs/NUMERO_DO_RUN
```

Substitua `NUMERO_DO_RUN` pelo número que aparece na URL quando você clica no workflow.

Exemplo:
```
https://github.com/TomazVC/atv-19/actions/runs/123456789
```

Role até o final e os artifacts estarão lá!

---

## 🎥 Simulação do Clique:

```
1. Acesse: github.com/TomazVC/atv-19/actions
2. Veja lista de workflows executados
3. Clique em: "fix: corrige workflow ZAP..."
4. Nova página abre (detalhes do run)
5. Role... role... role... até o FINAL
6. Veja caixa "Artifacts"
7. Clique em "zap-report-clickseguro"
8. ZIP baixa automaticamente
9. Extraia e abra zap-report.html
```

---

## ✅ Checklist Final:

- [ ] Acessei github.com/TomazVC/atv-19/actions
- [ ] Cliquei no workflow mais recente
- [ ] Aguardei o workflow terminar (✅ ou ❌)
- [ ] Rolei a página ATÉ O FINAL
- [ ] Vi a seção "Artifacts"
- [ ] Cliquei em "zap-report-clickseguro"
- [ ] Baixei o ZIP
- [ ] Extraí os arquivos
- [ ] Abri zap-report.html no navegador

---

**🎯 Se seguiu todos os passos e ainda não aparece, me avise que eu ajudo!**