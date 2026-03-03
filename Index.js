const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

// Pega o token das variáveis do Railway
const token = process.env.TOKEN;

// ID do dono do bot (opcional, se precisar de comandos especiais)
const donoId = process.env.DONO_ID;

client.once('ready', () => {
    console.log('Bot online!');
});

// Exemplo simples de comando para testar
client.on('messageCreate', message => {
    if (message.content.toLowerCase() === '!loja') {
        message.channel.send('Frutas disponíveis: Tiger, Venom, Control, Buddha, Portal, T-Rex, Mammoth');
        console.log(`${message.author.tag} solicitou a lista de frutas`);
    }
});

client.login(token);
