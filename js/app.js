// ================================================
// The Cupons — App Core
// Cupons são gerenciados via localStorage (CRUD pelo admin)
// ================================================

// Dados iniciais (seed) — só populam se localStorage estiver vazio
const DEFAULT_CUPONS = [
    {
        id: 1,
        cidade: 'Caxias-MA',
        parceiro: 'Burguer King Caxias',
        titulo: '2 Whopper + Batata Grande',
        precoAntigo: 'R$ 69,90',
        precoNovo: 'R$ 39,90',
        desconto: '43% OFF',
        imagem: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=60',
        categoria: 'Restaurantes',
        ativo: true,
        estoque: 15,
        vendidos: 11,
        expiraEm: getFutureDate(2),
        descricao: '<p>Aproveite esta oferta incrível do <strong>Burguer King Caxias</strong>! Você receberá:</p><ul><li>✅ 2 sanduíches Whopper tradicionais</li><li>✅ 1 Batata Grande para compartilhar</li><li>✅ Válido para consumo no local ou retirada</li></ul><p>O Burguer King Caxias fica localizado na Av. Principal, Centro, com estacionamento amplo e ambiente climatizado.</p>',
        regulamento: '<ul><li><strong>Compre e agende;</strong></li><li>Oferta dá direito a: 2 Whopper + 1 Batata Grande;</li><li>Até 3 cupons por CPF. Pode ser presenteado;</li><li>Período para utilização: Até 30 dias após a compra;</li><li>Dias e horários de atendimento: Segunda a Domingo, das 11h às 22h;</li><li><strong>Obrigatória a apresentação do cupom;</strong></li><li>Cupons não serão utilizados após período de validade;</li><li>Não cumulativo com outras promoções;</li><li>Dúvidas? Entre em contato pelo <a href="#">WhatsApp</a>;</li></ul>'
    },
    {
        id: 2,
        cidade: 'Caxias-MA',
        parceiro: 'Clínica Sorriso',
        titulo: 'Clareamento Dental a Laser',
        precoAntigo: 'R$ 450,00',
        precoNovo: 'R$ 199,90',
        desconto: '55% OFF',
        imagem: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=500&q=60',
        categoria: 'Beleza e Saúde',
        ativo: true,
        estoque: 8,
        vendidos: 5,
        expiraEm: getFutureDate(1),
        descricao: '<p>Transforme seu sorriso na <strong>Clínica Sorriso</strong>! O clareamento dental a laser é um procedimento rápido e seguro.</p><ul><li>✅ Sessão completa de clareamento a laser</li><li>✅ Avaliação prévia inclusa</li><li>✅ Profissionais especializados</li><li>✅ Resultados visíveis na primeira sessão</li></ul>',
        regulamento: '<ul><li><strong>Compre e agende;</strong></li><li>Oferta inclui: 1 sessão de Clareamento Dental a Laser;</li><li>Até 2 cupons por CPF;</li><li>Período para utilização: Até 60 dias após a compra;</li><li>Horários: Segunda a Sexta, das 8h às 18h;</li><li><strong>Obrigatória a apresentação do cupom;</strong></li><li>Não cumulativo com outras promoções;</li></ul>'
    },
    {
        id: 3,
        cidade: 'Teresina-PI',
        parceiro: 'Restaurante Coco Bambu',
        titulo: 'Camarão Internacional p/ 2',
        precoAntigo: 'R$ 180,00',
        precoNovo: 'R$ 129,90',
        desconto: '28% OFF',
        imagem: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=500&q=60',
        categoria: 'Restaurantes',
        ativo: true,
        estoque: 20,
        vendidos: 14,
        expiraEm: getFutureDate(3),
        descricao: '<p>Uma experiência gastronômica incrível no <strong>Coco Bambu</strong>! O prato Camarão Internacional para 2 pessoas inclui:</p><ul><li>✅ Camarão empanado com molho especial</li><li>✅ Acompanhamento de arroz e batata</li><li>✅ Ambiente climatizado e requintado</li></ul>',
        regulamento: '<ul><li><strong>Compre e agende;</strong></li><li>Oferta para: Camarão Internacional para 2 pessoas;</li><li>Até 5 cupons por CPF. Pode ser presenteado;</li><li>Período para utilização: Até 30 dias;</li><li>Reservas com antecedência de 24h;</li><li><strong>Obrigatória a apresentação do cupom;</strong></li><li>Não cumulativo com outras promoções;</li></ul>'
    },
    {
        id: 4,
        cidade: 'Teresina-PI',
        parceiro: 'Academia SmartFit',
        titulo: '1 Mês de Plano Black',
        precoAntigo: 'R$ 119,90',
        precoNovo: 'R$ 59,90',
        desconto: '50% OFF',
        imagem: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=500&q=60',
        categoria: 'Academia',
        ativo: true,
        estoque: 30,
        vendidos: 22,
        expiraEm: getFutureDate(5),
        descricao: '<p>Treine com o melhor plano da <strong>SmartFit</strong>!</p><ul><li>✅ Acesso a todas as unidades da cidade</li><li>✅ Plano Black com aulas incluídas</li><li>✅ Área de musculação e cardio completa</li></ul>',
        regulamento: '<ul><li><strong>Compre e ative;</strong></li><li>1 mês de Plano Black SmartFit;</li><li>1 cupom por CPF;</li><li>Ativação em até 15 dias após compra;</li><li>Necessário documento com foto;</li><li>Não cumulativo com outras promoções;</li></ul>'
    },
    {
        id: 5,
        cidade: 'Caxias-MA',
        parceiro: 'Lava Jato Brilho',
        titulo: 'Lavagem Completa + Cera',
        precoAntigo: 'R$ 80,00',
        precoNovo: 'R$ 45,00',
        desconto: '44% OFF',
        imagem: 'https://images.unsplash.com/photo-1520334258752-1698a72b5fb1?auto=format&fit=crop&w=500&q=60',
        categoria: 'Serviços Automotivos',
        ativo: true,
        estoque: 10,
        vendidos: 8,
        expiraEm: getFutureDate(0, 6),
        descricao: '<p>Deixe seu carro brilhando no <strong>Lava Jato Brilho</strong>!</p><ul><li>✅ Lavagem externa completa</li><li>✅ Lavagem interna com aspirador</li><li>✅ Aplicação de cera protetora</li><li>✅ Limpeza de painel e vidros</li></ul>',
        regulamento: '<ul><li>Válido para veículos de passeio;</li><li>SUVs e caminhonetes podem ter acréscimo;</li><li>Até 2 cupons por CPF;</li><li>Válido por 30 dias;</li><li>Horário: Seg a Sáb, 8h às 17h;</li><li><strong>Obrigatória a apresentação do cupom;</strong></li></ul>'
    },
    {
        id: 6,
        cidade: 'Teresina-PI',
        parceiro: 'Barbearia VIP',
        titulo: 'Corte + Barba + Terapia',
        precoAntigo: 'R$ 90,00',
        precoNovo: 'R$ 49,90',
        desconto: '45% OFF',
        imagem: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=500&q=60',
        categoria: 'Beleza e Saúde',
        ativo: true,
        estoque: 12,
        vendidos: 10,
        expiraEm: getFutureDate(0, 3),
        descricao: '<p>Cuide de você na <strong>Barbearia VIP</strong>!</p><ul><li>✅ Corte masculino profissional</li><li>✅ Barba com toalha quente</li><li>✅ Terapia capilar relaxante</li><li>✅ Ambiente premium</li></ul>',
        regulamento: '<ul><li>1 combo por cupom;</li><li>Até 3 cupons por CPF;</li><li>Válido por 30 dias após a compra;</li><li>Agendamento obrigatório: (86) 99999-9999;</li><li>Horário: Seg a Sáb, 9h às 19h;</li><li><strong>Obrigatória a apresentação do cupom;</strong></li></ul>'
    }
];

// Helper: Gera data futura (dias + horas a partir de agora)
function getFutureDate(days, hours) {
    const d = new Date();
    d.setDate(d.getDate() + (days || 0));
    d.setHours(d.getHours() + (hours || 0));
    return d.toISOString();
}

// Inicializa cupons no localStorage
function initCuponsData() {
    if (!localStorage.getItem('tc_cupons')) {
        localStorage.setItem('tc_cupons', JSON.stringify(DEFAULT_CUPONS));
    } else {
        // Migra cupons antigos: adiciona campos de escassez se não existirem
        const cupons = JSON.parse(localStorage.getItem('tc_cupons'));
        let changed = false;
        cupons.forEach((c, i) => {
            if (c.estoque === undefined) {
                const def = DEFAULT_CUPONS.find(d => d.id === c.id);
                if (def) {
                    c.estoque = def.estoque;
                    c.vendidos = def.vendidos;
                    c.expiraEm = def.expiraEm;
                } else {
                    c.estoque = 20;
                    c.vendidos = 0;
                    c.expiraEm = getFutureDate(7);
                }
                changed = true;
            }
        });
        if (changed) localStorage.setItem('tc_cupons', JSON.stringify(cupons));
    }
}

// CRUD de Cupons
function getCupons() {
    return JSON.parse(localStorage.getItem('tc_cupons') || '[]');
}

function getCuponsAtivos() {
    return getCupons().filter(c => c.ativo !== false);
}

function getCupomById(id) {
    return getCupons().find(c => c.id === id);
}

function salvarCupom(cupom) {
    const cupons = getCupons();
    if (cupom.id) {
        const idx = cupons.findIndex(c => c.id === cupom.id);
        if (idx !== -1) {
            cupons[idx] = { ...cupons[idx], ...cupom };
        }
    } else {
        cupom.id = cupons.length > 0 ? Math.max(...cupons.map(c => c.id)) + 1 : 1;
        cupom.ativo = true;
        if (!cupom.vendidos) cupom.vendidos = 0;
        cupons.push(cupom);
    }
    localStorage.setItem('tc_cupons', JSON.stringify(cupons));
    return cupom;
}

function excluirCupom(id) {
    let cupons = getCupons();
    cupons = cupons.filter(c => c.id !== id);
    localStorage.setItem('tc_cupons', JSON.stringify(cupons));
}

function toggleCupomAtivo(id) {
    const cupons = getCupons();
    const cupom = cupons.find(c => c.id === id);
    if (cupom) {
        cupom.ativo = !cupom.ativo;
        localStorage.setItem('tc_cupons', JSON.stringify(cupons));
    }
}

// Compatibilidade
let cuponsData = [];
function refreshCuponsData() {
    cuponsData = getCupons();
}

// Inicializa
initCuponsData();
refreshCuponsData();

// =========================================
// BANNER MANAGEMENT
// =========================================
const DEFAULT_BANNERS = [
    {
        id: 1,
        imagem: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
        titulo: 'Até 50% OFF em Restaurantes',
        subtitulo: 'Aproveite as melhores ofertas da cidade com descontos exclusivos.',
        textoBotao: 'Ver Ofertas',
        linkBotao: '#',
        ativo: true
    },
    {
        id: 2,
        imagem: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80',
        titulo: 'Cuide de você pagando menos',
        subtitulo: 'Clínicas, salões e barbearias com até 60% de desconto.',
        textoBotao: 'Ver Categoria',
        linkBotao: '#',
        ativo: true
    }
];

function initBannersData() {
    if (!localStorage.getItem('tc_banners')) {
        localStorage.setItem('tc_banners', JSON.stringify(DEFAULT_BANNERS));
    }
}
function getBanners() {
    return JSON.parse(localStorage.getItem('tc_banners') || '[]');
}
function getBannersAtivos() {
    return getBanners().filter(b => b.ativo !== false);
}
function salvarBanner(banner) {
    const banners = getBanners();
    if (banner.id) {
        const idx = banners.findIndex(b => b.id === banner.id);
        if (idx !== -1) banners[idx] = { ...banners[idx], ...banner };
    } else {
        banner.id = banners.length > 0 ? Math.max(...banners.map(b => b.id)) + 1 : 1;
        banner.ativo = true;
        banners.push(banner);
    }
    localStorage.setItem('tc_banners', JSON.stringify(banners));
    return banner;
}
function excluirBanner(id) {
    let banners = getBanners();
    banners = banners.filter(b => b.id !== id);
    localStorage.setItem('tc_banners', JSON.stringify(banners));
}
function toggleBannerAtivo(id) {
    const banners = getBanners();
    const banner = banners.find(b => b.id === id);
    if (banner) {
        banner.ativo = !banner.ativo;
        localStorage.setItem('tc_banners', JSON.stringify(banners));
    }
}
initBannersData();

// Categorias
const CATEGORIAS = ['Restaurantes', 'Beleza e Saúde', 'Automotivo', 'Academia', 'Educação', 'Lazer', 'Clínicas', 'Varejo', 'Serviços Automotivos'];

// =========================================
// Scarcity Helpers
// =========================================

function getScarcityInfo(cupom) {
    const restantes = (cupom.estoque || 0) - (cupom.vendidos || 0);
    const percentUsed = cupom.estoque ? ((cupom.vendidos || 0) / cupom.estoque * 100) : 0;
    const now = new Date();
    const expira = cupom.expiraEm ? new Date(cupom.expiraEm) : null;
    const diffMs = expira ? expira - now : null;
    const expired = diffMs !== null && diffMs <= 0;
    const horasRestantes = diffMs ? Math.floor(diffMs / 3600000) : null;
    const minutosRestantes = diffMs ? Math.floor((diffMs % 3600000) / 60000) : null;

    // Urgency level: 0 = normal, 1 = medium, 2 = high, 3 = critical
    let urgency = 0;
    if (restantes <= 3 && restantes > 0) urgency = 3;
    else if (restantes <= 5) urgency = 2;
    else if (percentUsed >= 70) urgency = 1;
    if (horasRestantes !== null && horasRestantes < 6) urgency = Math.max(urgency, 3);
    else if (horasRestantes !== null && horasRestantes < 24) urgency = Math.max(urgency, 2);
    else if (horasRestantes !== null && horasRestantes < 72) urgency = Math.max(urgency, 1);

    // Badge text
    let badge = '';
    if (restantes <= 2 && restantes > 0) badge = '🔥 Últimas unidades!';
    else if (restantes <= 5 && restantes > 0) badge = `⚡ Restam ${restantes}!`;
    else if (horasRestantes !== null && horasRestantes < 6) badge = '⏰ Termina em breve!';
    else if (horasRestantes !== null && horasRestantes < 24) badge = '⏰ Última chance hoje!';
    else if (percentUsed >= 80) badge = '🔥 Quase esgotado!';

    // Timer text
    let timer = '';
    if (diffMs && diffMs > 0) {
        const dias = Math.floor(horasRestantes / 24);
        const hrs = horasRestantes % 24;
        if (dias > 0) timer = `${dias}d ${hrs}h restantes`;
        else if (hrs > 0) timer = `${hrs}h ${minutosRestantes}min restantes`;
        else timer = `${minutosRestantes}min restantes`;
    }

    return { restantes, percentUsed, horasRestantes, minutosRestantes, urgency, badge, timer, expired };
}

function getStockBarHTML(cupom) {
    const info = getScarcityInfo(cupom);
    if (!cupom.estoque) return '';

    const percent = Math.min(info.percentUsed, 100);
    const barColor = info.urgency >= 2 ? '#DC2626' : info.urgency === 1 ? '#F59E0B' : '#22C55E';
    const restantes = info.restantes;

    return `
        <div class="stock-bar-area">
            <div class="stock-bar"><div class="stock-fill" style="width:${percent}%;background:${barColor}"></div></div>
            <div class="stock-text">${restantes > 0 ? `Restam <strong>${restantes}</strong> cupons` : '<strong>Esgotado!</strong>'}</div>
        </div>`;
}

function getUrgencyBadgeHTML(cupom) {
    const info = getScarcityInfo(cupom);
    if (!info.badge) return '';
    const cls = info.urgency >= 2 ? 'urgency-critical' : 'urgency-medium';
    return `<div class="urgency-badge ${cls}">${info.badge}</div>`;
}

function getTimerHTML(cupom) {
    const info = getScarcityInfo(cupom);
    if (!info.timer) return '';
    const cls = info.urgency >= 2 ? 'timer-critical' : '';
    return `<div class="timer-badge ${cls}">⏳ ${info.timer}</div>`;
}

function getRecentBuyersHTML(cupom) {
    const vendidos = cupom.vendidos || 0;
    if (vendidos === 0) return '';
    // Simulate "pessoas compraram" with slight randomization for social proof
    const fakeRecent = Math.min(vendidos, Math.floor(Math.random() * 5) + 3);
    return `<div class="recent-buyers">👥 ${fakeRecent} pessoas compraram nas últimas horas</div>`;
}

// =========================================
// UI: Cidade, Slider, Cupons
// =========================================

document.addEventListener('DOMContentLoaded', () => {
    checkCityStatus();
    initSlider();
});

function checkCityStatus() {
    const savedCity = localStorage.getItem('thecupons_city');
    const modal = document.getElementById('city-modal');
    
    if (!savedCity) {
        if (modal) modal.style.display = 'flex';
    } else {
        if (modal) modal.style.display = 'none';
        updateUIForCity(savedCity);
    }
}

function setCity(city) {
    localStorage.setItem('thecupons_city', city);
    const modal = document.getElementById('city-modal');
    if (modal) modal.style.display = 'none';
    const switcher = document.getElementById('city-switcher');
    if (switcher) switcher.classList.remove('open');
    updateUIForCity(city);
}

function updateUIForCity(city) {
    const formattedCity = city === 'Caxias-MA' ? 'Caxias (MA)' : 'Teresina (PI)';
    const displayElement = document.getElementById('display-city');
    if (displayElement) displayElement.textContent = formattedCity;
    const cityLabel = document.getElementById('current-city-label');
    if (cityLabel) cityLabel.textContent = formattedCity;
    const optCaxias = document.getElementById('opt-caxias');
    const optTeresina = document.getElementById('opt-teresina');
    if (optCaxias) optCaxias.classList.toggle('active', city === 'Caxias-MA');
    if (optTeresina) optTeresina.classList.toggle('active', city === 'Teresina-PI');
    renderCoupons(city);
}

function renderCoupons(city) {
    const grid = document.getElementById('coupon-grid');
    if (!grid) return;
    
    refreshCuponsData();
    grid.innerHTML = '';
    const filteredCoupons = getCuponsAtivos().filter(c => c.cidade === city);

    if (filteredCoupons.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align:center; padding: 40px; color: #737373;">Em breve novas ofertas para esta cidade!</p>';
        return;
    }

    filteredCoupons.forEach(cupom => {
        const info = getScarcityInfo(cupom);
        const urgencyBadge = getUrgencyBadgeHTML(cupom);
        const stockBar = getStockBarHTML(cupom);
        const timerBadge = getTimerHTML(cupom);

        const cardHTML = `
            <div class="coupon-card ${info.urgency >= 2 ? 'card-urgent' : ''}">
                <div class="coupon-image-area" style="background-image: url('${cupom.imagem}')">
                    <div class="coupon-discount-badge">${cupom.desconto}</div>
                    ${urgencyBadge}
                </div>
                <div class="coupon-content">
                    <div class="coupon-partner">${cupom.parceiro}</div>
                    <h3 class="coupon-title">${cupom.titulo}</h3>
                    <div class="coupon-price">
                        <span class="price-old">${cupom.precoAntigo}</span>
                        <span class="price-new">${cupom.precoNovo}</span>
                    </div>
                    ${stockBar}
                    ${timerBadge}
                    <div class="coupon-action">
                        <a href="cupom.html?id=${cupom.id}" class="btn btn-primary btn-block ${info.urgency >= 2 ? 'btn-pulse' : ''}">
                            ${info.restantes <= 0 ? 'Esgotado' : info.urgency >= 2 ? '🔥 Garantir Agora' : 'Ver Oferta'}
                        </a>
                    </div>
                </div>
            </div>
        `;
        grid.insertAdjacentHTML('beforeend', cardHTML);
    });
}

/* =========================================
   Renderizar Lojas Populares e Categorias
   ========================================= */
const CORES_CATEGORIAS = {
    'Restaurantes': '#FFD166',
    'Beleza e Saúde': '#FF9F1C',
    'Automotivo': '#118AB2',
    'Academia': '#06D6A0',
    'Educação': '#EF476F',
    'Lazer': '#118AB2',
    'Clínicas': '#06D6A0',
    'Varejo': '#FFD166',
    'Serviços Automotivos': '#118AB2'
};

const IMAGES_CATEGORIAS = {
    'Restaurantes': '🍔',
    'Beleza e Saúde': '💇',
    'Automotivo': '🚗',
    'Academia': '🏋️',
    'Educação': '📚',
    'Lazer': '🎉',
    'Clínicas': '🏥',
    'Varejo': '🛒',
    'Serviços Automotivos': '🔧'
};

function renderLojasPopulares() {
    const container = document.getElementById('lojas-pill-container');
    if (!container) return;
    
    // Obter parceiros únicos dos cupons ativos
    const parceiros = [...new Set(getCuponsAtivos().map(c => c.parceiro))];
    // Se não tiver muitos, adiciona alguns parceiros mock apenas para preencher visualmente
    const mockParceiros = ['Amazon', 'Magazine Luiza', 'Shopee', 'Casas Bahia', 'AliExpress', 'Netshoes', 'KaBuM', 'Drogasil', 'Renner', 'Centauro', 'Drogaria São Paulo', 'Carrefour'];
    
    // Junta reais com mock e remove duplicados
    const showParceiros = [...new Set([...parceiros, ...mockParceiros])].slice(0, 16);
    
    container.innerHTML = showParceiros.map(p => `<a href="#" class="loja-pill">${p}</a>`).join('');
}

function renderCategorias() {
    const container = document.getElementById('category-circle-grid');
    if (!container) return;
    
    container.innerHTML = CATEGORIAS.slice(0, 8).map(cat => {
        const cor = CORES_CATEGORIAS[cat] || '#E5E5E5';
        const icone = IMAGES_CATEGORIAS[cat] || '🏷️';
        return `
            <a href="#" class="category-circle-card">
                <div class="category-circle-img" style="background-color: ${cor}33;">
                    <span style="font-size: 2rem;">${icone}</span>
                </div>
                <span class="category-circle-label">${cat}</span>
            </a>
        `;
    }).join('');
}

/* =========================================
   City Switcher Dropdown
   ========================================= */
function toggleCityDropdown() {
    const switcher = document.getElementById('city-switcher');
    if (switcher) switcher.classList.toggle('open');
}

document.addEventListener('click', (e) => {
    const switcher = document.getElementById('city-switcher');
    if (switcher && !switcher.contains(e.target)) {
        switcher.classList.remove('open');
    }
});

/* =========================================
   Banner Slider
   ========================================= */
let currentSlide = 0;
let slideInterval = null;
const SLIDE_DELAY = 5000;

function initSlider() {
    const track = document.getElementById('slider-track');
    const dotsContainer = document.getElementById('slider-dots');
    if (!track || !dotsContainer) return;

    // Render Banners
    const banners = typeof getBannersAtivos === 'function' ? getBannersAtivos() : [];
    
    if (banners.length === 0) {
        document.getElementById('banner-slider').style.display = 'none';
        return;
    }

    track.innerHTML = '';
    dotsContainer.innerHTML = '';

    banners.forEach((banner, index) => {
        // Slide
        const slideHTML = `
            <div class="slide">
                <img src="${banner.imagem}" alt="${banner.titulo}">
                <div class="slide-overlay">
                    <div class="slide-text">
                        <h2>${banner.titulo}</h2>
                        <p>${banner.subtitulo}</p>
                        ${banner.linkBotao && banner.textoBotao ? `<a href="${banner.linkBotao}" class="btn btn-accent">${banner.textoBotao}</a>` : ''}
                    </div>
                </div>
            </div>
        `;
        track.insertAdjacentHTML('beforeend', slideHTML);

        // Dot
        const dotHTML = `<button class="slider-dot ${index === 0 ? 'active' : ''}" onclick="slideTo(${index})"></button>`;
        dotsContainer.insertAdjacentHTML('beforeend', dotHTML);
    });

    startAutoSlide();
    const slider = document.getElementById('banner-slider');
    if (slider) {
        slider.addEventListener('mouseenter', stopAutoSlide);
        slider.addEventListener('mouseleave', startAutoSlide);
    }
}

function startAutoSlide() {
    stopAutoSlide();
    slideInterval = setInterval(() => slideMove(1), SLIDE_DELAY);
}

function stopAutoSlide() {
    if (slideInterval) { clearInterval(slideInterval); slideInterval = null; }
}

function slideMove(direction) {
    const track = document.getElementById('slider-track');
    if (!track) return;
    const totalSlides = track.children.length;
    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
    updateSlider();
}

function slideTo(index) {
    currentSlide = index;
    updateSlider();
    startAutoSlide();
}

function updateSlider() {
    const track = document.getElementById('slider-track');
    if (!track) return;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    const dots = document.querySelectorAll('.slider-dot');
    dots.forEach((dot, i) => { dot.classList.toggle('active', i === currentSlide); });
}
