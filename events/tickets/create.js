const config = require('../../config.json')

module.exports = {
name: 'ready',
    async execute(interaction, client) {
        const ticketChannel = client.channels.cache.get(config.channelId[0]['ticketChannel'])
        const ticketCat = client.channels.cache.get(config.channelId[0]['ticketCat'])

        const ticketEmbed = new client.discord.MessageEmbed()
            .setTitle(`${config.discordName} Ticket`)
            .setColor(config.colorDiscord)
            .setThumbnail(config.logoDiscord)
            .setDescription("> Comment ouvrir un ticket ?\n\nVous devez simplement choisir dans le menu deroulant la raison de l'ouverture de votre ticket si aucun ne correspond à votre demande cliquez sur `Question Générale` après avoir clique cela ouvrira en salon privé que seuls vous et l'équipe du staff ayant accès vous pourrez donc nous parler à l'abri des regards indiscrets.")
            .setFooter({text:`Ticket ${config.discordName}`, iconURL: config.logo})

        const ticketcollector = new client.discord.MessageActionRow()
            .addComponents(
                new client.discord.MessageSelectMenu()
                    .setCustomId('category')
                    .setPlaceholder('Séléctionnez la catégorie du ticket')
                    .addOptions([{
                        label: 'Question Générale',
                        value: 'global',
                        emoji: '🌐',
                        description: 'Pour toute question ou problème.',
                    },
                    {
                        label: 'Paiement et Boutique',
                        value: 'pay',
                        emoji: '💸',
                        description: 'Si vous avez un problème avec la boutique.',
                    },
                    {
                        label: "Candidature et Recrutement",
                        value: 'candid',
                        emoji: '📝',
                        description: 'Si vous souhaitez travailler avec nous.',
                    },
                ]),
            );


        let message

        ticketChannel.messages.fetch({ limit: 1 }).then(async messages => {
            if(messages.size < 1){
                message = await ticketChannel.send({embeds: [ticketEmbed], components: [ticketcollector]})
            }else{
                message = messages.first()
            }
        }).then(() => {

            const collector = message.createMessageComponentCollector({
                componentType: 'SELECT_MENU',
                time: 0
            });

            collector.on('collect', async i => {


                    let role = i.guild.roles.cache.get(config.ticketPerm[0][i.values[0]])

                    i.guild.channels.create(`${config.ticketEmoji[0][i.values[0]]}・ticket-${i.user.username}`, {
                        type: 'GUILD_TEXT',
                        parent: ticketCat.id,
                        topic: `Ticket: ${config.discordName}-${i.user.id}`,
                        permissionOverwrites: [{
                            id: i.user.id,
                            allow: ['VIEW_CHANNEL','SEND_MESSAGES','ATTACH_FILES'],
                        },
                            {
                                id: role.id,
                                allow: ['VIEW_CHANNEL','SEND_MESSAGES'],
                            },
                            {
                                id: i.guild.roles.everyone,
                                deny: ['VIEW_CHANNEL'],
                            }
                        ],
                    }).then(channel => {
                        const embedTicket = new client.discord.MessageEmbed()
                            .setTitle(`Ticket ${config.discordName}`)
                            .setDescription(`> Catégorie: **${config.ticketType[0][i.values[0]]}**\n\nCe salon n'est visible que par les membres du staff\n` +
                                "dans le but d'assurer la sécurité\n" +
                                "des informations que vous pourrez être amené à\n" +
                                "nous transmettre.\n" +
                                "\n" +
                                "Veuillez décrire votre **question/problème** ci-dessous")
                            .setColor(config.colorDiscord)

                            .setThumbnail(config.logoDiscord)
                            .setFooter({text:`Ticket ${config.discordName}`, iconURL: config.logo})

                        const deleteButton = new client.discord.MessageActionRow()
                            .addComponents(
                                new client.discord.MessageButton()
                                    .setCustomId('delete-ticket')
                                    .setLabel('Fermer le ticket')
                                    .setEmoji('🗑️')
                                    .setStyle('DANGER')
                            );

                        channel.send({content:`> Ticket de ${i.user}`, embeds: [embedTicket], components: [deleteButton]})


                    })


                i.update({embeds: [ticketEmbed], components: [ticketcollector]})


            })
        })
    }
}

