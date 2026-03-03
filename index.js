const { Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages
  ]
});

client.once('ready', () => {
  console.log("Bot online!");
});

client.on('messageCreate', async (message) => {
  if (message.content === "!loja") {

    const embed = new EmbedBuilder()
      .setTitle("🛒 Loja Blox Fruits")
      .setDescription("Selecione sua fruta abaixo");

    const menu = new StringSelectMenuBuilder()
      .setCustomId("loja")
      .setPlaceholder("Escolha a fruta")
      .addOptions([
        { label: "Tiger", value: "Tiger" },
        { label: "Venom", value: "Venom" },
        { label: "Control", value: "Control" },
        { label: "Buddha", value: "Buddha" },
        { label: "Portal", value: "Portal" },
        { label: "T-Rex", value: "T-Rex" },
        { label: "Mammoth", value: "Mammoth" }
      ]);

    const row = new ActionRowBuilder().addComponents(menu);

    await message.channel.send({ embeds: [embed], components: [row] });
  }
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isStringSelectMenu()) return;

  const produto = interaction.values[0];

  const dono = await client.users.fetch(process.env.DONO_ID);

  await dono.send(
    `🛒 Novo pedido!\n👤 Usuário: ${interaction.user.username}\n🍏 Produto: ${produto}`
  );

  await interaction.reply({ content: "Pedido enviado ✅", ephemeral: true });
});

client.login(process.env.TOKEN);
