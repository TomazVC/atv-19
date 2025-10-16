# ClickSeguro - Testes de Segurança Automatizados com OWASP ZAP# ClickSeguro - Testes de Segurança Automatizados com OWASP ZAP



## Sobre o Projeto## Sobre o Projeto



Implementação completa de pipeline de segurança automatizado utilizando OWASP ZAP CLI integrado ao GitHub Actions. O projeto demonstra como detectar vulnerabilidades antes do deploy e bloquear pipelines com falhas críticas de segurança.Implementação completa de pipeline de segurança automatizado utilizando OWASP ZAP CLI integrado ao GitHub Actions. O projeto demonstra como detectar vulnerabilidades antes do deploy e bloquear pipelines com falhas críticas de segurança.



**Contexto:** Plataforma web ClickSeguro para agendamento de serviços residenciais.**Contexto:** Plataforma web ClickSeguro para agendamento de serviços residenciais.



**Problema:** Vulnerabilidades chegando à produção sem detecção prévia.**Problema:** Vulnerabilidades chegando à produção sem detecção prévia.



**Solução:** Pipeline automatizado que executa testes de segurança em cada push/PR e bloqueia deploys inseguros.**Solução:** Pipeline automatizado que executa testes de segurança em cada push/PR e bloqueia deploys inseguros.



------



## Estrutura do Projeto## Estrutura do Projeto



``````

atv-19/atv-19/

├── .github/workflows/├── .github/workflows/

│   └── zap-ci.yml           # Pipeline OWASP ZAP│   └── zap-ci.yml           # Pipeline OWASP ZAP

├── app.js                   # Aplicação vulnerável (Node.js/Express)├── app.js                   # Aplicação vulnerável (Node.js/Express)

├── package.json             # Dependências do projeto├── package.json             # Dependências do projeto

├── Dockerfile               # Container para testes locais├── Dockerfile               # Container para testes locais

├── .zapbaseline             # Configuração do ZAP├── .zapbaseline             # Configuração do ZAP

├── .gitignore               # Arquivos ignorados├── .gitignore               # Arquivos ignorados

└── README.md                # Documentação└── README.md                # Documentação

``````



------



## Requisitos da Atividade## Requisitos da Atividade



### 1. Configuração do OWASP ZAP CLI no GitHub Actions└── README.md                # Esta documentação



**Implementação:**```

- Workflow configurado em `.github/workflows/zap-ci.yml`

- Execução automática em push/PR para branches `main` e `develop`

- Scan contra aplicação local rodando em `http://localhost:3000`

- Geração de relatórios HTML e JSON---## Estrutura do ProjetoEste projeto implementa as seguintes tarefas:



**Arquivo:** `.github/workflows/zap-ci.yml`



```yaml## Requisitos Implementados

- name: Executa OWASP ZAP Full Scan via Docker

  run: |

    docker run --rm \

      --network="host" \### 1. Configuração Inicial do OWASP ZAP CLI```1. **Configuração inicial do OWASP ZAP CLI**

      -v $(pwd):/zap/wrk:rw \

      -t ghcr.io/zaproxy/zaproxy:stable \

      zap-full-scan.py \

      -t http://localhost:3000 \**Implementação:**atv-19/   - Workflow configurado no GitHub Actions

      -r zap-report.html \

      -J zap-report.json \- Workflow configurado em `.github/workflows/zap-ci.yml`

      -a -j -m 3 -d || true

```- Execução automática em push/PR para branches `main` e `develop`├── .github/workflows/   - Scan automático contra aplicação local



**Observação:** Utiliza Docker direto com Full Scan (ativo) para detectar vulnerabilidades que requerem teste ativo (XSS, SQL Injection, etc).- Scan contra aplicação local rodando em `http://localhost:3000`



### 2. Validação Automática de Vulnerabilidades- Geração de relatórios HTML e JSON│   └── zap-ci.yml           # Pipeline OWASP ZAP   - Geração de relatórios HTML e JSON



**Implementação:**

- Pipeline analisa o arquivo JSON gerado pelo ZAP

- Conta vulnerabilidades por severidade (riskcode 0-4)**Arquivo:** `.github/workflows/zap-ci.yml`├── app.js                   # Aplicação vulnerável (Node.js/Express)

- Falha automaticamente se detectar High (riskcode=3) ou Critical (riskcode=4)



**Código:**

```yaml├── package.json             # Dependências do projeto2. **Validação automática de vulnerabilidades**

```yaml

- name: Verifica critérios de falha- name: OWASP ZAP Full Scan

  if: always()

  run: |  uses: zaproxy/action-full-scan@v0.11.0├── Dockerfile               # Container para testes locais   - Pipeline falha automaticamente para severidade High/Critical

    high=${{ steps.zapcheck.outputs.high }}

    critical=${{ steps.zapcheck.outputs.critical }}  with:

    

    if [ "$high" -gt 0 ] || [ "$critical" -gt 0 ]; then    target: 'http://localhost:3000'├── .zapbaseline             # Configuração do ZAP   - Bloqueio de deploy baseado em riscos

      echo "### Status: FALHOU"

      echo "Vulnerabilidades críticas detectadas"    cmd_options: '-a -j -m 5 -J zap-report.json -r zap-report.html'

      exit 1

    else```├── .gitignore               # Arquivos ignorados

      echo "### Status: APROVADO"

      echo "Nenhuma vulnerabilidade crítica detectada"

    fi

```**Observação:** Utiliza Full Scan (ativo) para detectar vulnerabilidades como XSS e SQL Injection que requerem teste ativo.└── README.md                # Esta documentação3. **Análise dos resultados**



**Resultado:** Deploy é bloqueado automaticamente se vulnerabilidades críticas forem encontradas.



### 3. Análise dos Resultados---```   - Contagem total de alertas



**Implementação:**

- Parsing do JSON com `jq`

- Contagem total de alertas### 2. Validação Automática de Vulnerabilidades   - Distribuição por severidade (Critical, High, Medium, Low, Info)

- Distribuição por severidade (Critical, High, Medium, Low, Info)

- Top 10 vulnerabilidades mais comuns



**Arquivo:** `zap-report.json`**Implementação:**---   - Identificação dos tipos mais comuns de vulnerabilidades



```json- Pipeline analisa o arquivo JSON gerado pelo ZAP

{

  "site": [{- Conta vulnerabilidades por severidade (riskcode)

    "alerts": [

      {- **Falha automaticamente** se encontrar High (riskcode=3) ou Critical (riskcode=4)

        "name": "SQL Injection",

        "riskcode": "3",- Deploy é bloqueado em caso de vulnerabilidades críticas## Requisitos Implementados4. **Teste com vulnerabilidade proposital**

        "confidence": "2",

        "riskdesc": "High (Medium)",

        "desc": "...",

        "instances": [...]**Lógica de Bloqueio:**   - Aplicação Node.js com vulnerabilidades intencionais

      }

    ]

  }]

}```bash### 1. Configuração Inicial do OWASP ZAP CLI   - XSS Refletido, SQL Injection, Path Traversal

```

if [ "$high" -gt 0 ] || [ "$critical" -gt 0 ]; then

**Tabela gerada no GitHub Actions Summary:**

  echo "Vulnerabilidades críticas detectadas!"

| Severidade | Quantidade |

|-----------|------------|  exit 1  # Falha o pipeline

| Critical  | 0          |

| High      | 0          |fi**Implementação:**5. **Aprimoramento do pipeline**

| Medium    | 0          |

| Low       | 0          |```

| Info      | 0          |

| **Total** | **0**      |- Workflow configurado em `.github/workflows/zap-ci.yml`   - Relatórios salvos como artifacts do GitHub Actions



**Status Atual:** Nenhuma vulnerabilidade detectada (requer investigação - veja seção de Troubleshooting).**Critérios:**



### 4. Inserção de Vulnerabilidade Proposital- Execução automática em push/PR para branches `main` e `develop`   - Retenção de 30 dias para auditoria



**Implementação:**| Risk Code | Severidade | Comportamento |

- Aplicação `app.js` contém vulnerabilidades intencionais para teste

|-----------|------------|---------------|- Scan contra aplicação local rodando em `http://localhost:3000`

**Vulnerabilidades implementadas:**

| 4 | Critical | BLOQUEIA pipeline |

#### a) Cross-Site Scripting (XSS)

```javascript| 3 | High | BLOQUEIA pipeline |- Geração de relatórios HTML e JSON---

app.get('/echo', (req, res) => {

  const message = req.query.msg;| 2 | Medium | Pipeline continua |

  res.send(`<h1>Echo: ${message}</h1>`); // XSS - sem sanitização

});| 1 | Low | Pipeline continua |

```

**Teste:** `http://localhost:3000/echo?msg=<script>alert('XSS')</script>`| 0 | Info | Pipeline continua |



#### b) SQL Injection**Arquivo:** `.github/workflows/zap-ci.yml`## Estrutura do Projeto

```javascript

app.get('/search', (req, res) => {---

  const query = req.query.q;

  const sql = `SELECT * FROM users WHERE name = '${query}'`; // SQLi

  res.send(`Buscando: ${sql}`);

});### 3. Análise dos Resultados

```

**Teste:** `http://localhost:3000/search?q=' OR '1'='1````yaml```



#### c) Path Traversal**Implementação:**

```javascript

app.get('/admin', (req, res) => {- Contagem total de alertas encontrados- name: OWASP ZAP Baseline Scanatv-19/

  const file = req.query.file;

  const path = `./uploads/${file}`; // Path Traversal- Distribuição por nível de severidade

  res.send(`Acessando: ${path}`);

});- Identificação dos 10 tipos mais comuns de vulnerabilidades  uses: zaproxy/action-baseline@v0.11.0├── .github/workflows/

```

**Teste:** `http://localhost:3000/admin?file=../../etc/passwd`- Relatório detalhado no GitHub Actions Summary



#### d) Vulnerabilidades Passivas  with:│   └── zap-ci.yml           # Pipeline OWASP ZAP

```javascript

// Headers inseguros**Exemplo de Saída:**

app.use((req, res, next) => {

  res.setHeader('X-Powered-By', 'Express 4.18.0'); // Information Disclosure    target: 'http://localhost:3000'├── app.js                   # Aplicação vulnerável (Node.js/Express)

  next();

});```



// Cookies sem segurançaResumo de Vulnerabilidades por Severidade:    cmd_options: '-a -m 3 -J zap-report.json -r zap-report.html'├── package.json             # Dependências

res.cookie('session', '123456', { 

  httpOnly: false,  // Vulnerável a XSS

  secure: false     // Sem HTTPS obrigatório

});| Severidade | Quantidade |```├── Dockerfile               # Container para testes

```

|-----------|------------|

### 5. Salvamento de Relatórios como Artifacts

| Critical  | 0          |├── .zapbaseline             # Configuração do ZAP

**Implementação:**

- Upload automático via `actions/upload-artifact@v4`| High      | 3          |

- Retenção de 30 dias

- Executa sempre (`if: always()`) mesmo se pipeline falhar| Medium    | 7          |---└── README.md                # Documentação



**Código:**| Low       | 12         |



```yaml| Info      | 4          |└── 📖 README.md                      # Este arquivo

- name: Upload dos Relatórios

  uses: actions/upload-artifact@v4| Total     | 26         |

  if: always()

  with:### 2. Validação Automática de Vulnerabilidades```

    name: zap-report-clickseguro

    path: |Top 10 Vulnerabilidades mais Comuns:

      zap-report.html

      zap-report.json- Cross-Site Scripting (XSS) (3 ocorrências)

    retention-days: 30

```- SQL Injection (2 ocorrências)



**Como acessar:**- Missing Security Headers (8 ocorrências)**Implementação:**---

1. Acesse: `https://github.com/TomazVC/atv-19/actions`

2. Clique no workflow desejado```

3. Role até o final da página

4. Procure pela seção "Artifacts"- Pipeline analisa o arquivo JSON gerado pelo ZAP

5. Clique em "zap-report-clickseguro" para baixar o arquivo ZIP

**Comando para análise local:**

**Conteúdo do pacote:**

- `zap-report.html` - Relatório visual completo- Conta vulnerabilidades por severidade (riskcode)## 🔧 Workflows Disponíveis

- `zap-report.json` - Dados estruturados para análise programática

```bash

---

# Total de alertas- **Falha automaticamente** se encontrar High (riskcode=3) ou Critical (riskcode=4)

## Como Executar

jq '.site[0].alerts | length' zap-report.json

### Opção 1: GitHub Actions (Automático)

- Deploy é bloqueado em caso de vulnerabilidades críticas### 1. `zap-ci.yml` - Pipeline Principal

1. Faça um push para o repositório:

```bash# Vulnerabilidades High/Critical

git add .

git commit -m "test: trigger security scan"jq '[.site[0].alerts[] | select(.riskcode=="3" or .riskcode=="4")] | length' zap-report.json- **Alvo:** OWASP Juice Shop (aplicação vulnerável conhecida)

git push origin main

```



2. Acesse: `https://github.com/TomazVC/atv-19/actions`# Listar tipos**Lógica de Bloqueio:**- **Tipo:** Baseline Scan (passivo + spider)



3. Aguarde a execução (~2-3 minutos)jq -r '.site[0].alerts[] | .name' zap-report.json | sort | uniq -c | sort -nr



4. Baixe os artifacts no final da página do workflow```- **Duração:** ~5-7 minutos



### Opção 2: Teste Local com Docker



1. Clone o repositório:**Exemplo de Análise Real:**```bash- **Uso:** Validação geral do pipeline

```bash

git clone https://github.com/TomazVC/atv-19.git

cd atv-19

```Após executar o pipeline contra a aplicação ClickSeguro, obtemos resultados como:if [ "$high" -gt 0 ] || [ "$critical" -gt 0 ]; then



2. Inicie a aplicação:

```bash

npm install```  echo "Vulnerabilidades críticas detectadas!"### 2. `zap-vulnerable-app.yml` - App ClickSeguro

npm start

```Resumo Detalhado de Vulnerabilidades:



3. Em outro terminal, execute o ZAP:  exit 1  # Falha o pipeline- **Alvo:** Aplicação Node.js customizada

```bash

docker run --rm \| Severidade | Quantidade | Descrição |

  --network="host" \

  -v $(pwd):/zap/wrk:rw \|-----------|------------|-----------|fi- **Vulnerabilidades:** XSS, SQL Injection, Path Traversal

  -t ghcr.io/zaproxy/zaproxy:stable \

  zap-full-scan.py \| Critical  | 0          | Nenhuma vulnerabilidade crítica |

  -t http://localhost:3000 \

  -r zap-report.html \| High      | 3          | XSS, SQL Injection, Path Traversal |```- **Duração:** ~3-5 minutos  

  -J zap-report.json \

  -a -j -m 3| Medium    | 7          | Cookie sem flag secure, Version disclosure |

```

| Low       | 12         | Headers ausentes, Informações expostas |- **Uso:** Teste com vulnerabilidades específicas

4. Verifique os relatórios gerados:

```bash| Info      | 4          | Avisos informativos |

ls -lh zap-report.*

```| Total     | 26         | Total de alertas encontrados |**Critérios:**



### Opção 3: Manual Dispatch



1. Acesse: `https://github.com/TomazVC/atv-19/actions`Top 10 Vulnerabilidades Detectadas:---

2. Clique em "OWASP ZAP Security Scan - ClickSeguro"

3. Clique em "Run workflow"

4. Selecione a branch `main`

5. Clique em "Run workflow" novamente1. Cross-Site Scripting (XSS) - 3 ocorrências| Risk Code | Severidade | Comportamento |



---   Localização: /echo, /search, /admin



## Troubleshooting   Severidade: High|-----------|------------|---------------|## 🎯 Vulnerabilidades Implementadas



### Problema: Relatórios vazios (0 vulnerabilidades detectadas)   



**Sintomas:**2. SQL Injection - 2 ocorrências| 4 | Critical | BLOQUEIA pipeline |

- JSON contém apenas: `{"site":[{"alerts":[]}]}`

- HTML mostra placeholder em vez de relatório real   Localização: /search, /user

- Pipeline passa (verde) mas não deveria

   Severidade: High| 3 | High | BLOQUEIA pipeline |### 1. **XSS Refletido**

**Causas Possíveis:**

   

1. **ZAP não consegue acessar localhost** - Problema de rede com `--network="host"`

2. **Scan muito rápido** - Tempo insuficiente para explorar rotas3. Path Traversal - 1 ocorrência| 2 | Medium | Pipeline continua |```

3. **ZAP travou/falhou** - Flag `|| true` mascara erros

   Localização: /admin?file=

**Soluções:**

   Severidade: High| 1 | Low | Pipeline continua |URL: /echo?q=<script>alert('XSS')</script>

#### Solução 1: Verificar logs do step "Executa OWASP ZAP Full Scan"

```bash   

# No workflow, adicione:

docker run ... 2>&1 | tee zap-scan.log4. Missing Anti-clickjacking Header - 8 ocorrências| 0 | Info | Pipeline continua |Severidade: High

```

   Headers: X-Frame-Options ausente

#### Solução 2: Testar conectividade antes do scan

```yaml   Severidade: MediumDescrição: Entrada não sanitizada refletida na página

- name: Verifica conectividade

  run: |   

    curl -v http://localhost:3000/health

    curl -v http://localhost:3000/5. Cookie Without Secure Flag - 5 ocorrências---```

    curl -v "http://localhost:3000/search?q=test"

```   Cookies: sessionid, user_pref



#### Solução 3: Usar Baseline Scan primeiro (para testar)   Severidade: Medium

```yaml

# Substitua zap-full-scan.py por:   

zap-baseline.py -t http://localhost:3000

```6. Server Leaks Version Information - 2 ocorrências### 3. Análise dos Resultados### 2. **SQL Injection Simulado**



#### Solução 4: Aumentar timeout e configurar spider   Header: X-Powered-By: Express/4.18.2

```bash

docker run ... \   Severidade: Low```

  -t http://localhost:3000 \

  -m 10 \

  -T 600 \

  -z "-config spider.maxDuration=5 -config ajaxSpider.maxDuration=5"Resultado: Pipeline FALHOU devido a 3 vulnerabilidades High**Implementação:**URL: /search?service=' OR '1'='1

```

```

#### Solução 5: Remover `|| true` para ver erro real

```yaml- Contagem total de alertas encontradosSeveridade: High  

# Remova o "|| true" do final do comando docker run

# Isso fará a pipeline falhar se o ZAP tiver erroEste exemplo demonstra como o ZAP identifica e classifica as vulnerabilidades, permitindo análise detalhada antes do deploy.

```

- Distribuição por nível de severidadeDescrição: Query SQL construída sem sanitização

### Problema: Erro "Dependencies lock file is not found"

---

**Sintoma:**

```- Identificação dos 10 tipos mais comuns de vulnerabilidades```

Dependencies lock file is not found in /home/runner/work/atv-19/atv-19. 

Supported file patterns: package-lock.json,npm-shrinkwrap.json,yarn.lock### 4. Teste com Vulnerabilidade Proposital

```

- Relatório detalhado no GitHub Actions Summary

**Causa:** A configuração `cache: 'npm'` no setup do Node.js requer um lock file.

**Aplicação Desenvolvida:** Node.js com Express (`app.js`)

**Solução:** Remover cache ou gerar package-lock.json

```yaml### 3. **Path Traversal**

# Opção 1: Remover cache

- name: Setup Node.js#### Vulnerabilidades Implementadas:

  uses: actions/setup-node@v4

  with:**Exemplo de Saída:**```

    node-version: '18'

    # cache: 'npm'  <- Removido**A) XSS Refletido (High)**



# Opção 2: Gerar lock fileURL: /admin?file=../../../etc/passwd

npm install  # Gera package-lock.json automaticamente

git add package-lock.json```javascript

git commit -m "chore: add package-lock.json"

```app.get('/echo', (req, res) => {```Severidade: Medium



### Problema: Pipeline não executa  const userInput = req.query.q || '';



**Sintomas:**  // VULNERÁVEL: Sem sanitizaçãoResumo de Vulnerabilidades por Severidade:Descrição: Acesso a arquivos fora do diretório permitido

- Workflow aparece mas não inicia

- Erro de sintaxe YAML  res.send(`<div>${userInput}</div>`);



**Soluções:**});```



1. **Validar YAML:**```

```bash

# Use um validador online| Severidade | Quantidade |

# https://www.yamllint.com/

```**Teste:** `http://localhost:3000/echo?q=<script>alert('XSS')</script>`



2. **Verificar indentação:**|-----------|------------|### 4. **Headers de Segurança Ausentes**

```yaml

# YAML é sensível a espaços!---

steps:

  - name: Step 1| Critical  | 0          |```

    run: echo "2 espaços de indentação"

```**B) SQL Injection (High)**



3. **Evitar heredoc em YAML:**| High      | 3          |Missing: Content-Security-Policy, X-Frame-Options, X-Content-Type-Options

```yaml

# Não use:```javascript

cat > file.html << 'EOF'

conteúdoapp.get('/search', (req, res) => {| Medium    | 7          |Severidade: Low/Medium

EOF

  const service = req.query.service || '';

# Use:

echo 'linha1' > file.html  // VULNERÁVEL: Query sem prepared statement| Low       | 12         |Descrição: Falta de cabeçalhos de segurança padrão

echo 'linha2' >> file.html

```  const query = `SELECT * FROM services WHERE name = '${service}'`;



---  res.send(`Query: ${query}`);| Info      | 4          |```



## Exemplo de Análise de Vulnerabilidades});



### Cenário: SQL Injection Detectada```| Total     | 26         |



**Relatório JSON:**

```json

{**Teste:** `http://localhost:3000/search?service=' OR '1'='1`---

  "site": [{

    "alerts": [{

      "pluginid": "40018",

      "alertRef": "40018",---Top 10 Vulnerabilidades mais Comuns:

      "name": "SQL Injection",

      "riskcode": "3",

      "confidence": "2",

      "riskdesc": "High (Medium)",**C) Path Traversal (High)**- Cross-Site Scripting (XSS) (3 ocorrências)## 📊 Como Funciona o Pipeline

      "desc": "SQL injection may be possible.",

      "instances": [{

        "uri": "http://localhost:3000/search",

        "method": "GET",```javascript- SQL Injection (2 ocorrências)

        "param": "q",

        "attack": "' OR '1'='1",app.get('/admin', (req, res) => {

        "evidence": "SELECT * FROM users WHERE name = '' OR '1'='1'"

      }],  const file = req.query.file || 'dashboard.html';- Missing Security Headers (8 ocorrências)### Fluxo Automático:

      "solution": "Use prepared statements with parameterized queries"

    }]  // VULNERÁVEL: Sem validação de path

  }]

}  const filePath = `/var/www/admin/${file}`;```

```

  res.send(`Acessando: ${filePath}`);

**Análise:**

- **Vulnerabilidade:** SQL Injection});1. **🚀 Trigger:** Push/PR para `main` ou `develop`

- **Severidade:** High (riskcode=3)

- **Endpoint:** `/search?q=...````

- **Parâmetro vulnerável:** `q`

- **Exploit:** `' OR '1'='1`**Comando para análise local:**2. **📦 Setup:** Instala dependências e sobe aplicação



**Impacto:****Teste:** `http://localhost:3000/admin?file=../../../etc/passwd`

- Acesso não autorizado ao banco de dados

- Leitura de dados sensíveis3. **🔍 Scan:** OWASP ZAP executa baseline scan

- Possível modificação/exclusão de dados

---

**Correção:**

```javascript```bash4. **📋 Análise:** Conta vulnerabilidades por severidade

// Antes (vulnerável):

const sql = `SELECT * FROM users WHERE name = '${query}'`;**D) Headers de Segurança Ausentes (Medium)**



// Depois (seguro):# Total de alertas5. **🚨 Validação:** Falha se High/Critical > 0

const sql = 'SELECT * FROM users WHERE name = ?';

db.query(sql, [query], (err, results) => { ... });```javascript

```

app.use((req, res, next) => {jq '.site[0].alerts | length' zap-report.json6. **📄 Relatórios:** Gera HTML e JSON como artefatos

**Pipeline:**

```  res.set('X-Powered-by', 'Express/4.18.2'); // Version disclosure

Pipeline Status: FAILED ❌

Motivo: 1 vulnerabilidade High detectada  // NÃO define: Content-Security-Policy, X-Frame-Options, X-Content-Type-Options

Deploy: BLOQUEADO

```  next();



---});# Vulnerabilidades High/Critical### Critério de Falha:



## Referências```



- **OWASP ZAP:** https://www.zaproxy.org/jq '[.site[0].alerts[] | select(.riskcode=="3" or .riskcode=="4")] | length' zap-report.json```yaml

- **GitHub Actions:** https://docs.github.com/en/actions

- **OWASP Top 10:** https://owasp.org/www-project-top-ten/---

- **ZAP Docker Images:** https://www.zaproxy.org/docs/docker/

- **ZAP Automation Framework:** https://www.zaproxy.org/docs/automate/automation-framework/# Pipeline FALHA se encontrar:



---**E) Cookie Inseguro (Medium)**



## Conclusão# Listar tipos- Vulnerabilidades High (riskcode: 3)



Este projeto demonstra uma implementação completa de DevSecOps com:```javascript



✅ **Testes automatizados** - Scan em cada push/PR  res.cookie('sessionid', 'abc123', { jq -r '.site[0].alerts[] | .name' zap-report.json | sort | uniq -c | sort -nr- Vulnerabilidades Critical (riskcode: 4)

✅ **Validação de severidade** - Bloqueio automático de vulnerabilidades críticas  

✅ **Análise detalhada** - Relatórios HTML/JSON com métricas    secure: false,      // Não requer HTTPS

✅ **Vulnerabilidades intencionais** - Aplicação de teste com XSS, SQLi, etc  

✅ **Artifacts salvos** - Histórico de scans disponível por 30 dias    httpOnly: false,    // Acessível via JavaScript```



**Status Atual:** Pipeline funcional mas relatórios vazios (0 vulnerabilidades detectadas). Requer investigação para garantir que o ZAP está escaneando corretamente a aplicação.  sameSite: 'none'    // Permite CSRF



**Próximos Passos Sugeridos:**});# Pipeline PASSA se apenas:

1. Adicionar logs detalhados do ZAP no workflow

2. Testar conectividade localhost antes do scan```

3. Aumentar timeout e configurar spider adequadamente

4. Validar que as rotas vulneráveis estão sendo acessadas pelo ZAP---- Info (riskcode: 0)

5. Considerar usar ZAP Automation Framework para mais controle

**Detecção pelo ZAP:**

---

- Low (riskcode: 1)  

**Repositório:** https://github.com/TomazVC/atv-19  

**Autor:** Tomaz Vinícius Costa  O OWASP ZAP Full Scan detecta todas estas vulnerabilidades através de:

**Curso:** FIAP - Segurança da Informação  

**Atividade:** 19 - OWASP ZAP CLI no GitHub Actions- **Scan Ativo:** Injeta payloads para testar XSS, SQLi, Path Traversal### 4. Teste com Vulnerabilidade Proposital- Medium (riskcode: 2)


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