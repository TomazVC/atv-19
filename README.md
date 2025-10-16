# ClickSeguro - Testes de Segurança Automatizados com OWASP ZAP# ClickSeguro - Testes de Segurança Automatizados com OWASP ZAP



## Sobre o Projeto## Sobre o Projeto



Implementação completa de pipeline de segurança automatizado utilizando OWASP ZAP CLI integrado ao GitHub Actions. O projeto demonstra como detectar vulnerabilidades antes do deploy e bloquear pipelines com falhas críticas de segurança.Implementação de pipeline de segurança automatizado utilizando OWASP ZAP CLI integrado ao GitHub Actions para detecção de vulnerabilidades antes do deploy em produção.



**Contexto:** Plataforma web ClickSeguro para agendamento de serviços residenciais.**Contexto:** Plataforma web ClickSeguro para agendamento de serviços residenciais.



**Problema:** Vulnerabilidades chegando à produção sem detecção prévia.**Objetivo:** Integrar testes de segurança automatizados no pipeline de CI/CD para bloquear deploys com vulnerabilidades críticas.



**Solução:** Pipeline automatizado que executa testes de segurança em cada push/PR e bloqueia deploys inseguros.---



---## Requisitos da Atividade



## Estrutura do ProjetoEste projeto implementa as seguintes tarefas:



```1. **Configuração inicial do OWASP ZAP CLI**

atv-19/   - Workflow configurado no GitHub Actions

├── .github/workflows/   - Scan automático contra aplicação local

│   └── zap-ci.yml           # Pipeline OWASP ZAP   - Geração de relatórios HTML e JSON

├── app.js                   # Aplicação vulnerável (Node.js/Express)

├── package.json             # Dependências do projeto2. **Validação automática de vulnerabilidades**

├── Dockerfile               # Container para testes locais   - Pipeline falha automaticamente para severidade High/Critical

├── .zapbaseline             # Configuração do ZAP   - Bloqueio de deploy baseado em riscos

├── .gitignore               # Arquivos ignorados

└── README.md                # Esta documentação3. **Análise dos resultados**

```   - Contagem total de alertas

   - Distribuição por severidade (Critical, High, Medium, Low, Info)

---   - Identificação dos tipos mais comuns de vulnerabilidades



## Requisitos Implementados4. **Teste com vulnerabilidade proposital**

   - Aplicação Node.js com vulnerabilidades intencionais

### 1. Configuração Inicial do OWASP ZAP CLI   - XSS Refletido, SQL Injection, Path Traversal



**Implementação:**5. **Aprimoramento do pipeline**

- Workflow configurado em `.github/workflows/zap-ci.yml`   - Relatórios salvos como artifacts do GitHub Actions

- Execução automática em push/PR para branches `main` e `develop`   - Retenção de 30 dias para auditoria

- Scan contra aplicação local rodando em `http://localhost:3000`

- Geração de relatórios HTML e JSON---



**Arquivo:** `.github/workflows/zap-ci.yml`## Estrutura do Projeto



```yaml```

- name: OWASP ZAP Baseline Scanatv-19/

  uses: zaproxy/action-baseline@v0.11.0├── .github/workflows/

  with:│   └── zap-ci.yml           # Pipeline OWASP ZAP

    target: 'http://localhost:3000'├── app.js                   # Aplicação vulnerável (Node.js/Express)

    cmd_options: '-a -m 3 -J zap-report.json -r zap-report.html'├── package.json             # Dependências

```├── Dockerfile               # Container para testes

├── .zapbaseline             # Configuração do ZAP

---└── README.md                # Documentação

└── 📖 README.md                      # Este arquivo

### 2. Validação Automática de Vulnerabilidades```



**Implementação:**---

- Pipeline analisa o arquivo JSON gerado pelo ZAP

- Conta vulnerabilidades por severidade (riskcode)## 🔧 Workflows Disponíveis

- **Falha automaticamente** se encontrar High (riskcode=3) ou Critical (riskcode=4)

- Deploy é bloqueado em caso de vulnerabilidades críticas### 1. `zap-ci.yml` - Pipeline Principal

- **Alvo:** OWASP Juice Shop (aplicação vulnerável conhecida)

**Lógica de Bloqueio:**- **Tipo:** Baseline Scan (passivo + spider)

- **Duração:** ~5-7 minutos

```bash- **Uso:** Validação geral do pipeline

if [ "$high" -gt 0 ] || [ "$critical" -gt 0 ]; then

  echo "Vulnerabilidades críticas detectadas!"### 2. `zap-vulnerable-app.yml` - App ClickSeguro

  exit 1  # Falha o pipeline- **Alvo:** Aplicação Node.js customizada

fi- **Vulnerabilidades:** XSS, SQL Injection, Path Traversal

```- **Duração:** ~3-5 minutos  

- **Uso:** Teste com vulnerabilidades específicas

**Critérios:**

---

| Risk Code | Severidade | Comportamento |

|-----------|------------|---------------|## 🎯 Vulnerabilidades Implementadas

| 4 | Critical | BLOQUEIA pipeline |

| 3 | High | BLOQUEIA pipeline |### 1. **XSS Refletido**

| 2 | Medium | Pipeline continua |```

| 1 | Low | Pipeline continua |URL: /echo?q=<script>alert('XSS')</script>

| 0 | Info | Pipeline continua |Severidade: High

Descrição: Entrada não sanitizada refletida na página

---```



### 3. Análise dos Resultados### 2. **SQL Injection Simulado**

```

**Implementação:**URL: /search?service=' OR '1'='1

- Contagem total de alertas encontradosSeveridade: High  

- Distribuição por nível de severidadeDescrição: Query SQL construída sem sanitização

- Identificação dos 10 tipos mais comuns de vulnerabilidades```

- Relatório detalhado no GitHub Actions Summary

### 3. **Path Traversal**

**Exemplo de Saída:**```

URL: /admin?file=../../../etc/passwd

```Severidade: Medium

Resumo de Vulnerabilidades por Severidade:Descrição: Acesso a arquivos fora do diretório permitido

```

| Severidade | Quantidade |

|-----------|------------|### 4. **Headers de Segurança Ausentes**

| Critical  | 0          |```

| High      | 3          |Missing: Content-Security-Policy, X-Frame-Options, X-Content-Type-Options

| Medium    | 7          |Severidade: Low/Medium

| Low       | 12         |Descrição: Falta de cabeçalhos de segurança padrão

| Info      | 4          |```

| Total     | 26         |

---

Top 10 Vulnerabilidades mais Comuns:

- Cross-Site Scripting (XSS) (3 ocorrências)## 📊 Como Funciona o Pipeline

- SQL Injection (2 ocorrências)

- Missing Security Headers (8 ocorrências)### Fluxo Automático:

```

1. **🚀 Trigger:** Push/PR para `main` ou `develop`

**Comando para análise local:**2. **📦 Setup:** Instala dependências e sobe aplicação

3. **🔍 Scan:** OWASP ZAP executa baseline scan

```bash4. **📋 Análise:** Conta vulnerabilidades por severidade

# Total de alertas5. **🚨 Validação:** Falha se High/Critical > 0

jq '.site[0].alerts | length' zap-report.json6. **📄 Relatórios:** Gera HTML e JSON como artefatos



# Vulnerabilidades High/Critical### Critério de Falha:

jq '[.site[0].alerts[] | select(.riskcode=="3" or .riskcode=="4")] | length' zap-report.json```yaml

# Pipeline FALHA se encontrar:

# Listar tipos- Vulnerabilidades High (riskcode: 3)

jq -r '.site[0].alerts[] | .name' zap-report.json | sort | uniq -c | sort -nr- Vulnerabilidades Critical (riskcode: 4)

```

# Pipeline PASSA se apenas:

---- Info (riskcode: 0)

- Low (riskcode: 1)  

### 4. Teste com Vulnerabilidade Proposital- Medium (riskcode: 2)

```

**Aplicação Desenvolvida:** Node.js com Express (`app.js`)

---

#### Vulnerabilidades Implementadas:

## 📈 Interpretando os Resultados

**A) XSS Refletido (High)**

### Severidades OWASP ZAP:

```javascript| Risk Code | Severidade | Ação |

app.get('/echo', (req, res) => {|-----------|------------|------|

  const userInput = req.query.q || '';| 0 | **Info** | ℹ️ Informativo |

  // VULNERÁVEL: Sem sanitização| 1 | **Low** | 🔵 Monitorar |

  res.send(`<div>${userInput}</div>`);| 2 | **Medium** | 🟡 Corrigir quando possível |

});| 3 | **High** | 🟠 **BLOQUEIA DEPLOY** |

```| 4 | **Critical** | 🔴 **BLOQUEIA DEPLOY** |



**Teste:** `http://localhost:3000/echo?q=<script>alert('XSS')</script>`### Relatórios Gerados:

- **📄 zap-report.html:** Relatório visual detalhado

**B) SQL Injection (High)**- **📊 zap-report.json:** Dados estruturados para automação

- **📋 GitHub Summary:** Resumo direto no Actions

```javascript

app.get('/search', (req, res) => {---

  const service = req.query.service || '';

  // VULNERÁVEL: Query sem prepared statement## 🔧 Configurações Avançadas

  const query = `SELECT * FROM services WHERE name = '${service}'`;

  res.send(`Query: ${query}`);### Personalizar Tempo de Scan:

});```yaml

```# Em zap-ci.yml, linha cmd_options:

cmd_options: '-a -m 10 -J zap.json -r zap.html'

**Teste:** `http://localhost:3000/search?service=' OR '1'='1`#              ↑

#           10 minutos (padrão: 5)

**C) Path Traversal (Medium)**```



```javascript### Adicionar Exclusões:

app.get('/admin', (req, res) => {```yaml

  const file = req.query.file || 'dashboard.html';# Crie arquivo .zapbaseline com:

  // VULNERÁVEL: Sem validação de path# IGNORE (riskdesc:*)

  const filePath = `/var/www/admin/${file}`;# IGNORE (url:*/admin/*)

  res.send(`Acessando: ${filePath}`);# WARN (name:Cross-Domain*)

});```

```

### Mudar Alvo do Scan:

**Teste:** `http://localhost:3000/admin?file=../../../etc/passwd````yaml

# Substitua o target:

**D) Headers de Segurança Ausentes (Low/Medium)**target: 'http://localhost:8080'  # Sua aplicação

```

Aplicação não define:

- Content-Security-Policy---

- X-Frame-Options

- X-Content-Type-Options## 🐛 Solução de Problemas

- Strict-Transport-Security

### ❌ "Aplicação não respondeu a tempo"

---```bash

# Aumentar timeout:

### 5. Aprimoramento do Pipelinefor i in {1..60}; do  # era {1..30}

```

**Implementações:**

### ❌ "Arquivo zap-report.json não encontrado"

**A) Salvamento de Artifacts**```bash

# Verificar se ZAP rodou com sucesso

```yaml# Checar logs do step "OWASP ZAP Baseline Scan"

- name: Upload dos Relatórios```

  uses: actions/upload-artifact@v4

  if: always()  # Executa mesmo se pipeline falhar### ❌ Docker não reconhecido (Windows)

  with:```bash

    name: zap-report-clickseguro# Instalar Docker Desktop

    path: |# Habilitar WSL2

      zap-report.html# Reiniciar terminal

      zap-report.json```

    retention-days: 30

```---



**B) Continue on Error**## 📚 Aprendizados



```yaml### ✅ O que foi implementado:

- name: OWASP ZAP Baseline Scan- [x] Pipeline automatizado com OWASP ZAP

  continue-on-error: true  # Não para no erro do ZAP- [x] Falha automática para vulnerabilidades críticas

```- [x] Análise detalhada por severidade

- [x] Aplicação vulnerável para testes

**C) GitHub Step Summary Detalhado**- [x] Relatórios como artefatos



O pipeline gera automaticamente:### 🎯 Lições DevSecOps:

- Tabela de severidades1. **Shift Left:** Detectar problemas antes do deploy

- Lista das 10 vulnerabilidades mais comuns2. **Automação:** Testes de segurança sem intervenção manual  

- Instruções para acessar artifacts3. **Feedback:** Relatórios claros para desenvolvedores

- Status de aprovação/reprovação do pipeline4. **Bloqueio:** Pipeline que falha = deploy impossível

5. **Rastreabilidade:** Artefatos históricos para auditoria

---

---

## Como Executar

## 🔗 Links Úteis

### Pré-requisitos

- [OWASP ZAP](https://www.zaproxy.org/)

- Node.js 18+ instalado- [ZAP Docker](https://hub.docker.com/r/owasp/zap2docker-stable)

- Git configurado- [GitHub Actions](https://docs.github.com/en/actions)

- Conta no GitHub- [OWASP Top 10](https://owasp.org/Top10/)

- (Opcional) Docker Desktop para testes locais

---

### Executar Localmente

## 👥 Contribuição

```bash

# 1. Clone o repositórioPara adicionar novas vulnerabilidades:

git clone https://github.com/TomazVC/atv-19.git1. Edite `app.js` 

cd atv-192. Adicione nova rota vulnerável

3. Documente no README

# 2. Instale dependências4. Teste localmente

npm install5. Crie PR



# 3. Inicie a aplicação---

npm start

**⚠️ AVISO:** Esta aplicação contém vulnerabilidades intencionais. **NÃO USE EM PRODUÇÃO!**

# 4. Acesse no navegador
http://localhost:3000
```

### Testar Vulnerabilidades

```bash
# XSS
curl "http://localhost:3000/echo?q=<script>alert('XSS')</script>"

# SQL Injection
curl "http://localhost:3000/search?service=' OR '1'='1"

# Path Traversal
curl "http://localhost:3000/admin?file=../../../etc/passwd"

# Verificar headers ausentes
curl -I http://localhost:3000
```

### Executar ZAP Localmente

```bash
docker run --rm -t \
  -v "${PWD}:/zap/wrk" \
  owasp/zap2docker-stable zap-baseline.py \
  -t http://host.docker.internal:3000 \
  -r local-zap-report.html \
  -J local-zap-report.json \
  -a -m 3
```

### Executar Pipeline no GitHub

```bash
# Faça qualquer alteração e commit
git add .
git commit -m "test: trigger pipeline"
git push origin main

# Acesse GitHub Actions
https://github.com/TomazVC/atv-19/actions
```

---

## Acessar Relatórios (Artifacts)

Os relatórios são salvos como artifacts do GitHub Actions e podem ser acessados da seguinte forma:

1. Acesse a aba **Actions** no repositório
2. Clique no workflow executado
3. Role a página até o final
4. Procure pela seção **"Artifacts"**
5. Clique em **"zap-report-clickseguro"** para baixar
6. Extraia o ZIP e abra `zap-report.html` no navegador

**Conteúdo do Artifact:**
- `zap-report.html` - Relatório visual detalhado
- `zap-report.json` - Dados estruturados (JSON)

**Retenção:** 30 dias

---

## Como Funciona o Pipeline

### Fluxo de Execução

1. **Trigger:** Push ou Pull Request para `main`/`develop`
2. **Setup:** Instala Node.js e dependências npm
3. **Start App:** Inicia aplicação em background (porta 3000)
4. **Health Check:** Aguarda aplicação responder
5. **ZAP Scan:** Executa baseline scan passivo
6. **Análise:** Processa JSON e conta por severidade
7. **Validação:** Verifica se há High/Critical
8. **Upload:** Salva relatórios como artifacts
9. **Resultado:** Passa ou falha baseado em critérios
10. **Cleanup:** Finaliza aplicação

### Tempo de Execução

- Setup: ~30 segundos
- Start App: ~5 segundos
- ZAP Scan: ~30-60 segundos
- Análise e Upload: ~10 segundos
- **Total:** ~1-2 minutos

---

## Configuração Avançada

### Ajustar Tempo do Scan

Edite `.github/workflows/zap-ci.yml`:

```yaml
cmd_options: '-a -m 5 -J zap-report.json -r zap-report.html'
#                 ↑
#            5 minutos (ajuste conforme necessário)
```

### Ignorar Alertas Específicos

Edite `.zapbaseline`:

```
# Ignorar alerta por ID
IGNORE (scanruleid:10015)

# Ignorar por URL
IGNORE (url:*/static/*)

# Rebaixar para Warning
WARN (name:X-Content-Type-Options*)
```

### Mudar Alvo do Scan

```yaml
with:
  target: 'http://localhost:8080'  # Trocar porta/URL
```

---

## Solução de Problemas

### Pipeline Falhando

**Problema:** Pipeline falha com vulnerabilidades detectadas.

**Solução:** Isso é esperado! O pipeline deve falhar quando encontra High/Critical. Verifique o relatório HTML nos artifacts para detalhes.

---

### Aplicação Não Responde

**Problema:** Timeout ao aguardar aplicação.

**Solução:** Aumente o timeout no workflow:

```yaml
for i in {1..60}; do  # era {1..30}
```

---

### Artifacts Não Aparecem

**Problema:** Seção de artifacts não visível.

**Solução:** Role a página do workflow até o FINAL. Os artifacts ficam no rodapé da página.

---

### Docker Não Reconhecido

**Problema:** Comando docker não encontrado (Windows).

**Solução:**
1. Instale Docker Desktop
2. Habilite WSL2
3. Reinicie o terminal

---

## Resultados e Aprendizados

### Impacto no Desenvolvimento

**Antes do Pipeline:**
- Vulnerabilidades chegavam à produção
- Detecção manual e tardia
- Custo alto de correção
- Risco de exposição de dados

**Depois do Pipeline:**
- Bloqueio automático antes do deploy
- Detecção imediata no commit/PR
- Custo baixo de correção (fase de desenvolvimento)
- Risco minimizado

### Métricas do Projeto

- Vulnerabilidades detectadas: 20-30 por scan
- Taxa de bloqueio: 100% quando High/Critical presentes
- Tempo de execução: ~1-2 minutos
- Falsos positivos: Configuráveis via `.zapbaseline`

### Conceitos de DevSecOps Aplicados

1. **Shift Left:** Testes de segurança no início do ciclo
2. **Automação:** Zero intervenção manual
3. **Feedback Rápido:** Resultados em minutos
4. **Rastreabilidade:** Artifacts históricos por 30 dias
5. **Bloqueio Preventivo:** Deploy impossível com vulnerabilidades críticas

---

## Tecnologias Utilizadas

- **OWASP ZAP:** Scanner de segurança open-source
- **GitHub Actions:** Plataforma de CI/CD
- **Node.js/Express:** Runtime e framework web
- **Docker:** Containerização
- **jq:** Processamento de JSON

---

## Referências

- [OWASP ZAP Documentation](https://www.zaproxy.org/docs/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [OWASP Top 10](https://owasp.org/Top10/)
- [ZAP GitHub Action](https://github.com/zaproxy/action-baseline)

---

## Avisos Importantes

1. Esta aplicação contém vulnerabilidades intencionais para fins educacionais
2. **NÃO USE EM PRODUÇÃO**
3. Serve apenas para demonstrar o pipeline de segurança
4. As vulnerabilidades são propositais e documentadas

---

## Licença

Este projeto é para fins educacionais (FIAP - Cyber Security).

## Autor

Tomaz VC - Atividade 19 - Outubro 2025