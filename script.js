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

async function Clima() {
    const latitude = -23.5505;
    const longitude = -46.6333;

    const url =
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&timezone=America/Sao_Paulo`;

    try {
        const repostas = await fetch(url);
        const dados = await repostas.json();

        console.log(dados);

        const temperatura = Math.round(dados.current.temperature_2m);
        const codigo = dados.current.weather_code;

        const emoji = escolherEmoji(codigo);

        clima.textContent = `${emoji} São Paulo ${temperatura}°C`;

    } catch (erro) {
        clima.textContent = "Clima indsponvel";
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

Clima();



