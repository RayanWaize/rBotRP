const config = require("../../config.json");

module.exports = {
    name: 'messageCreate',
    async execute(interaction, client) {
        if(interaction.author.id === client.user.id) return;


        if(interaction.channelId === config.channelId[0].tweeter){
            interaction.delete()
            const channel = client.channels.cache.get(interaction.channelId)

            const tweet = new client.discord.MessageEmbed()
                .setTitle("Nouveau Tweet")
                .setAuthor({name: interaction.author.username})
                .setColor(`#00acee`)
                .setDescription(interaction.content)
                .setThumbnail(config.logoTweeter)
                .setFooter({text:`Twitter`, iconURL: config.logoTweeter})
            channel.send({embeds: [tweet]})
        }
    }
}