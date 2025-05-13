const nomes = [
  "Tharion Martel de Ferro",
  "Kael, o Rasgador de Sombras",
  "Baldur Punho Flamejante",
  "Eldrak Lança de Prata",
  "Ragnar, o Olho da Tempestade"
];

const inimigos = [
  "um dragão colossal",
  "uma medusa petrificante",
  "um troll faminto",
  "uma tribo de duendes",
  "um gigante das montanhas",
  "um necromante sombrio",
  "um bando de esqueletos guerreiros"
];

const ataques = ["Lançar magia", "Usar espada", "Golpear com cajado"];
const fugas = ["Correr rapidamente", "Usar magia para abrir portal", "Tomar poção de invisibilidade"];
const defesas = ["Usar escudo", "Criar escudo mágico"];

let pontos = 0;
let rodada = 1;
let tentativas = 0;
let nome_heroi = "";
let inimigoAtual = "";

const logDiv = document.getElementById('log');

function escrever(texto) {
  const p = document.createElement("p");
  p.innerHTML = texto;
  logDiv.appendChild(p);
  logDiv.scrollTop = logDiv.scrollHeight;
}

function startGame() {
  nome_heroi = nomes[Math.floor(Math.random() * nomes.length)];
  escrever(`<strong>Você é ${nome_heroi}</strong>`);
  document.getElementById("acoes").style.display = "block";
  novaRodada();
}

function novaRodada() {
  if (pontos >= 30 || tentativas >= 15) return finalizarJogo();
  inimigoAtual = inimigos[Math.floor(Math.random() * inimigos.length)];
  escrever(`<br><strong>Rodada ${rodada}</strong> - Você foi atacado por ${inimigoAtual}!`);
  mostrarOpcoes();
}

function mostrarOpcoes() {
  document.getElementById("opcoes-ataque").innerHTML = "<h4>🗡️ Ataque:</h4>" +
    ataques.map(acao => `<button onclick="realizarAcao('${acao}', 'ataque')">${acao}</button>`).join("");
  document.getElementById("opcoes-defesa").innerHTML = "<h4>🛡️ Defesa:</h4>" +
    defesas.map(acao => `<button onclick="realizarAcao('${acao}', 'defesa')">${acao}</button>`).join("");
  document.getElementById("opcoes-fuga").innerHTML = "<h4>🏃 Fuga:</h4>" +
    fugas.map(acao => `<button onclick="realizarAcao('${acao}', 'fuga')">${acao}</button>`).join("");
}

function realizarAcao(descricao, tipo) {
  escrever(`Você tentou: <strong>${descricao}</strong> (${tipo})`);
  const chance = Math.random();
  if (chance > 0.5) {
    pontos += 10;
    escrever("✅ Sua ação foi bem-sucedida! +10 pontos.");
  } else {
    pontos -= 5;
    escrever("❌ A tentativa falhou... -5 pontos.");
  }
  rodada++;
  tentativas++;
  novaRodada();
}

function finalizarJogo() {
  document.getElementById("acoes").style.display = "none";
  if (pontos >= 30) {
    escrever(`🏆 Você venceu com ${pontos} pontos! Final: ${finalZoeiro(nome_heroi)}`);
  } else {
    escrever(`☠️ <strong>GAME OVER</strong> - Pontuação final: ${pontos}`);
    escrever(`<pre style='color:#ff5555; font-size: 12px; text-align: left;'>
_                   _
_( )                 ( )_
(_, |      __ __      | ,_)
   '\\'\\    /  ^  \\    /'/
    '\\'\\,/\\      \\,/'/'
      '\\| []   [] |/'
        (_  /^\\  _)
          \\  ~  /
          /HHHHH\\
        /'/{^^^}\\'\\
    _,/'/'  ^^^  '\\'\\,_
   (_, |           | ,_)
     (_)           (_)
</pre>`);
  }
  salvarRanking(nome_heroi, pontos);
}

function finalZoeiro(nome) {
  if (nome.includes("Tharion")) return "abriu uma academia de goblins.";
  if (nome.includes("Kael")) return "domou um exército de morcegos cantores.";
  if (nome.includes("Baldur")) return "virou tiktoker de receitas com lava.";
  if (nome.includes("Eldrak")) return "vendeu sua lança pra comprar pão.";
  if (nome.includes("Ragnar")) return "lidera uma seita de Wi-Fi eterno.";
  return "virou lenda urbana contada por trolls em tabernas.";
}

function salvarRanking(nome, pontos) {
  let ranking = JSON.parse(localStorage.getItem("rankingZoeiro") || "[]");
  ranking.push({ nome, pontos });
  ranking.sort((a, b) => b.pontos - a.pontos);
  ranking = ranking.slice(0, 5);
  localStorage.setItem("rankingZoeiro", JSON.stringify(ranking));
  atualizarRanking();
}

function atualizarRanking() {
  const rankingList = document.getElementById("ranking-list");
  rankingList.innerHTML = "";
  const ranking = JSON.parse(localStorage.getItem("rankingZoeiro") || "[]");
  ranking.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.nome} - ${item.pontos} pontos`;
    rankingList.appendChild(li);
  });
}

window.onload = atualizarRanking;
