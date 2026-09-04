

//RELÓGIO
function relogio() {
    const timeElement = document.getElementById('time');

    const now = new Date();
    const horas = now.getHours().toString().padStart(2, '0');
    const minutos = now.getMinutes().toString().padStart(2, '0')
    const segundos = now.getSeconds().toString().padStart(2, '0')
    const timeString = `${horas}:${minutos}:${segundos}`;
    timeElement.textContent = timeString;

}
relogio();
setInterval(relogio, 1000);

//CLIMA
const clima = document.getElementById('clima')
const climaAtual = document.getElementById('climaAtual')
const buscaClima = document.getElementById('buscaClima')
const cidadeInput = document.getElementById('cidadeInput')
const sugestoes = document.getElementById('sugestoes')

climaAtual.addEventListener('click', () => {

    const seta = climaAtual.querySelector(".seta");

    if (buscaClima.style.display === 'block') {
        buscaClima.style.display = 'none';
        seta.innerHTML = '<img src="/img/setaDown.png" alt="" id="setaDown">';

    } else {
        buscaClima.style.display = 'block';
        seta.innerHTML = '<img src="/img/setaUp.png" alt="" id="setaUp">';
        cidadeInput.focus();
    }

});


const cidadePadrao = {
    nome: "São Paulo",
    latitude: -23.5505,
    longitude: -46.6333
};

async function buscarClima(cidade) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${cidade.latitude}&longitude=${cidade.longitude}&current=temperature_2m,weather_code&timezone=auto`;

    try {
        const repostas = await fetch(url);
        const dados = await repostas.json();

        const temperatura = Math.round(dados.current.temperature_2m);
        const codigo = dados.current.weather_code;

        const emoji = escolherEmoji(codigo);

        climaAtual.innerHTML = `
    <p>
         ${emoji} ${cidade.nome} ${temperatura}C°
     
         <span class="seta">
        <img src="/img/setaDown.png" alt="" id="setaDown">
         </span> 
    </p>`;

    } catch (erro) {
        climaAtual.innerHTML = `<p>Clima indsponvel</p>`;
        console.error(erro);
    }


}



function escolherEmoji(codigo) {

    if (codigo === 0) {
        return "☀️";
    }

    if (codigo === 1 || codigo === 2) {
        return "🌤️";
    }

    if (codigo === 3) {
        return "☁️";
    }

    if (codigo === 45 || codigo === 48) {
        return "🌫️";
    }

    if (codigo >= 51 && codigo <= 57) {
        return "🌦️";
    }

    if (codigo >= 61 && codigo <= 67) {
        return "🌧️";
    }

    if (codigo >= 71 && codigo <= 77) {
        return "❄️";
    }

    if (codigo >= 80 && codigo <= 82) {
        return "🌧️";
    }

    if (codigo >= 85 && codigo <= 86) {
        return "🌨️";
    }

    if (codigo >= 95 && codigo <= 99) {
        return "⛈️";
    }

    return "🌡️";
}



cidadeInput.addEventListener('input', async () => {
    const busca = cidadeInput.value.trim();

    if (busca.length < 3) {
        sugestoes.innerHTML = "";
        return;
    }

    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(busca)}&count=5&language=pt&countryCode=BR`;

    try {
        const resposta = await fetch(url)
        const dados = await resposta.json();


        sugestoes.innerHTML = '';

        if (!dados.results) {
            sugestoes.innerHTML = '<p>Nenhuma cidade encontrada<p>'
            return;
        }

        dados.results.forEach(local => {
            const item = document.createElement('div');

            item.innerHTML = `
            <strong>${local.name}</strong>
            <small>${local.admin1}</small>
            `;
            item.addEventListener('click', () => {
                const cidadeEscolhida = {
                    nome: local.name,
                    latitude: local.latitude,
                    longitude: local.longitude
                };


                buscarClima(cidadeEscolhida);

                cidadeInput.value = "";
                sugestoes.innerHTML = "";

            });
            sugestoes.appendChild(item);

        });

    } catch (erro) {
        console.error('Erro ao pesquisar cidade', erro);
    }
})


buscarClima(cidadePadrao);



