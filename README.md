# ClickSeguro - Testes de Segurança Automatizados com OWASP ZAP# ClickSeguro - Testes de Segurança Automatizados com OWASP ZAP# ClickSeguro - Testes de Segurança Automatizados com OWASP ZAP



## Sobre o Projeto



Implementação completa de pipeline de segurança automatizado utilizando OWASP ZAP CLI integrado ao GitHub Actions. O projeto demonstra como detectar vulnerabilidades antes do deploy e bloquear pipelines com falhas críticas de segurança.## Sobre o Projeto## Sobre o Projeto



**Contexto:** Plataforma web ClickSeguro para agendamento de serviços residenciais.



**Problema:** Vulnerabilidades chegando à produção sem detecção prévia.Implementação completa de pipeline de segurança automatizado utilizando OWASP ZAP CLI integrado ao GitHub Actions. O projeto demonstra como detectar vulnerabilidades antes do deploy e bloquear pipelines com falhas críticas de segurança.Implementação de pipeline de segurança automatizado utilizando OWASP ZAP CLI integrado ao GitHub Actions para detecção de vulnerabilidades antes do deploy em produção.



**Solução:** Pipeline automatizado que executa testes de segurança em cada push/PR e bloqueia deploys inseguros.



---**Contexto:** Plataforma web ClickSeguro para agendamento de serviços residenciais.**Contexto:** Plataforma web ClickSeguro para agendamento de serviços residenciais.



## Estrutura do Projeto



```**Problema:** Vulnerabilidades chegando à produção sem detecção prévia.**Objetivo:** Integrar testes de segurança automatizados no pipeline de CI/CD para bloquear deploys com vulnerabilidades críticas.

atv-19/

├── .github/workflows/

│   └── zap-ci.yml           # Pipeline OWASP ZAP

├── app.js                   # Aplicação vulnerável (Node.js/Express)**Solução:** Pipeline automatizado que executa testes de segurança em cada push/PR e bloqueia deploys inseguros.---

├── package.json             # Dependências do projeto

├── Dockerfile               # Container para testes locais

├── .zapbaseline             # Configuração do ZAP

├── .gitignore               # Arquivos ignorados---## Requisitos da Atividade

└── README.md                # Esta documentação

```



---## Estrutura do ProjetoEste projeto implementa as seguintes tarefas:



## Requisitos Implementados



### 1. Configuração Inicial do OWASP ZAP CLI```1. **Configuração inicial do OWASP ZAP CLI**



**Implementação:**atv-19/   - Workflow configurado no GitHub Actions

- Workflow configurado em `.github/workflows/zap-ci.yml`

- Execução automática em push/PR para branches `main` e `develop`├── .github/workflows/   - Scan automático contra aplicação local

- Scan contra aplicação local rodando em `http://localhost:3000`

- Geração de relatórios HTML e JSON│   └── zap-ci.yml           # Pipeline OWASP ZAP   - Geração de relatórios HTML e JSON



**Arquivo:** `.github/workflows/zap-ci.yml`├── app.js                   # Aplicação vulnerável (Node.js/Express)



```yaml├── package.json             # Dependências do projeto2. **Validação automática de vulnerabilidades**

- name: OWASP ZAP Full Scan

  uses: zaproxy/action-full-scan@v0.11.0├── Dockerfile               # Container para testes locais   - Pipeline falha automaticamente para severidade High/Critical

  with:

    target: 'http://localhost:3000'├── .zapbaseline             # Configuração do ZAP   - Bloqueio de deploy baseado em riscos

    cmd_options: '-a -j -m 5 -J zap-report.json -r zap-report.html'

```├── .gitignore               # Arquivos ignorados



**Observação:** Utiliza Full Scan (ativo) para detectar vulnerabilidades como XSS e SQL Injection que requerem teste ativo.└── README.md                # Esta documentação3. **Análise dos resultados**



---```   - Contagem total de alertas



### 2. Validação Automática de Vulnerabilidades   - Distribuição por severidade (Critical, High, Medium, Low, Info)



**Implementação:**---   - Identificação dos tipos mais comuns de vulnerabilidades

- Pipeline analisa o arquivo JSON gerado pelo ZAP

- Conta vulnerabilidades por severidade (riskcode)

- **Falha automaticamente** se encontrar High (riskcode=3) ou Critical (riskcode=4)

- Deploy é bloqueado em caso de vulnerabilidades críticas## Requisitos Implementados4. **Teste com vulnerabilidade proposital**



**Lógica de Bloqueio:**   - Aplicação Node.js com vulnerabilidades intencionais



```bash### 1. Configuração Inicial do OWASP ZAP CLI   - XSS Refletido, SQL Injection, Path Traversal

if [ "$high" -gt 0 ] || [ "$critical" -gt 0 ]; then

  echo "Vulnerabilidades críticas detectadas!"

  exit 1  # Falha o pipeline

fi**Implementação:**5. **Aprimoramento do pipeline**

```

- Workflow configurado em `.github/workflows/zap-ci.yml`   - Relatórios salvos como artifacts do GitHub Actions

**Critérios:**

- Execução automática em push/PR para branches `main` e `develop`   - Retenção de 30 dias para auditoria

| Risk Code | Severidade | Comportamento |

|-----------|------------|---------------|- Scan contra aplicação local rodando em `http://localhost:3000`

| 4 | Critical | BLOQUEIA pipeline |

| 3 | High | BLOQUEIA pipeline |- Geração de relatórios HTML e JSON---

| 2 | Medium | Pipeline continua |

| 1 | Low | Pipeline continua |

| 0 | Info | Pipeline continua |

**Arquivo:** `.github/workflows/zap-ci.yml`## Estrutura do Projeto

---



### 3. Análise dos Resultados

```yaml```

**Implementação:**

- Contagem total de alertas encontrados- name: OWASP ZAP Baseline Scanatv-19/

- Distribuição por nível de severidade

- Identificação dos 10 tipos mais comuns de vulnerabilidades  uses: zaproxy/action-baseline@v0.11.0├── .github/workflows/

- Relatório detalhado no GitHub Actions Summary

  with:│   └── zap-ci.yml           # Pipeline OWASP ZAP

**Exemplo de Saída:**

    target: 'http://localhost:3000'├── app.js                   # Aplicação vulnerável (Node.js/Express)

```

Resumo de Vulnerabilidades por Severidade:    cmd_options: '-a -m 3 -J zap-report.json -r zap-report.html'├── package.json             # Dependências



| Severidade | Quantidade |```├── Dockerfile               # Container para testes

|-----------|------------|

| Critical  | 0          |├── .zapbaseline             # Configuração do ZAP

| High      | 3          |

| Medium    | 7          |---└── README.md                # Documentação

| Low       | 12         |

| Info      | 4          |└── 📖 README.md                      # Este arquivo

| Total     | 26         |

### 2. Validação Automática de Vulnerabilidades```

Top 10 Vulnerabilidades mais Comuns:

- Cross-Site Scripting (XSS) (3 ocorrências)

- SQL Injection (2 ocorrências)

- Missing Security Headers (8 ocorrências)**Implementação:**---

```

- Pipeline analisa o arquivo JSON gerado pelo ZAP

**Comando para análise local:**

- Conta vulnerabilidades por severidade (riskcode)## 🔧 Workflows Disponíveis

```bash

# Total de alertas- **Falha automaticamente** se encontrar High (riskcode=3) ou Critical (riskcode=4)

jq '.site[0].alerts | length' zap-report.json

- Deploy é bloqueado em caso de vulnerabilidades críticas### 1. `zap-ci.yml` - Pipeline Principal

# Vulnerabilidades High/Critical

jq '[.site[0].alerts[] | select(.riskcode=="3" or .riskcode=="4")] | length' zap-report.json- **Alvo:** OWASP Juice Shop (aplicação vulnerável conhecida)



# Listar tipos**Lógica de Bloqueio:**- **Tipo:** Baseline Scan (passivo + spider)

jq -r '.site[0].alerts[] | .name' zap-report.json | sort | uniq -c | sort -nr

```- **Duração:** ~5-7 minutos



**Exemplo de Análise Real:**```bash- **Uso:** Validação geral do pipeline



Após executar o pipeline contra a aplicação ClickSeguro, obtemos resultados como:if [ "$high" -gt 0 ] || [ "$critical" -gt 0 ]; then



```  echo "Vulnerabilidades críticas detectadas!"### 2. `zap-vulnerable-app.yml` - App ClickSeguro

Resumo Detalhado de Vulnerabilidades:

  exit 1  # Falha o pipeline- **Alvo:** Aplicação Node.js customizada

| Severidade | Quantidade | Descrição |

|-----------|------------|-----------|fi- **Vulnerabilidades:** XSS, SQL Injection, Path Traversal

| Critical  | 0          | Nenhuma vulnerabilidade crítica |

| High      | 3          | XSS, SQL Injection, Path Traversal |```- **Duração:** ~3-5 minutos  

| Medium    | 7          | Cookie sem flag secure, Version disclosure |

| Low       | 12         | Headers ausentes, Informações expostas |- **Uso:** Teste com vulnerabilidades específicas

| Info      | 4          | Avisos informativos |

| Total     | 26         | Total de alertas encontrados |**Critérios:**



Top 10 Vulnerabilidades Detectadas:---



1. Cross-Site Scripting (XSS) - 3 ocorrências| Risk Code | Severidade | Comportamento |

   Localização: /echo, /search, /admin

   Severidade: High|-----------|------------|---------------|## 🎯 Vulnerabilidades Implementadas

   

2. SQL Injection - 2 ocorrências| 4 | Critical | BLOQUEIA pipeline |

   Localização: /search, /user

   Severidade: High| 3 | High | BLOQUEIA pipeline |### 1. **XSS Refletido**

   

3. Path Traversal - 1 ocorrência| 2 | Medium | Pipeline continua |```

   Localização: /admin?file=

   Severidade: High| 1 | Low | Pipeline continua |URL: /echo?q=<script>alert('XSS')</script>

   

4. Missing Anti-clickjacking Header - 8 ocorrências| 0 | Info | Pipeline continua |Severidade: High

   Headers: X-Frame-Options ausente

   Severidade: MediumDescrição: Entrada não sanitizada refletida na página

   

5. Cookie Without Secure Flag - 5 ocorrências---```

   Cookies: sessionid, user_pref

   Severidade: Medium

   

6. Server Leaks Version Information - 2 ocorrências### 3. Análise dos Resultados### 2. **SQL Injection Simulado**

   Header: X-Powered-By: Express/4.18.2

   Severidade: Low```



Resultado: Pipeline FALHOU devido a 3 vulnerabilidades High**Implementação:**URL: /search?service=' OR '1'='1

```

- Contagem total de alertas encontradosSeveridade: High  

Este exemplo demonstra como o ZAP identifica e classifica as vulnerabilidades, permitindo análise detalhada antes do deploy.

- Distribuição por nível de severidadeDescrição: Query SQL construída sem sanitização

---

- Identificação dos 10 tipos mais comuns de vulnerabilidades```

### 4. Teste com Vulnerabilidade Proposital

- Relatório detalhado no GitHub Actions Summary

**Aplicação Desenvolvida:** Node.js com Express (`app.js`)

### 3. **Path Traversal**

#### Vulnerabilidades Implementadas:

**Exemplo de Saída:**```

**A) XSS Refletido (High)**

URL: /admin?file=../../../etc/passwd

```javascript

app.get('/echo', (req, res) => {```Severidade: Medium

  const userInput = req.query.q || '';

  // VULNERÁVEL: Sem sanitizaçãoResumo de Vulnerabilidades por Severidade:Descrição: Acesso a arquivos fora do diretório permitido

  res.send(`<div>${userInput}</div>`);

});```

```

| Severidade | Quantidade |

**Teste:** `http://localhost:3000/echo?q=<script>alert('XSS')</script>`

|-----------|------------|### 4. **Headers de Segurança Ausentes**

---

| Critical  | 0          |```

**B) SQL Injection (High)**

| High      | 3          |Missing: Content-Security-Policy, X-Frame-Options, X-Content-Type-Options

```javascript

app.get('/search', (req, res) => {| Medium    | 7          |Severidade: Low/Medium

  const service = req.query.service || '';

  // VULNERÁVEL: Query sem prepared statement| Low       | 12         |Descrição: Falta de cabeçalhos de segurança padrão

  const query = `SELECT * FROM services WHERE name = '${service}'`;

  res.send(`Query: ${query}`);| Info      | 4          |```

});

```| Total     | 26         |



**Teste:** `http://localhost:3000/search?service=' OR '1'='1`---



---Top 10 Vulnerabilidades mais Comuns:



**C) Path Traversal (High)**- Cross-Site Scripting (XSS) (3 ocorrências)## 📊 Como Funciona o Pipeline



```javascript- SQL Injection (2 ocorrências)

app.get('/admin', (req, res) => {

  const file = req.query.file || 'dashboard.html';- Missing Security Headers (8 ocorrências)### Fluxo Automático:

  // VULNERÁVEL: Sem validação de path

  const filePath = `/var/www/admin/${file}`;```

  res.send(`Acessando: ${filePath}`);

});1. **🚀 Trigger:** Push/PR para `main` ou `develop`

```

**Comando para análise local:**2. **📦 Setup:** Instala dependências e sobe aplicação

**Teste:** `http://localhost:3000/admin?file=../../../etc/passwd`

3. **🔍 Scan:** OWASP ZAP executa baseline scan

---

```bash4. **📋 Análise:** Conta vulnerabilidades por severidade

**D) Headers de Segurança Ausentes (Medium)**

# Total de alertas5. **🚨 Validação:** Falha se High/Critical > 0

```javascript

app.use((req, res, next) => {jq '.site[0].alerts | length' zap-report.json6. **📄 Relatórios:** Gera HTML e JSON como artefatos

  res.set('X-Powered-by', 'Express/4.18.2'); // Version disclosure

  // NÃO define: Content-Security-Policy, X-Frame-Options, X-Content-Type-Options

  next();

});# Vulnerabilidades High/Critical### Critério de Falha:

```

jq '[.site[0].alerts[] | select(.riskcode=="3" or .riskcode=="4")] | length' zap-report.json```yaml

---

# Pipeline FALHA se encontrar:

**E) Cookie Inseguro (Medium)**

# Listar tipos- Vulnerabilidades High (riskcode: 3)

```javascript

res.cookie('sessionid', 'abc123', { jq -r '.site[0].alerts[] | .name' zap-report.json | sort | uniq -c | sort -nr- Vulnerabilidades Critical (riskcode: 4)

  secure: false,      // Não requer HTTPS

  httpOnly: false,    // Acessível via JavaScript```

  sameSite: 'none'    // Permite CSRF

});# Pipeline PASSA se apenas:

```

---- Info (riskcode: 0)

**Detecção pelo ZAP:**

- Low (riskcode: 1)  

O OWASP ZAP Full Scan detecta todas estas vulnerabilidades através de:

- **Scan Ativo:** Injeta payloads para testar XSS, SQLi, Path Traversal### 4. Teste com Vulnerabilidade Proposital- Medium (riskcode: 2)

- **Scan Passivo:** Analisa headers, cookies e configurações

- **Spider:** Explora todas as rotas da aplicação```



---**Aplicação Desenvolvida:** Node.js com Express (`app.js`)



### 5. Aprimoramento do Pipeline---



**Implementações:**#### Vulnerabilidades Implementadas:



**A) Salvamento de Artifacts**## 📈 Interpretando os Resultados



```yaml**A) XSS Refletido (High)**

- name: Upload dos Relatórios

  uses: actions/upload-artifact@v4### Severidades OWASP ZAP:

  if: always()  # Executa mesmo se pipeline falhar

  with:```javascript| Risk Code | Severidade | Ação |

    name: zap-report-clickseguro

    path: |app.get('/echo', (req, res) => {|-----------|------------|------|

      zap-report.html

      zap-report.json  const userInput = req.query.q || '';| 0 | **Info** | ℹ️ Informativo |

    retention-days: 30

```  // VULNERÁVEL: Sem sanitização| 1 | **Low** | 🔵 Monitorar |



**Garantias:**  res.send(`<div>${userInput}</div>`);| 2 | **Medium** | 🟡 Corrigir quando possível |

- `if: always()` garante upload mesmo em caso de falha

- `retention-days: 30` mantém histórico por um mês});| 3 | **High** | 🟠 **BLOQUEIA DEPLOY** |

- Ambos os formatos (HTML e JSON) são salvos

```| 4 | **Critical** | 🔴 **BLOQUEIA DEPLOY** |

**B) Continue on Error**



```yaml

- name: OWASP ZAP Full Scan**Teste:** `http://localhost:3000/echo?q=<script>alert('XSS')</script>`### Relatórios Gerados:

  continue-on-error: true  # Não para no erro do ZAP

```- **📄 zap-report.html:** Relatório visual detalhado



Permite que o pipeline continue mesmo se o ZAP encontrar problemas, garantindo que os relatórios sejam sempre gerados.**B) SQL Injection (High)**- **📊 zap-report.json:** Dados estruturados para automação



**C) GitHub Step Summary Detalhado**- **📋 GitHub Summary:** Resumo direto no Actions



O pipeline gera automaticamente no GitHub Actions:```javascript

- Tabela de severidades

- Lista das 10 vulnerabilidades mais comunsapp.get('/search', (req, res) => {---

- Instruções para acessar artifacts

- Status de aprovação/reprovação do pipeline  const service = req.query.service || '';

- Links diretos para os relatórios

  // VULNERÁVEL: Query sem prepared statement## 🔧 Configurações Avançadas

---

  const query = `SELECT * FROM services WHERE name = '${service}'`;

## Verificação do Relatório HTML

  res.send(`Query: ${query}`);### Personalizar Tempo de Scan:

O workflow está configurado para **SEMPRE gerar o relatório HTML**:

});```yaml

```yaml

cmd_options: '-a -j -m 5 -J zap-report.json -r zap-report.html'```# Em zap-ci.yml, linha cmd_options:

#                                            ↑

#                                    -r = relatório HTMLcmd_options: '-a -m 10 -J zap.json -r zap.html'

```

**Teste:** `http://localhost:3000/search?service=' OR '1'='1`#              ↑

**Onde encontrar:**

1. Acesse a aba **Actions** no repositório#           10 minutos (padrão: 5)

2. Clique no workflow executado

3. Role até o final da página**C) Path Traversal (Medium)**```

4. Procure pela seção **"Artifacts"**

5. Baixe **"zap-report-clickseguro.zip"**

6. Extraia e abra **`zap-report.html`** no navegador

```javascript### Adicionar Exclusões:

**Conteúdo do Relatório HTML:**

- Sumário executivo com gráficosapp.get('/admin', (req, res) => {```yaml

- Lista de todas as vulnerabilidades

- Detalhes de cada alerta (URL, parâmetro, evidência)  const file = req.query.file || 'dashboard.html';# Crie arquivo .zapbaseline com:

- Recomendações de correção

- Nível de confiança da detecção  // VULNERÁVEL: Sem validação de path# IGNORE (riskdesc:*)



---  const filePath = `/var/www/admin/${file}`;# IGNORE (url:*/admin/*)



## Como Executar  res.send(`Acessando: ${filePath}`);# WARN (name:Cross-Domain*)



### Pré-requisitos});```



- Node.js 18+ instalado```

- Git configurado

- Conta no GitHub### Mudar Alvo do Scan:

- (Opcional) Docker Desktop para testes locais

**Teste:** `http://localhost:3000/admin?file=../../../etc/passwd````yaml

### Executar Localmente

# Substitua o target:

```bash

# 1. Clone o repositório**D) Headers de Segurança Ausentes (Low/Medium)**target: 'http://localhost:8080'  # Sua aplicação

git clone https://github.com/TomazVC/atv-19.git

cd atv-19```



# 2. Instale dependênciasAplicação não define:

npm install

- Content-Security-Policy---

# 3. Inicie a aplicação

npm start- X-Frame-Options



# 4. Acesse no navegador- X-Content-Type-Options## 🐛 Solução de Problemas

http://localhost:3000

```- Strict-Transport-Security



### Testar Vulnerabilidades### ❌ "Aplicação não respondeu a tempo"



```bash---```bash

# XSS

curl "http://localhost:3000/echo?q=<script>alert('XSS')</script>"# Aumentar timeout:



# SQL Injection### 5. Aprimoramento do Pipelinefor i in {1..60}; do  # era {1..30}

curl "http://localhost:3000/search?service=' OR '1'='1"

```

# Path Traversal

curl "http://localhost:3000/admin?file=../../../etc/passwd"**Implementações:**



# Verificar headers ausentes### ❌ "Arquivo zap-report.json não encontrado"

curl -I http://localhost:3000

```**A) Salvamento de Artifacts**```bash



### Executar ZAP Localmente# Verificar se ZAP rodou com sucesso



```bash```yaml# Checar logs do step "OWASP ZAP Baseline Scan"

docker run --rm -t \

  -v "${PWD}:/zap/wrk" \- name: Upload dos Relatórios```

  owasp/zap2docker-stable zap-full-scan.py \

  -t http://host.docker.internal:3000 \  uses: actions/upload-artifact@v4

  -r local-zap-report.html \

  -J local-zap-report.json \  if: always()  # Executa mesmo se pipeline falhar### ❌ Docker não reconhecido (Windows)

  -m 5

```  with:```bash



### Executar Pipeline no GitHub    name: zap-report-clickseguro# Instalar Docker Desktop



```bash    path: |# Habilitar WSL2

# Faça qualquer alteração e commit

git add .      zap-report.html# Reiniciar terminal

git commit -m "test: trigger pipeline"

git push origin main      zap-report.json```



# Acesse GitHub Actions    retention-days: 30

https://github.com/TomazVC/atv-19/actions

``````---



---



## Acessar Relatórios (Artifacts)**B) Continue on Error**## 📚 Aprendizados



Os relatórios são salvos como artifacts do GitHub Actions:



1. Acesse a aba **Actions** no repositório```yaml### ✅ O que foi implementado:

2. Clique no workflow executado

3. Role a página até o final- name: OWASP ZAP Baseline Scan- [x] Pipeline automatizado com OWASP ZAP

4. Procure pela seção **"Artifacts"**

5. Clique em **"zap-report-clickseguro"** para baixar  continue-on-error: true  # Não para no erro do ZAP- [x] Falha automática para vulnerabilidades críticas

6. Extraia o ZIP e abra `zap-report.html` no navegador

```- [x] Análise detalhada por severidade

**Conteúdo do Artifact:**

- `zap-report.html` - Relatório visual detalhado com gráficos- [x] Aplicação vulnerável para testes

- `zap-report.json` - Dados estruturados para automação

**C) GitHub Step Summary Detalhado**- [x] Relatórios como artefatos

**Retenção:** 30 dias



---

O pipeline gera automaticamente:### 🎯 Lições DevSecOps:

## Como Funciona o Pipeline

- Tabela de severidades1. **Shift Left:** Detectar problemas antes do deploy

### Fluxo de Execução

- Lista das 10 vulnerabilidades mais comuns2. **Automação:** Testes de segurança sem intervenção manual  

1. **Trigger:** Push ou Pull Request para `main`/`develop`

2. **Setup:** Instala Node.js e dependências npm- Instruções para acessar artifacts3. **Feedback:** Relatórios claros para desenvolvedores

3. **Start App:** Inicia aplicação em background (porta 3000)

4. **Health Check:** Aguarda aplicação responder- Status de aprovação/reprovação do pipeline4. **Bloqueio:** Pipeline que falha = deploy impossível

5. **ZAP Full Scan:** Executa scan ativo + passivo (5 minutos)

6. **Análise:** Processa JSON e conta por severidade5. **Rastreabilidade:** Artefatos históricos para auditoria

7. **Validação:** Verifica se há High/Critical

8. **Upload:** Salva relatórios como artifacts (sempre)---

9. **Resultado:** Passa ou falha baseado em critérios

10. **Cleanup:** Finaliza aplicação---



### Tempo de Execução## Como Executar



- Setup: ~30 segundos## 🔗 Links Úteis

- Start App: ~5 segundos

- ZAP Full Scan: ~5-10 minutos### Pré-requisitos

- Análise e Upload: ~10 segundos

- **Total:** ~6-11 minutos- [OWASP ZAP](https://www.zaproxy.org/)



### Diferença: Baseline vs Full Scan- Node.js 18+ instalado- [ZAP Docker](https://hub.docker.com/r/owasp/zap2docker-stable)



| Característica | Baseline Scan | Full Scan (usado) |- Git configurado- [GitHub Actions](https://docs.github.com/en/actions)

|---------------|---------------|-------------------|

| Tipo | Passivo apenas | Ativo + Passivo |- Conta no GitHub- [OWASP Top 10](https://owasp.org/Top10/)

| Detecta XSS | ❌ Não | ✅ Sim |

| Detecta SQLi | ❌ Não | ✅ Sim |- (Opcional) Docker Desktop para testes locais

| Detecta Headers | ✅ Sim | ✅ Sim |

| Tempo | ~1-2 min | ~5-10 min |---

| Invasivo | Não | Sim |

### Executar Localmente

---

## 👥 Contribuição

## Configuração Avançada

```bash

### Ajustar Tempo do Scan

# 1. Clone o repositórioPara adicionar novas vulnerabilidades:

Edite `.github/workflows/zap-ci.yml`:

git clone https://github.com/TomazVC/atv-19.git1. Edite `app.js` 

```yaml

cmd_options: '-a -j -m 10 -J zap-report.json -r zap-report.html'cd atv-192. Adicione nova rota vulnerável

#                      ↑

#                 10 minutos (ajuste conforme necessário)3. Documente no README

```

# 2. Instale dependências4. Teste localmente

### Ignorar Alertas Específicos

npm install5. Crie PR

Edite `.zapbaseline`:



```

# Ignorar alerta por ID# 3. Inicie a aplicação---

IGNORE (scanruleid:10015)

npm start

# Ignorar por URL

IGNORE (url:*/static/*)**⚠️ AVISO:** Esta aplicação contém vulnerabilidades intencionais. **NÃO USE EM PRODUÇÃO!**



# Rebaixar para Warning# 4. Acesse no navegador

WARN (name:X-Content-Type-Options*)http://localhost:3000

``````



### Mudar Alvo do Scan### Testar Vulnerabilidades



```yaml```bash

with:# XSS

  target: 'http://localhost:8080'  # Trocar porta/URLcurl "http://localhost:3000/echo?q=<script>alert('XSS')</script>"

```

# SQL Injection

---curl "http://localhost:3000/search?service=' OR '1'='1"



## Solução de Problemas# Path Traversal

curl "http://localhost:3000/admin?file=../../../etc/passwd"

### Pipeline Falhando

# Verificar headers ausentes

**Problema:** Pipeline falha com vulnerabilidades detectadas.curl -I http://localhost:3000

```

**Solução:** Isso é esperado! O pipeline deve falhar quando encontra High/Critical. Verifique o relatório HTML nos artifacts para detalhes.

### Executar ZAP Localmente

---

```bash

### Aplicação Não Respondedocker run --rm -t \

  -v "${PWD}:/zap/wrk" \

**Problema:** Timeout ao aguardar aplicação.  owasp/zap2docker-stable zap-baseline.py \

  -t http://host.docker.internal:3000 \

**Solução:** Aumente o timeout no workflow:  -r local-zap-report.html \

  -J local-zap-report.json \

```yaml  -a -m 3

for i in {1..60}; do  # era {1..30}```

```

### Executar Pipeline no GitHub

---

```bash

### Artifacts Não Aparecem# Faça qualquer alteração e commit

git add .

**Problema:** Seção de artifacts não visível.git commit -m "test: trigger pipeline"

git push origin main

**Solução:** Role a página do workflow até o FINAL. Os artifacts ficam no rodapé da página.

# Acesse GitHub Actions

---https://github.com/TomazVC/atv-19/actions

```

### Relatório HTML Não Gerado

---

**Problema:** Apenas JSON no artifact.

## Acessar Relatórios (Artifacts)

**Solução:** Verifique se o parâmetro `-r` está presente:

Os relatórios são salvos como artifacts do GitHub Actions e podem ser acessados da seguinte forma:

```yaml

cmd_options: '-a -j -m 5 -J zap-report.json -r zap-report.html'1. Acesse a aba **Actions** no repositório

#                                             ↑ necessário2. Clique no workflow executado

```3. Role a página até o final

4. Procure pela seção **"Artifacts"**

---5. Clique em **"zap-report-clickseguro"** para baixar

6. Extraia o ZIP e abra `zap-report.html` no navegador

### Docker Não Reconhecido

**Conteúdo do Artifact:**

**Problema:** Comando docker não encontrado (Windows).- `zap-report.html` - Relatório visual detalhado

- `zap-report.json` - Dados estruturados (JSON)

**Solução:**

1. Instale Docker Desktop**Retenção:** 30 dias

2. Habilite WSL2

3. Reinicie o terminal---



---## Como Funciona o Pipeline



## Resultados e Aprendizados### Fluxo de Execução



### Impacto no Desenvolvimento1. **Trigger:** Push ou Pull Request para `main`/`develop`

2. **Setup:** Instala Node.js e dependências npm

**Antes do Pipeline:**3. **Start App:** Inicia aplicação em background (porta 3000)

- Vulnerabilidades chegavam à produção4. **Health Check:** Aguarda aplicação responder

- Detecção manual e tardia5. **ZAP Scan:** Executa baseline scan passivo

- Custo alto de correção6. **Análise:** Processa JSON e conta por severidade

- Risco de exposição de dados7. **Validação:** Verifica se há High/Critical

8. **Upload:** Salva relatórios como artifacts

**Depois do Pipeline:**9. **Resultado:** Passa ou falha baseado em critérios

- Bloqueio automático antes do deploy10. **Cleanup:** Finaliza aplicação

- Detecção imediata no commit/PR

- Custo baixo de correção (fase de desenvolvimento)### Tempo de Execução

- Risco minimizado

- Setup: ~30 segundos

### Métricas do Projeto- Start App: ~5 segundos

- ZAP Scan: ~30-60 segundos

- Vulnerabilidades detectadas: 20-30 por scan- Análise e Upload: ~10 segundos

- Taxa de bloqueio: 100% quando High/Critical presentes- **Total:** ~1-2 minutos

- Tempo de execução: ~6-11 minutos

- Falsos positivos: Configuráveis via `.zapbaseline`---

- Retenção de histórico: 30 dias

## Configuração Avançada

### Conceitos de DevSecOps Aplicados

### Ajustar Tempo do Scan

1. **Shift Left:** Testes de segurança no início do ciclo

2. **Automação:** Zero intervenção manualEdite `.github/workflows/zap-ci.yml`:

3. **Feedback Rápido:** Resultados em minutos

4. **Rastreabilidade:** Artifacts históricos por 30 dias```yaml

5. **Bloqueio Preventivo:** Deploy impossível com vulnerabilidades críticascmd_options: '-a -m 5 -J zap-report.json -r zap-report.html'

#                 ↑

---#            5 minutos (ajuste conforme necessário)

```

## Tecnologias Utilizadas

### Ignorar Alertas Específicos

- **OWASP ZAP:** Scanner de segurança open-source

- **GitHub Actions:** Plataforma de CI/CDEdite `.zapbaseline`:

- **Node.js/Express:** Runtime e framework web

- **Docker:** Containerização para testes```

- **jq:** Processamento de JSON para análise# Ignorar alerta por ID

IGNORE (scanruleid:10015)

---

# Ignorar por URL

## ReferênciasIGNORE (url:*/static/*)



- [OWASP ZAP Documentation](https://www.zaproxy.org/docs/)# Rebaixar para Warning

- [GitHub Actions Documentation](https://docs.github.com/en/actions)WARN (name:X-Content-Type-Options*)

- [OWASP Top 10](https://owasp.org/Top10/)```

- [ZAP GitHub Action](https://github.com/zaproxy/action-full-scan)

- [ZAP Docker Images](https://hub.docker.com/r/owasp/zap2docker-stable)### Mudar Alvo do Scan



---```yaml

with:

## Avisos Importantes  target: 'http://localhost:8080'  # Trocar porta/URL

```

1. Esta aplicação contém vulnerabilidades intencionais para fins educacionais

2. **NÃO USE EM PRODUÇÃO**---

3. Serve apenas para demonstrar o pipeline de segurança

4. As vulnerabilidades são propositais e documentadas## Solução de Problemas

5. O Full Scan é invasivo e pode afetar a aplicação durante o teste

### Pipeline Falhando

---

**Problema:** Pipeline falha com vulnerabilidades detectadas.

## Licença

**Solução:** Isso é esperado! O pipeline deve falhar quando encontra High/Critical. Verifique o relatório HTML nos artifacts para detalhes.

Este projeto é para fins educacionais (FIAP - Cyber Security).

---

## Autor

### Aplicação Não Responde

Tomaz VC - Atividade 19 - Outubro 2025
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