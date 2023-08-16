const config = require('../../config.json')

module.exports = {
    name: 'ready',
    async execute(interaction, client){

        const connectionChannel = client.channels.cache.get(config.channelId[0].connexionChannel)

        const embed = new client.discord.MessageEmbed()
            .setTitle("Connection au server")
            .setDescription("**Solts du serveur** : 350\n\n" +
                "**Pour se connecter:**\n" +
                "> > Démarre FiveM\n" +
                "> > Appuie sur F8\n" +
                `> > Copie-colle ceci: connect ${config.SERVER_IP}\n\n` +
                "Ou cliquer sur \"**Se connecter**\" !\n\n" +
                "**Vous avez des problèmes de connexion ?**\n" +
                "> Contacter notre support.")
            .setThumbnail(config.logo)
            .setFooter({text: config.discordName, iconURL: config.logo})
            .setColor('#5F085B')

        const buttons = new client.discord.MessageActionRow()
            .setComponents(
                new client.discord.MessageButton()
                    .setLabel("Se connecter")
                    .setStyle("LINK")
                    .setEmoji("📎")
                    .setURL(config.urlConnect),

                new client.discord.MessageButton()
                    .setLabel("Boutique")
                    .setStyle("LINK")
                    .setEmoji("⭐")
                    .setURL(config.urlBoutique)
            )

        connectionChannel.messages.fetch({ limit: 1 }).then(async messages => {
            if(messages.size < 1){
                await connectionChannel.send({embeds: [embed], components: [buttons]})
            }
        })

    }
}