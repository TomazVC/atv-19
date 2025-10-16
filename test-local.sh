#!/bin/bash

# Script para rodar OWASP ZAP localmente no Windows/Linux/Mac
# Útil para testar antes de fazer push

echo "🛡️  OWASP ZAP - Teste Local ClickSeguro"
echo "================================"

# Verifica se Docker está instalado
if ! command -v docker &> /dev/null; then
    echo "❌ Docker não encontrado. Instale o Docker Desktop primeiro."
    exit 1
fi

# Inicia aplicação ClickSeguro
echo "🚀 Iniciando aplicação ClickSeguro..."
npm start &
APP_PID=$!

# Aguarda aplicação subir
echo "⏳ Aguardando aplicação responder..."
sleep 5

# Verifica se está respondendo
for i in {1..30}; do
    if curl -fs http://localhost:3000/health > /dev/null 2>&1; then
        echo "✅ Aplicação ativa!"
        break
    fi
    if [ $i -eq 30 ]; then
        echo "❌ Aplicação não respondeu. Verifique se npm start funcionou."
        kill $APP_PID 2>/dev/null
        exit 1
    fi
    sleep 1
done

# Executa ZAP scan
echo "🔍 Executando OWASP ZAP scan..."
docker run --rm -t \
    -v "$PWD:/zap/wrk" \
    owasp/zap2docker-stable zap-baseline.py \
    -t http://host.docker.internal:3000 \
    -r local-zap-report.html \
    -J local-zap-report.json \
    -a -m 3

# Para aplicação
echo "🛑 Finalizando aplicação..."
kill $APP_PID 2>/dev/null

# Analisa resultados (se jq estiver disponível)
if command -v jq &> /dev/null; then
    echo ""
    echo "📊 Resumo dos Resultados:"
    echo "========================"
    
    if [ -f "local-zap-report.json" ]; then
        total=$(jq '.site[0].alerts | length' local-zap-report.json)
        high=$(jq '[.site[0].alerts[] | select(.riskcode=="3")] | length' local-zap-report.json)
        critical=$(jq '[.site[0].alerts[] | select(.riskcode=="4")] | length' local-zap-report.json)
        
        echo "Total de alertas: $total"
        echo "High: $high"
        echo "Critical: $critical"
        
        if [ "$high" -gt 0 ] || [ "$critical" -gt 0 ]; then
            echo ""
            echo "❌ Pipeline iria FALHAR - vulnerabilidades High/Critical detectadas!"
        else
            echo ""
            echo "✅ Pipeline iria PASSAR - nenhuma vulnerabilidade crítica."
        fi
    fi
fi

echo ""
echo "📄 Relatórios gerados:"
echo "- local-zap-report.html (abra no navegador)"
echo "- local-zap-report.json (dados estruturados)"
echo ""
echo "🎯 Teste concluído!"