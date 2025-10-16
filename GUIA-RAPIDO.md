# 🚀 Guia Rápido - ClickSeguro OWASP ZAP

## 📦 Comandos Essenciais

### 1. Rodar Aplicação Localmente
```bash
npm install
npm start
# Acesse: http://localhost:3000
```

### 2. Push para GitHub (Executar Pipeline)
```bash
git add .
git commit -m "feat: testes de segurança OWASP ZAP"
git push origin main
```

### 3. Rodar com Docker Local
```bash
# Build da imagem
docker build -t clickseguro:latest .

# Rodar container
docker run -p 3000:3000 clickseguro:latest

# Testar ZAP contra container
docker run --rm -t \
  -v "${PWD}:/zap/wrk" \
  owasp/zap2docker-stable zap-baseline.py \
  -t http://host.docker.internal:3000 \
  -r zap-local.html -J zap-local.json -a -m 3
```

### 4. Analisar Resultados Local (com jq)
```bash
# Instalar jq (se necessário)
# Windows (Chocolatey): choco install jq
# Linux: sudo apt install jq
# Mac: brew install jq

# Ver total de alertas
jq '.site[0].alerts | length' zap-local.json

# Ver High/Critical
jq '[.site[0].alerts[] | select(.riskcode=="3" or .riskcode=="4")] | length' zap-local.json

# Listar tipos de vulnerabilidades
jq -r '.site[0].alerts[] | .name' zap-local.json | sort | uniq -c | sort -nr
```

---

## 📥 ONDE BAIXAR OS ARTIFACTS NO GITHUB

### Passo a Passo Visual:

1. Vá em: **Actions** (aba superior do repositório)
2. Clique no **workflow mais recente** (o que acabou de rodar)
3. **ROLE A PÁGINA ATÉ O FINAL** 👇👇👇
4. Procure pela seção: **"Artifacts"**
5. Clique em **"zap-report-clickseguro"**
6. O arquivo ZIP será baixado automaticamente

### URL Direta:
```
https://github.com/TomazVC/atv-19/actions
↓
Clique no workflow run
↓
Role até o FINAL da página
↓
Seção "Artifacts" aparecerá
```

---

## 🎯 URLs de Teste das Vulnerabilidades

### XSS Refletido:
```
http://localhost:3000/echo?q=<script>alert('XSS')</script>
http://localhost:3000/echo?q=<img src=x onerror=alert('XSS')>
```

### SQL Injection:
```
http://localhost:3000/search?service=' OR '1'='1
http://localhost:3000/search?service=admin'--
```

### Path Traversal:
```
http://localhost:3000/admin?file=../../../etc/passwd
http://localhost:3000/admin?file=../../windows/system32/drivers/etc/hosts
```

### Headers Inseguros:
```bash
# Verificar headers ausentes
curl -I http://localhost:3000

# Deverá FALTAR:
# - Content-Security-Policy
# - X-Frame-Options
# - X-Content-Type-Options
```

---

## 🐛 Troubleshooting Rápido

### Porta 3000 ocupada:
```powershell
# Windows PowerShell
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process -Force
```

### Limpar cache npm:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Verificar se Docker está rodando:
```bash
docker --version
docker ps
```

---

## 📊 Estrutura dos Relatórios

### zap-report.html
- Relatório visual completo
- Abrir no navegador
- Todas as vulnerabilidades detalhadas

### zap-report.json
- Formato estruturado
- Ideal para automação
- Contém:
  - `site[0].alerts[]` - Array de vulnerabilidades
  - `riskcode` - 0=Info, 1=Low, 2=Medium, 3=High, 4=Critical
  - `name` - Tipo da vulnerabilidade
  - `desc` - Descrição detalhada
  - `solution` - Como corrigir

---

## ✅ Checklist da Atividade

- [ ] Código commitado no GitHub
- [ ] Pipeline executado com sucesso (pode falhar = esperado!)
- [ ] Artifacts baixados (zap-report.html + zap-report.json)
- [ ] Relatório HTML analisado
- [ ] Screenshot do pipeline com vulnerabilidades detectadas
- [ ] Documentação das vulnerabilidades encontradas
- [ ] Análise de severidades (High/Critical causaram falha?)

---

**🎯 Pronto para entregar a atividade!**