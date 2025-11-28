const body = document.body;
const root = document.documentElement; 
const btnContraste = document.getElementById('toggle-contraste');
const btnAumentar = document.getElementById('aumentar-fonte');
const btnDiminuir = document.getElementById('diminuir-fonte');
const btnEspacamento = document.getElementById('aumentar-espacamento');
const btnReset = document.getElementById('reset-acessibilidade');

const LS_CONTRASTE = 'acessibilidade-contraste';
const LS_FONTE = 'acessibilidade-fonte';
const LS_ESPACO = 'acessibilidade-espaco';

const FONT_STEP = 2;
const FONT_MIN = 14;
const FONT_MAX = 24;

function toggleContraste() {
    body.classList.toggle('alto-contraste');
    const ativado = body.classList.contains('alto-contraste');
    localStorage.setItem(LS_CONTRASTE, ativado ? 'on' : 'off');
}

function alterarFonte(action) {
    let currentSize = parseFloat(root.style.getPropertyValue('--base-font-size')) || 16;
    
    if (action === 'aumentar' && currentSize < FONT_MAX) {
        currentSize += FONT_STEP;
    } else if (action === 'diminuir' && currentSize > FONT_MIN) {
        currentSize -= FONT_STEP;
    }

    root.style.setProperty('--base-font-size', `${currentSize}px`);
    localStorage.setItem(LS_FONTE, currentSize);
}

function toggleEspacamento() {
    let currentLineHeight = parseFloat(root.style.getPropertyValue('--line-height-config')) || 1.5;
    
    if (currentLineHeight === 1.5) {
        root.style.setProperty('--line-height-config', 1.8);
        root.style.setProperty('--paragraph-spacing-config', '2.5em');
        root.style.setProperty('--letter-spacing-config', '0.12em');
        root.style.setProperty('--word-spacing-config', '0.2em');
        localStorage.setItem(LS_ESPACO, 'on');
    } else {
        root.style.setProperty('--line-height-config', 1.5);
        root.style.setProperty('--paragraph-spacing-config', '2em');
        root.style.setProperty('--letter-spacing-config', '0em');
        root.style.setProperty('--word-spacing-config', '0em');
        localStorage.setItem(LS_ESPACO, 'off');
    }
}

function resetAcessibilidade() {
    localStorage.removeItem(LS_CONTRASTE);
    localStorage.removeItem(LS_FONTE);
    localStorage.removeItem(LS_ESPACO);

    body.classList.remove('alto-contraste');
    root.style.setProperty('--base-font-size', '16px');
    root.style.setProperty('--line-height-config', 1.5);
    root.style.setProperty('--paragraph-spacing-config', '2em');
    root.style.setProperty('--letter-spacing-config', '0em'); 
    root.style.setProperty('--word-spacing-config', '0em'); 
    alert('Configurações de acessibilidade redefinidas.');
}


function carregarPreferencias() {
    if (localStorage.getItem(LS_CONTRASTE) === 'on') {
        body.classList.add('alto-contraste');
    }

    const savedFont = localStorage.getItem(LS_FONTE);
    if (savedFont) {
        root.style.setProperty('--base-font-size', `${savedFont}px`);
    } else {
        root.style.setProperty('--base-font-size', '16px');
    }

    if (localStorage.getItem(LS_ESPACO) === 'on') {
        root.style.setProperty('--line-height-config', 1.8);
        root.style.setProperty('--paragraph-spacing-config', '2.5em');
        root.style.setProperty('--letter-spacing-config', '0.12em');
        root.style.setProperty('--word-spacing-config', '0.2em');
    } else {
        root.style.setProperty('--line-height-config', 1.5);
        root.style.setProperty('--paragraph-spacing-config', '2em');
        root.style.setProperty('--letter-spacing-config', '0em');
        root.style.setProperty('--word-spacing-config', '0em');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    carregarPreferencias(); 

    if (btnContraste) btnContraste.addEventListener('click', toggleContraste);
    if (btnAumentar) btnAumentar.addEventListener('click', () => alterarFonte('aumentar'));
    if (btnDiminuir) btnDiminuir.addEventListener('click', () => alterarFonte('diminuir'));
    if (btnEspacamento) btnEspacamento.addEventListener('click', toggleEspacamento);
    if (btnReset) btnReset.addEventListener('click', resetAcessibilidade);
});