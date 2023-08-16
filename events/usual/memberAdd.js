const config = require('../../config.json')

module.exports = {
    name: 'guildMemberAdd',
    async execute(interaction, client) {

        const embed = new client.discord.MessageEmbed()
            .setTitle("Nouveau Membre")
            .setThumbnail(config.logo)
            .setColor(config.colorDiscord)
            .setDescription(`Le membre ${interaction.user.username} à rejoint ${config.discordName} RP,\nc'est le **${interaction.guild.memberCount}ème** utilisateur.`)
            .setFooter({text: config.discordName, iconURL: config.logo})

        if(interaction.guild.id === config.discord){
            const channel = client.channels.cache.get(config.channelId[0].welcomChannel)

            interaction.roles.add(config.addRoleNewMember)
            channel.send({embeds: [embed]})
        }
    }
}