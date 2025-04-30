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

/**
 * Cria um efeito visual de onda sonora ao clicar em um elemento
 * @param {HTMLElement} element - O elemento que recebe o efeito
 */
function createSoundEffect(element) {
    const soundWave = document.createElement('div');
    soundWave.classList.add('sound-wave');
    element.appendChild(soundWave);

    // Remove o efeito após 1 segundo
    setTimeout(() => {
        if (soundWave && soundWave.parentNode) {
            soundWave.parentNode.removeChild(soundWave);
        }
    }, 1000);
}

// Adiciona efeitos sonoros visuais a todos os botões
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function() {
        createSoundEffect(this);
    });
});

// Event Listener para o botão Jogar
JogarToggle.addEventListener('click', () => {
    loginForm.classList.remove('hidden');
    registerForm.classList.add('hidden');
    loginToggle.classList.add('active');
    registerToggle.classList.remove('active');
    JogarToggle.classList.add('active');

    // Remove a classe active após 500ms para efeito visual
    setTimeout(() => JogarToggle.classList.remove('active'), 500);
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
document.getElementById('loginForm').addEventListener('submit', async function(e) {
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
document.getElementById('registerForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    const passwordConfirm = document.getElementById('confirmPassword').value;

    if (password === passwordConfirm) {
        try {
            const response = await fetch('/auth/registrar', {
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

// Inicia o jogo
document.getElementById('JogarToggle').addEventListener('click', async function() {
    try {
        const response = await fetch('/auth/iniciar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({})
        });

        if (response.ok) {
            gameFrame.style.display = 'block';
        } else {
            alert('Ops! Não conseguimos iniciar o jogo. Vamos tentar de novo?');
        }
    } catch (error) {
        alert('Ops! Algo deu errado. Vamos tentar novamente?');
    }
});

// Volta para a tela de login a partir do jogo
document.getElementById('backToLogin').addEventListener('click', () => {
    const iframe = document.querySelector("#gameFrame iframe");
    if (iframe) {
        // Recarrega o iframe para reiniciar o jogo
        iframe.src = iframe.src;
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

        // Posição aleatória
        element.style.top = `${Math.random() * 100}%`;
        element.style.left = `${Math.random() * 100}%`;

        // Animação levemente diferente para cada elemento
        element.style.animationDuration = `${3 + Math.random() * 4}s`;
        element.style.animationDelay = `${Math.random() * 2}s`;

        document.body.appendChild(element);
    }
}

// Cria elementos decorativos ao carregar a página
window.addEventListener('load', createRandomElements);