const config = require('../../config.json')
const ms = require('ms')


module.exports = {
    name: 'ready',
    async execute(interaction, client) {
        const voiceCount = await client.channels.cache.get(config.channelId[0].voiceCountChannel)
        const guild = await client.guilds.cache.get(config.discord)

        voiceCount.edit({name: `👥 Membres: ${guild.memberCount}`})

        setInterval (function () {
            voiceCount.edit({name: `👥 Membres: ${guild.memberCount}`})
        }, ms('30m'));
    }
}