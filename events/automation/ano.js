const config = require('../../config.json')

module.exports = {
    name: 'messageCreate',
    async execute(interaction, client) {
        if(interaction.author.id === client.user.id) return;

        if(interaction.channelId === config.channelId[0].ano){
            interaction.delete()
            const channel = client.channels.cache.get(interaction.channelId)

            const anoMess = new client.discord.MessageEmbed()
                .setTitle("Message Annonyme")
                .setColor(`#000`)
                .setDescription(interaction.content)
                .setThumbnail(config.logoAnnonymous)
                .setFooter({text:`192.168.XX.XX`, iconURL: config.logoAnnonymous})
            channel.send({embeds: [anoMess]})
        }
    }
}