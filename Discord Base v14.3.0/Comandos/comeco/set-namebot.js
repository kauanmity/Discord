const Discord = require("discord.js")

module.exports = {
    name: 'set-namebot', // Coloque o nome do comando
    description: '[👑 Administração] Alterar nome do bot', // Coloque a descrição do comando
    options: [
        {
            name: 'nome',
            description: 'Digite um nome',
            type: Discord.ApplicationCommandOptionType.String,
            required: true
        },
    ],

    run: async (client, interaction) => {
        const nome_bot = interaction.options.getString("nome")

        if (interaction.user.id != dono) {
            return interaction.reply({
                embeds: [
                    new Discord.EmbedBuilder()
                        .setDescription(`**${interaction.user.tag}**, Você não tem permissão para usar este comando.`)
                        .setColor("#2f3136")
                        .setTimestamp()
                        .setFooter({ text: footer, iconURL: client.user.displayAvatarURL({ dinamyc: true }) })
                ],
                ephemeral: true,
            })
        } else {

            interaction.reply({
                embeds: [
                    new Discord.EmbedBuilder()
                        .setColor("#2f3136")
                        .setDescription(`**${interaction.user.tag},** Alterei o meu nome para:`)
                        .addFields(
                            {
                                name: `\\🌟 Nome alterado para:`,
                                value: `\`\`\`fix\n${nome_bot}\n\`\`\``,
                            },
                        )
                        .setTimestamp()
                        .setFooter({ text: footer, iconURL: client.user.displayAvatarURL({ dinamyc: true }) })
                ]
            })
            interaction.client.user.setUsername(nome_bot)
        }
    }
}