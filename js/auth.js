/* ================================================
   The Cupons — Sistema de Autenticação (localStorage)
   Gerencia usuários, login/logout, e compras
   ================================================ */

// Dados iniciais do admin
const ADMIN_CREDENTIALS = {
    email: 'admin@thecupons.com.br',
    senha: 'admin123',
    nome: 'Gestor The Cupons'
};

// Inicializa dados mock no localStorage (roda 1 vez)
function initAuthData() {
    // Cria clientes mock se não existirem
    if (!localStorage.getItem('tc_clientes')) {
        const clientesMock = [
            {
                id: 1,
                nome: 'João da Silva',
                email: 'joao@email.com',
                senha: '123456',
                telefone: '(99) 98765-4321',
                cpf: '123.456.789-00',
                cidade: 'Caxias-MA',
                dataCadastro: '2026-02-15'
            },
            {
                id: 2,
                nome: 'Maria Oliveira',
                email: 'maria@email.com',
                senha: '123456',
                telefone: '(86) 99876-5432',
                cpf: '987.654.321-00',
                cidade: 'Teresina-PI',
                dataCadastro: '2026-02-20'
            },
            {
                id: 3,
                nome: 'Carlos Santos',
                email: 'carlos@email.com',
                senha: '123456',
                telefone: '(99) 91234-5678',
                cpf: '456.789.123-00',
                cidade: 'Caxias-MA',
                dataCadastro: '2026-03-01'
            }
        ];
        localStorage.setItem('tc_clientes', JSON.stringify(clientesMock));
    }

    // Cria compras mock se não existirem
    if (!localStorage.getItem('tc_compras')) {
        const comprasMock = [
            {
                id: 1,
                clienteId: 1,
                cupomId: 1,
                codigo: 'A7X9-B2M1',
                dataCompra: '2026-03-02',
                validade: '2026-04-01',
                status: 'ativo',
                valorPago: 'R$ 39,90'
            },
            {
                id: 2,
                clienteId: 1,
                cupomId: 5,
                codigo: 'X9P2-L0K8',
                dataCompra: '2026-02-20',
                validade: '2026-03-22',
                status: 'utilizado',
                valorPago: 'R$ 45,00'
            },
            {
                id: 3,
                clienteId: 2,
                cupomId: 3,
                codigo: 'M4N7-Q3R5',
                dataCompra: '2026-03-04',
                validade: '2026-04-03',
                status: 'ativo',
                valorPago: 'R$ 129,90'
            },
            {
                id: 4,
                clienteId: 2,
                cupomId: 4,
                codigo: 'T8W2-K1V6',
                dataCompra: '2026-03-05',
                validade: '2026-04-04',
                status: 'ativo',
                valorPago: 'R$ 59,90'
            },
            {
                id: 5,
                clienteId: 3,
                cupomId: 2,
                codigo: 'H5J3-P9D4',
                dataCompra: '2026-03-01',
                validade: '2026-03-31',
                status: 'expirado',
                valorPago: 'R$ 199,90'
            }
        ];
        localStorage.setItem('tc_compras', JSON.stringify(comprasMock));
    }
}

// Login
function loginUser(email, senha) {
    // Verifica admin
    if (email === ADMIN_CREDENTIALS.email && senha === ADMIN_CREDENTIALS.senha) {
        localStorage.setItem('tc_session', JSON.stringify({
            tipo: 'admin',
            nome: ADMIN_CREDENTIALS.nome,
            email: ADMIN_CREDENTIALS.email
        }));
        return { success: true, tipo: 'admin' };
    }

    // Verifica clientes
    const clientes = JSON.parse(localStorage.getItem('tc_clientes') || '[]');
    const cliente = clientes.find(c => c.email === email && c.senha === senha);
    if (cliente) {
        localStorage.setItem('tc_session', JSON.stringify({
            tipo: 'cliente',
            id: cliente.id,
            nome: cliente.nome,
            email: cliente.email,
            cidade: cliente.cidade
        }));
        return { success: true, tipo: 'cliente' };
    }

    return { success: false };
}

// Cadastro de cliente
function registerUser(dados) {
    const clientes = JSON.parse(localStorage.getItem('tc_clientes') || '[]');
    
    // Verifica email duplicado
    if (clientes.find(c => c.email === dados.email)) {
        return { success: false, msg: 'Este e-mail já está cadastrado.' };
    }

    // Verifica indicação
    const ref = localStorage.getItem('tc_ref');
    if (ref) {
        const referrer = clientes.find(c => c.id === parseInt(ref));
        if (referrer) {
            referrer.saldoBonus = (referrer.saldoBonus || 0) + 5;
        }
        localStorage.removeItem('tc_ref');
    }

    const novoCliente = {
        id: clientes.length > 0 ? Math.max(...clientes.map(c => c.id)) + 1 : 1,
        nome: dados.nome,
        email: dados.email,
        senha: dados.senha,
        telefone: dados.telefone || '',
        cpf: dados.cpf || '',
        cidade: dados.cidade || 'Caxias-MA',
        tipo: dados.tipo || 'consumidor',
        cnpj: dados.cnpj || '',
        saldoBonus: 0,
        dataCadastro: new Date().toISOString().split('T')[0]
    };

    clientes.push(novoCliente);
    localStorage.setItem('tc_clientes', JSON.stringify(clientes));

    // Loga automaticamente
    localStorage.setItem('tc_session', JSON.stringify({
        tipo: 'cliente',
        id: novoCliente.id,
        nome: novoCliente.nome,
        email: novoCliente.email,
        cidade: novoCliente.cidade,
        tipo: novoCliente.tipo
    }));

    return { success: true };
}

// Logout
function logoutUser() {
    localStorage.removeItem('tc_session');
    window.location.href = 'index.html';
}

// Retorna sessão atual
function getSession() {
    const session = localStorage.getItem('tc_session');
    return session ? JSON.parse(session) : null;
}

// Retorna todos os clientes
function getClientes() {
    return JSON.parse(localStorage.getItem('tc_clientes') || '[]');
}

// Retorna todas as compras
function getCompras() {
    return JSON.parse(localStorage.getItem('tc_compras') || '[]');
}

// Retorna compras de um cliente
function getComprasDoCliente(clienteId) {
    return getCompras().filter(c => c.clienteId === clienteId);
}

// Registra uma nova compra
function registrarCompra(clienteId, cupomId, valorPago) {
    const compras = getCompras();
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
        if (i === 4) code += '-';
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    const hoje = new Date();
    const validade = new Date(hoje);
    validade.setDate(validade.getDate() + 30);

    const novaCompra = {
        id: compras.length > 0 ? Math.max(...compras.map(c => c.id)) + 1 : 1,
        clienteId,
        cupomId,
        codigo: code,
        dataCompra: hoje.toISOString().split('T')[0],
        validade: validade.toISOString().split('T')[0],
        status: 'ativo',
        valorPago
    };

    compras.push(novaCompra);
    localStorage.setItem('tc_compras', JSON.stringify(compras));
    return novaCompra;
}

// =========================================
// Admin: CRUD de Clientes
// =========================================
function getClienteById(id) {
    return getClientes().find(c => c.id === id);
}

function salvarCliente(dados) {
    const clientes = getClientes();

    if (dados.id) {
        // Editar existente
        const idx = clientes.findIndex(c => c.id === dados.id);
        if (idx !== -1) {
            // Verifica email duplicado (exceto o próprio)
            const dup = clientes.find(c => c.email === dados.email && c.id !== dados.id);
            if (dup) return { success: false, msg: 'E-mail já cadastrado por outro cliente.' };
            clientes[idx] = { ...clientes[idx], ...dados };
        }
    } else {
        // Novo cliente
        if (clientes.find(c => c.email === dados.email)) {
            return { success: false, msg: 'E-mail já cadastrado.' };
        }
        dados.id = clientes.length > 0 ? Math.max(...clientes.map(c => c.id)) + 1 : 1;
        dados.dataCadastro = new Date().toISOString().split('T')[0];
        if (!dados.senha) dados.senha = '123456'; // senha padrão
        clientes.push(dados);
    }

    localStorage.setItem('tc_clientes', JSON.stringify(clientes));
    return { success: true };
}

function excluirCliente(id) {
    let clientes = getClientes();
    clientes = clientes.filter(c => c.id !== id);
    localStorage.setItem('tc_clientes', JSON.stringify(clientes));
}

// Inicializa ao carregar
initAuthData();
