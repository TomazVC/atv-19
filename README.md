# 🛡️ ClickSeguro - Testes de Segurança Automatizados com OWASP ZAP

## 📋 Sobre o Projeto

Este projeto implementa **testes de segurança automatizados** utilizando **OWASP ZAP CLI** integrado ao **GitHub Actions** para a plataforma **ClickSeguro** (agendamento de serviços residenciais).

### 🎯 Objetivos
- Detectar vulnerabilidades antes do deploy
- Bloquear pipelines com falhas críticas de segurança
- Gerar relatórios detalhados de vulnerabilidades
- Demonstrar integração DevSecOps

---

## 🚀 Quick Start

### 1. Clone e Configure
```bash
git clone [seu-repo]
cd atv-19
npm install
```

### 2. Teste Local (Opcional)
```bash
# Inicia a aplicação vulnerável
npm start

# Em outro terminal, teste com Docker
docker run --rm -t \
  -v "$PWD:/zap/wrk" \
  owasp/zap2docker-stable zap-baseline.py \
  -t http://host.docker.internal:3000 \
  -r zap-local.html -J zap-local.json -a -m 3
```

### 3. Push para GitHub
O pipeline executa automaticamente nos pushes para `main` e `develop`.

---

## 📁 Estrutura do Projeto

```
📦 atv-19/
├── 📂 .github/workflows/
│   ├── 🔧 zap-ci.yml                 # Pipeline principal (Juice Shop)
│   └── 🔧 zap-vulnerable-app.yml     # Pipeline app vulnerável
├── 📄 app.js                         # Aplicação Node.js vulnerável
├── 📄 package.json                   # Dependências
└── 📖 README.md                      # Este arquivo
```

---

## 🔧 Workflows Disponíveis

### 1. `zap-ci.yml` - Pipeline Principal
- **Alvo:** OWASP Juice Shop (aplicação vulnerável conhecida)
- **Tipo:** Baseline Scan (passivo + spider)
- **Duração:** ~5-7 minutos
- **Uso:** Validação geral do pipeline

### 2. `zap-vulnerable-app.yml` - App ClickSeguro
- **Alvo:** Aplicação Node.js customizada
- **Vulnerabilidades:** XSS, SQL Injection, Path Traversal
- **Duração:** ~3-5 minutos  
- **Uso:** Teste com vulnerabilidades específicas

---

## 🎯 Vulnerabilidades Implementadas

### 1. **XSS Refletido**
```
URL: /echo?q=<script>alert('XSS')</script>
Severidade: High
Descrição: Entrada não sanitizada refletida na página
```

### 2. **SQL Injection Simulado**
```
URL: /search?service=' OR '1'='1
Severidade: High  
Descrição: Query SQL construída sem sanitização
```

### 3. **Path Traversal**
```
URL: /admin?file=../../../etc/passwd
Severidade: Medium
Descrição: Acesso a arquivos fora do diretório permitido
```

### 4. **Headers de Segurança Ausentes**
```
Missing: Content-Security-Policy, X-Frame-Options, X-Content-Type-Options
Severidade: Low/Medium
Descrição: Falta de cabeçalhos de segurança padrão
```

---

## 📊 Como Funciona o Pipeline

### Fluxo Automático:

1. **🚀 Trigger:** Push/PR para `main` ou `develop`
2. **📦 Setup:** Instala dependências e sobe aplicação
3. **🔍 Scan:** OWASP ZAP executa baseline scan
4. **📋 Análise:** Conta vulnerabilidades por severidade
5. **🚨 Validação:** Falha se High/Critical > 0
6. **📄 Relatórios:** Gera HTML e JSON como artefatos

### Critério de Falha:
```yaml
# Pipeline FALHA se encontrar:
- Vulnerabilidades High (riskcode: 3)
- Vulnerabilidades Critical (riskcode: 4)

# Pipeline PASSA se apenas:
- Info (riskcode: 0)
- Low (riskcode: 1)  
- Medium (riskcode: 2)
```

---

## 📈 Interpretando os Resultados

### Severidades OWASP ZAP:
| Risk Code | Severidade | Ação |
|-----------|------------|------|
| 0 | **Info** | ℹ️ Informativo |
| 1 | **Low** | 🔵 Monitorar |
| 2 | **Medium** | 🟡 Corrigir quando possível |
| 3 | **High** | 🟠 **BLOQUEIA DEPLOY** |
| 4 | **Critical** | 🔴 **BLOQUEIA DEPLOY** |

### Relatórios Gerados:
- **📄 zap-report.html:** Relatório visual detalhado
- **📊 zap-report.json:** Dados estruturados para automação
- **📋 GitHub Summary:** Resumo direto no Actions

---

## 🔧 Configurações Avançadas

### Personalizar Tempo de Scan:
```yaml
# Em zap-ci.yml, linha cmd_options:
cmd_options: '-a -m 10 -J zap.json -r zap.html'
#              ↑
#           10 minutos (padrão: 5)
```

### Adicionar Exclusões:
```yaml
# Crie arquivo .zapbaseline com:
# IGNORE (riskdesc:*)
# IGNORE (url:*/admin/*)
# WARN (name:Cross-Domain*)
```

### Mudar Alvo do Scan:
```yaml
# Substitua o target:
target: 'http://localhost:8080'  # Sua aplicação
```

---

## 🐛 Solução de Problemas

### ❌ "Aplicação não respondeu a tempo"
```bash
# Aumentar timeout:
for i in {1..60}; do  # era {1..30}
```

### ❌ "Arquivo zap-report.json não encontrado"
```bash
# Verificar se ZAP rodou com sucesso
# Checar logs do step "OWASP ZAP Baseline Scan"
```

### ❌ Docker não reconhecido (Windows)
```bash
# Instalar Docker Desktop
# Habilitar WSL2
# Reiniciar terminal
```

---

## 📚 Aprendizados

### ✅ O que foi implementado:
- [x] Pipeline automatizado com OWASP ZAP
- [x] Falha automática para vulnerabilidades críticas
- [x] Análise detalhada por severidade
- [x] Aplicação vulnerável para testes
- [x] Relatórios como artefatos

### 🎯 Lições DevSecOps:
1. **Shift Left:** Detectar problemas antes do deploy
2. **Automação:** Testes de segurança sem intervenção manual  
3. **Feedback:** Relatórios claros para desenvolvedores
4. **Bloqueio:** Pipeline que falha = deploy impossível
5. **Rastreabilidade:** Artefatos históricos para auditoria

---

## 🔗 Links Úteis

- [OWASP ZAP](https://www.zaproxy.org/)
- [ZAP Docker](https://hub.docker.com/r/owasp/zap2docker-stable)
- [GitHub Actions](https://docs.github.com/en/actions)
- [OWASP Top 10](https://owasp.org/Top10/)

---

## 👥 Contribuição

Para adicionar novas vulnerabilidades:
1. Edite `app.js` 
2. Adicione nova rota vulnerável
3. Documente no README
4. Teste localmente
5. Crie PR

---

**⚠️ AVISO:** Esta aplicação contém vulnerabilidades intencionais. **NÃO USE EM PRODUÇÃO!**
