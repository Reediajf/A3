/**
 * Script principal para o Jogo dos Objetos
 * Responsável por controlar a navegação entre formulários,
 * autenticação de usuários e efeitos visuais
 */

// Elementos do DOM
const loginToggle = document.getElementById('loginToggle');
const registerToggle = document.getElementById('registerToggle');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const gameFrame = document.getElementById('gameFrame');
const JogarToggle = document.getElementById('JogarToggle');

// Event Listener para o botão Jogar
JogarToggle.addEventListener('click', () => {
    loginForm.classList.remove('hidden');
    registerForm.classList.add('hidden');
    loginToggle.classList.add('active');
    registerToggle.classList.remove('active');
    JogarToggle.classList.add('active');

    setTimeout(() => JogarToggle.classList.remove('active'), 5000);
});

// Event Listener para o botão Login
loginToggle.addEventListener('click', () => {
    loginForm.classList.remove('hidden');
    registerForm.classList.add('hidden');
    loginToggle.classList.add('active');
    registerToggle.classList.remove('active');
    JogarToggle.classList.remove('active');
});

// Event Listener para o botão Registrar
registerToggle.addEventListener('click', () => {
    registerForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
    registerToggle.classList.add('active');
    loginToggle.classList.remove('active');
    JogarToggle.classList.remove('active');
});

// Processa o formulário de login
loginForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome: username, senha: password })
        });

        if (response.ok) {
            const data = await response.json();

            localStorage.setItem('usuarioId', data.id);
            localStorage.setItem('usuarioNome', data.nome);
            localStorage.setItem('pontuacao', 0); // inicia pontuação zerada

            alert('Uhuuul! 🎉 Login bem-sucedido! Bem-vindo, aventureiro!');
            gameFrame.style.display = 'block';
        } else {
            alert('Opa! 🤔 Nome ou senha incorretos. Tente novamente!');
            loginForm.classList.add('shake');
            setTimeout(() => loginForm.classList.remove('shake'), 500);
        }
    } catch (error) {
        alert('Ops! Algo deu errado. Vamos tentar novamente?');
    }
});

// Processa o formulário de registro
registerForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    const passwordConfirm = document.getElementById('confirmPassword').value;

    if (password === passwordConfirm) {
        try {
            const response = await fetch('/jogo/registrar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome: username, senha: password })
            });

            if (response.ok) {
                alert('Parabéns! 🌟 Sua conta mágica foi criada! Agora você pode entrar na aventura!');
                loginToggle.click(); // Volta para a tela de login
            }
        } catch (error) {
            alert('Ops! Algo deu errado. Vamos tentar novamente?');
        }
    } else {
        alert('Oops! 🙊 As senhas precisam ser iguais. Tente novamente!');
        registerForm.classList.add('shake');
        setTimeout(() => registerForm.classList.remove('shake'), 500);
    }
});

// Inicia o jogo — reseta pontuação no localStorage
JogarToggle.addEventListener('click', async function() {
    try {
        const response = await fetch('/jogo/iniciar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({})
        });

        if (response.ok) {
            localStorage.setItem('pontuacao', 0); // zera pontuação toda vez que iniciar o jogo
            gameFrame.style.display = 'block';
        } else {
            alert('Ops! Não conseguimos iniciar o jogo. Vamos tentar de novo?');
        }
    } catch (error) {
        alert('Ops! Algo deu errado. Vamos tentar novamente?');
    }
});

// Função para atualizar a pontuação no localStorage — chame essa função do seu jogo Godot
function atualizarPontuacao(novaPontuacao) {
    localStorage.setItem('pontuacao', novaPontuacao);
}

document.getElementById('backToLogin').addEventListener('click', async function () {
    const iframe = gameFrame.querySelector("iframe");

    const usuarioId = localStorage.getItem('usuarioId');
    const pontuacao = localStorage.getItem('pontuacao');

    if (!usuarioId || pontuacao === null) {
        alert('Dados do usuário ou pontuação não encontrados para salvar.');
        return;
    }

    // Monta o corpo no formato x-www-form-urlencoded
    const body = `id=${encodeURIComponent(usuarioId)}&pontuacao=${encodeURIComponent(pontuacao)}`;

    try {
        const response = await fetch('/jogo/pontuacao', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            credentials: 'include',
            body: body
        });

        if (response.ok) {
            alert('Pontuação salva com sucesso!');
            // Limpa o localStorage após salvar
            localStorage.clear();
        } else {
            alert('Ops! Não conseguimos salvar. Vamos tentar de novo?');
        }
    } catch (error) {
        alert('Ops! Algo deu errado. Vamos tentar novamente?');
    }

    if (iframe) {
        iframe.src = iframe.src.split("?")[0] + "?" + new Date().getTime();
    }

    gameFrame.style.display = 'none';
});

/**
 * Cria elementos decorativos flutuantes aleatórios
 */
function createRandomElements() {
    const types = ['star', 'cloud'];
    const count = 5;

    for (let i = 0; i < count; i++) {
        const element = document.createElement('div');
        const type = types[Math.floor(Math.random() * types.length)];
        element.classList.add('floating-element', type);

        element.style.top = `${Math.random() * 100}%`;
        element.style.left = `${Math.random() * 100}%`;

        element.style.animationDuration = `${3 + Math.random() * 4}s`;
        element.style.animationDelay = `${Math.random() * 2}s`;

        document.body.appendChild(element);
    }
}

// Cria elementos decorativos ao carregar a página
window.addEventListener('load', createRandomElements);
