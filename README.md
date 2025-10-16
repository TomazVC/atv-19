# ClickSeguro — Testes de Segurança Automatizados (OWASP ZAP)

Pipeline de segurança com **OWASP ZAP** integrado ao **GitHub Actions** para detectar vulnerabilidades antes do deploy e **bloquear** pipelines com falhas de severidade **High** ou **Critical**.

## Contexto

* **Aplicação:** ClickSeguro (Node.js/Express) com rotas intencionalmente vulneráveis para fins didáticos.
* **Problema:** Vulnerabilidades chegavam à produção.
* **Solução:** Scan automatizado em cada push/PR + política de falha por severidade.

## Estrutura do Repositório

```
atv-19/
├─ .github/workflows/
│  └─ zap-ci.yml        # Pipeline OWASP ZAP (Full Scan)
├─ app.js               # App de exemplo (vulnerável)
├─ package.json
├─ Dockerfile
├─ .zapbaseline         # Regras/ignores (opcional)
└─ README.md
```

## Como funciona

1. **Trigger:** push/PR para `main` e `develop`.
2. **Start da aplicação:** sobe em `http://localhost:3000`.
3. **ZAP Full Scan:** executa varredura ativa + passiva.
4. **Validação:** falha o job se houver `High` ou `Critical`.
5. **Artifacts:** relatórios em HTML/JSON anexados ao workflow.

### Trecho essencial do workflow (`.github/workflows/zap-ci.yml`)

```yaml
name: OWASP ZAP Security Scan - ClickSeguro

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]
  workflow_dispatch:

jobs:
  zap:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'

      - name: Install deps & start app
        run: |
          npm ci || npm i
          nohup npm start &>/dev/null &

      - name: Health check
        run: |
          for i in {1..60}; do
            curl -fsS http://localhost:3000/health && exit 0 || sleep 1
          done
          echo "App não respondeu a tempo"; exit 1

      - name: OWASP ZAP Full Scan
        uses: zaproxy/action-full-scan@v0.11.0
        with:
          target: 'http://localhost:3000'
          cmd_options: '-a -j -m 5 -J zap-report.json -r zap-report.html'

      - name: Fail on High/Critical
        if: always()
        run: |
          HIGH=$(jq '[.site[0].alerts[] | select(.riskcode=="3")] | length' zap-report.json)
          CRIT=$(jq '[.site[0].alerts[] | select(.riskcode=="4")] | length' zap-report.json)
          echo "High=${HIGH} Critical=${CRIT}"
          if [ "$HIGH" -gt 0 ] || [ "$CRIT" -gt 0 ]; then
            echo "Vulnerabilidades High/Critical detectadas"; exit 1
          fi

      - name: Upload reports
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: zap-report-clickseguro
          path: |
            zap-report.html
            zap-report.json
          retention-days: 30
```

## Como executar localmente (opcional)

```bash
git clone https://github.com/TomazVC/atv-19.git
cd atv-19
npm ci || npm i
npm start
# Em outro terminal (Docker):
docker run --rm --network="host" -v "$PWD:/zap/wrk" ghcr.io/zaproxy/zaproxy:stable \
  zap-full-scan.py -t http://localhost:3000 -r local-zap-report.html -J local-zap-report.json -a -j -m 5
```

## Artifacts (relatórios)

1. Abra **Actions** no GitHub do repositório.
2. Entre na execução do workflow.
3. Vá até o final da página e baixe **zap-report-clickseguro**.
4. Abra `zap-report.html` (visual) e/ou `zap-report.json` (dados).

## Troubleshooting rápido

* **Relatório vazio / 0 alertas:** aumente tempo do scan (`-m`, `-T`), valide saúde da app e remova `|| true` caso exista.
* **“Docker não encontrado” (Windows):** instale Docker Desktop e habilite WSL2.
* **Artifacts não visíveis:** role até o rodapé da página do workflow.

## Aviso

Aplicação vulnerável por design, para estudo. Não usar em produção.

## Time

- **Pedro Oliveira Valotto** — RM 551445
- **Rony Ken Nagai** — RM 551549
- **Tomáz Versolato Carballo** — RM 551417