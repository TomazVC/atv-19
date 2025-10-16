const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware básico
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// VULNERABILIDADE: Desabilita proteções de segurança
app.disable('x-powered-by');
app.use((req, res, next) => {
  // Adiciona headers vulneráveis propositalmente
  res.set('X-Powered-by', 'Express/4.18.2'); // Version disclosure
  // Não define: Content-Security-Policy, X-Frame-Options, X-Content-Type-Options
  next();
});

// ========================================
// ROTAS SEGURAS
// ========================================

// Página inicial
app.get('/', (req, res) => {
  // VULNERABILIDADE: Cookie inseguro
  res.cookie('sessionid', 'abc123', { 
    secure: false,  // Não requer HTTPS
    httpOnly: false, // Acessível via JavaScript
    sameSite: 'none' // Permite CSRF
  });
  
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>ClickSeguro - Agendamento de Serviços</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 40px; background: #f5f5f5; }
            .container { max-width: 800px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; }
            .header { color: #2c3e50; border-bottom: 3px solid #3498db; padding-bottom: 10px; }
            .nav { margin: 20px 0; }
            .nav a { margin-right: 20px; color: #3498db; text-decoration: none; }
            .nav a:hover { text-decoration: underline; }
            .warning { background: #ffe6e6; border-left: 4px solid #e74c3c; padding: 10px; margin: 20px 0; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1 class="header">🏠 ClickSeguro</h1>
            <p>Plataforma web para agendamento de serviços residenciais</p>
            
            <div class="nav">
                <a href="/login">🔐 Login</a>
                <a href="/search">🔍 Buscar Serviços</a>
                <a href="/echo">💬 Echo Test</a>
                <a href="/admin">⚙️ Admin (vulnerável)</a>
            </div>

            <div class="warning">
                <strong>⚠️ AVISO:</strong> Esta aplicação contém vulnerabilidades intencionais para fins educacionais e teste do OWASP ZAP.
                <br><strong>NÃO USE EM PRODUÇÃO!</strong>
            </div>

            <h2>🎯 Vulnerabilidades Implementadas:</h2>
            <ul>
                <li><strong>XSS Refletido:</strong> <code>/echo?q=&lt;script&gt;alert('XSS')&lt;/script&gt;</code></li>
                <li><strong>SQL Injection:</strong> <code>/search?service=' OR '1'='1</code></li>
                <li><strong>Path Traversal:</strong> <code>/admin?file=../../../etc/passwd</code></li>
                <li><strong>Headers inseguros:</strong> Falta de Content-Security-Policy, X-Frame-Options, etc.</li>
            </ul>
        </div>
    </body>
    </html>
  `);
});

// ========================================
// ROTAS VULNERÁVEIS (PARA TESTE)
// ========================================

// VULNERABILIDADE 1: XSS Refletido
app.get('/echo', (req, res) => {
  const userInput = req.query.q || '';
  
  // 🚨 VULNERÁVEL: Sem sanitização/escape -> XSS refletido
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Echo Test - ClickSeguro</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 40px; background: #f5f5f5; }
            .container { max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; }
            .danger { background: #ffe6e6; border: 2px solid #e74c3c; padding: 15px; border-radius: 5px; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>💬 Echo Test</h1>
            <div class="danger">
                <h2>🚨 VULNERÁVEL: XSS Refletido</h2>
                <p><strong>Você digitou:</strong></p>
                <div style="border: 1px solid #ccc; padding: 10px; background: #f9f9f9;">
                    ${userInput}
                </div>
            </div>
            
            <p><strong>Teste XSS:</strong> <code>/echo?q=&lt;script&gt;alert('XSS Detectado!')&lt;/script&gt;</code></p>
            <p><a href="/">← Voltar</a></p>
        </div>
    </body>
    </html>
  `);
});

// VULNERABILIDADE 2: SQL Injection simulado
app.get('/search', (req, res) => {
  const service = req.query.service || '';
  
  // 🚨 VULNERÁVEL: SQL Injection simulado (sem banco real, mas estrutura vulnerável)
  const vulnerableQuery = `SELECT * FROM services WHERE name = '${service}'`;
  
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Buscar Serviços - ClickSeguro</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 40px; background: #f5f5f5; }
            .container { max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; }
            .danger { background: #ffe6e6; border: 2px solid #e74c3c; padding: 15px; border-radius: 5px; }
            .query { background: #333; color: #fff; padding: 10px; font-family: monospace; border-radius: 3px; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🔍 Buscar Serviços</h1>
            
            <form method="GET">
                <input type="text" name="service" placeholder="Digite o serviço..." value="${service}" style="width: 300px; padding: 8px;">
                <button type="submit">Buscar</button>
            </form>
            
            ${service ? `
                <div class="danger">
                    <h2>🚨 VULNERÁVEL: SQL Injection</h2>
                    <p><strong>Query executada:</strong></p>
                    <div class="query">${vulnerableQuery}</div>
                    <p><strong>Teste SQLi:</strong> <code>' OR '1'='1</code></p>
                </div>
            ` : ''}
            
            <p><a href="/">← Voltar</a></p>
        </div>
    </body>
    </html>
  `);
});

// VULNERABILIDADE 3: Path Traversal simulado
app.get('/admin', (req, res) => {
  const file = req.query.file || 'dashboard.html';
  
  // 🚨 VULNERÁVEL: Path Traversal (sem validação de caminho)
  const filePath = `/var/www/admin/${file}`;
  
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Admin Panel - ClickSeguro</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 40px; background: #f5f5f5; }
            .container { max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; }
            .danger { background: #ffe6e6; border: 2px solid #e74c3c; padding: 15px; border-radius: 5px; }
            .path { background: #333; color: #fff; padding: 10px; font-family: monospace; border-radius: 3px; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>⚙️ Admin Panel</h1>
            
            <div class="danger">
                <h2>🚨 VULNERÁVEL: Path Traversal</h2>
                <p><strong>Tentando acessar arquivo:</strong></p>
                <div class="path">${filePath}</div>
                <p><strong>Teste Path Traversal:</strong> <code>/admin?file=../../../etc/passwd</code></p>
            </div>
            
            <p><strong>Arquivos disponíveis:</strong></p>
            <ul>
                <li><a href="/admin?file=dashboard.html">dashboard.html</a></li>
                <li><a href="/admin?file=../../../etc/passwd">../../../etc/passwd (vulnerável)</a></li>
                <li><a href="/admin?file=../../../windows/system32/drivers/etc/hosts">../../../windows/system32/drivers/etc/hosts</a></li>
            </ul>
            
            <p><a href="/">← Voltar</a></p>
        </div>
    </body>
    </html>
  `);
});

// Login form (básico, sem autenticação real)
app.get('/login', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Login - ClickSeguro</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 40px; background: #f5f5f5; }
            .container { max-width: 400px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; }
            .form-group { margin: 15px 0; }
            input[type="text"], input[type="password"] { width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 3px; }
            button { background: #3498db; color: white; padding: 10px 20px; border: none; border-radius: 3px; cursor: pointer; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🔐 Login</h1>
            <form method="POST" action="/login">
                <div class="form-group">
                    <label>Usuário:</label>
                    <input type="text" name="username" required>
                </div>
                <div class="form-group">
                    <label>Senha:</label>
                    <input type="password" name="password" required>
                </div>
                <button type="submit">Entrar</button>
            </form>
            <p><a href="/">← Voltar</a></p>
        </div>
    </body>
    </html>
  `);
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  // Simula login (sempre falha para demonstração)
  res.send(`
    <h1>Login Falhou</h1>
    <p>Usuário: ${username}</p>
    <p>Esta é apenas uma demonstração - login sempre falha.</p>
    <p><a href="/login">← Tentar novamente</a></p>
  `);
});

// ========================================
// CONFIGURAÇÕES INSEGURAS DE HEADERS
// ========================================

// 🚨 VULNERÁVEL: Headers de segurança ausentes
// Não estamos definindo: CSP, X-Frame-Options, X-Content-Type-Options, etc.

// Health check para o GitHub Actions
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`🚀 ClickSeguro rodando em http://localhost:${PORT}`);
  console.log(`⚠️  APLICAÇÃO VULNERÁVEL - APENAS PARA TESTES!`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
});

module.exports = app;