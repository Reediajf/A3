
const loginToggle = document.getElementById('loginToggle');
const registerToggle = document.getElementById('registerToggle');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const gameFrame = document.getElementById('gameFrame');
const JogarToggle = document.getElementById('JogarToggle');


JogarToggle.addEventListener('click', () => {
    loginForm.classList.remove('hidden');
    registerForm.classList.add('hidden');
    loginToggle.classList.add('active');
    registerToggle.classList.remove('active');
    JogarToggle.classList.add('active');

    setTimeout(() => JogarToggle.classList.remove('active'), 5000);
});


loginToggle.addEventListener('click', () => {
    loginForm.classList.remove('hidden');
    registerForm.classList.add('hidden');
    loginToggle.classList.add('active');
    registerToggle.classList.remove('active');
    JogarToggle.classList.remove('active');
});


registerToggle.addEventListener('click', () => {
    registerForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
    registerToggle.classList.add('active');
    loginToggle.classList.remove('active');
    JogarToggle.classList.remove('active');
});


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
            localStorage.setItem('pontuacao', 0);

            alert('Uhuuul! 🎉 Login bem-sucedido! Bem-vindo, aventureiro!');
            const iframe = gameFrame.querySelector("iframe");
            iframe.src = "/AdivinheOObjetoHTML/AdivinheOObjeto.html";
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
                loginToggle.click();
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


JogarToggle.addEventListener('click', async function() {
    try {
        const response = await fetch('/jogo/iniciar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({})
        });

        if (response.ok) {
            localStorage.setItem('pontuacao', 0);
            const iframe = gameFrame.querySelector("iframe");
            iframe.src = "/AdivinheOObjetoHTML/AdivinheOObjeto.html";
            gameFrame.style.display = 'block';
        } else {
            alert('Ops! Não conseguimos iniciar o jogo. Vamos tentar de novo?');
        }
    } catch (error) {
        alert('Ops! Algo deu errado. Vamos tentar novamente?');
    }
});

document.getElementById('backToLogin').addEventListener('click', async function () {
    const iframe = gameFrame.querySelector("iframe");

    const usuarioId = localStorage.getItem('usuarioId');
    const pontuacao = localStorage.getItem('pontuacao');

    if (!usuarioId || pontuacao === null) {
        alert('Dados do usuário ou pontuação não encontrados para salvar.');
        if (iframe) {
            iframe.src = iframe.src.split("?")[0] + "?" + new Date().getTime();
        }

        gameFrame.style.display = 'none';
        iframe.src = "";
        return;
    }

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

document.addEventListener("DOMContentLoaded", function () {
    const rankingBtn = document.getElementById("rankingBtn");
    const rankingContainer = document.getElementById("rankingContainer");
    const rankingTableBody = document.querySelector("#rankingTable tbody");

    let rankingVisivel = false;

    rankingBtn.addEventListener("click", async () => {
        if (rankingVisivel) {
            esconderRanking();
            return;
        }

        await mostrarRanking();
    });

    async function mostrarRanking() {
        try {
            rankingBtn.disabled = true;
            rankingBtn.textContent = "🔄 Carregando...";

            rankingContainer.classList.remove("hidden");
            rankingTableBody.innerHTML = "<tr><td colspan='3' style='text-align: center; padding: 20px;'>🔄 Carregando ranking...</td></tr>";

            const response = await fetch("/jogo/mostrarpontuacao", {
                method: 'GET',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }

            const usuarios = await response.json();

            rankingTableBody.innerHTML = "";

            if (!usuarios || usuarios.length === 0) {
                rankingTableBody.innerHTML = "<tr><td colspan='3' style='text-align: center; padding: 20px;'>😊 Nenhum jogador no ranking ainda!</td></tr>";
            } else {
                const usuariosOrdenados = usuarios.sort((a, b) => (b.pontuacao || 0) - (a.pontuacao || 0));

                usuariosOrdenados.forEach((usuario, index) => {
                    const tr = document.createElement("tr");

                    let posicaoTexto = index + 1;
                    if (index === 0) posicaoTexto = "🥇 1º";
                    else if (index === 1) posicaoTexto = "🥈 2º";
                    else if (index === 2) posicaoTexto = "🥉 3º";
                    else posicaoTexto = `${index + 1}º`;

                    tr.innerHTML = `
                        <td style="text-align: center; font-weight: bold;">${posicaoTexto}</td>
                        <td style="padding-left: 10px;">${usuario.nome || 'Jogador Anônimo'}</td>
                        <td style="text-align: center; font-weight: bold; color: #4CAF50;">${usuario.pontuacao || 0}</td>
                    `;

                    if (index < 3) {
                        tr.style.backgroundColor = "#fff3cd";
                    }

                    rankingTableBody.appendChild(tr);
                });
            }

            rankingVisivel = true;
            rankingBtn.textContent = "❌ Fechar Ranking";

        } catch (error) {
            console.error("Erro ao carregar ranking:", error);
            rankingTableBody.innerHTML = `<tr><td colspan='3' style="color: red; text-align: center; padding: 20px;">❌ Erro ao carregar ranking: ${error.message}</td></tr>`;
        } finally {
            rankingBtn.disabled = false;
        }
    }

    function esconderRanking() {
        rankingContainer.classList.add("hidden");
        rankingVisivel = false;
        rankingBtn.textContent = "🏆 Ver Ranking";
        rankingBtn.disabled = false;
    }

    document.addEventListener('click', function(event) {
        if (rankingVisivel &&
            !rankingContainer.contains(event.target) &&
            !rankingBtn.contains(event.target)) {
            esconderRanking();
        }
    });
});

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

window.addEventListener('load', createRandomElements);