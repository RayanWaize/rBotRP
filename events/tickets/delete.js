const config = require("../../config.json")
const fs = require('fs');
const { MessageAttachment } = require('discord.js');
const axios = require('axios');
const filePath = './logstickets/';

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (!interaction.isButton()) return;

        if (interaction.customId === "delete-ticket") {

            let contenthaste, idProprietary, user, username;

            const ticketChannel = await client.channels.cache.get(interaction.channelId);
            const logsChannel = await client.channels.cache.get(config.channelId[0]["ticketLogs"])

            await ticketChannel.messages.fetch().then(messages => {

                try {
                    idProprietary = messages.reverse().first().content.split(" ")[3].replace(new RegExp("[^(0-9)]", "g"), '');
                    user = interaction.guild.members.cache.get(idProprietary)
                    if (!user) {
                        username = idProprietary
                    } else {
                        username = user.user.username
                    }
                }catch (e) {
                    username = "undefinified"
                }





                contenthaste = messages.filter(m => m.author.bot !== true).map(m =>
                    `${new Date(m.createdTimestamp).toLocaleString('fr-FR')} - ${m.author.username}#${m.author.discriminator}: ${m.attachments.size > 0 ? m.attachments.first().proxyURL : m.content}`
                ).reverse().join('\n');

            }).then(() => {
                if (contenthaste.length < 1) contenthaste = "Vide.."
                const now = new Date();
                const year = now.getFullYear();
                const month = String(now.getMonth() + 1).padStart(2, '0');
                const day = String(now.getDate()).padStart(2, '0');
                const hour = String(now.getHours()).padStart(2, '0');
                const formattedDate = `${day}_${month}_${year}_${hour}h`;
                const fileName = username + formattedDate
                const fileNameFinal = fileName.replace(/ /g, "_") + '.txt';
                fs.writeFile(filePath + fileNameFinal, contenthaste, (err) => {
                    if (err) throw err;
                    console.log('Fichier créé avec succès');
                  
                    const file = new MessageAttachment(filePath + fileNameFinal);
                  
                    logsChannel.send({files: [file], content: `> Ticket de ${username}\n\n` +
                    "Ici vous pouvez retrouver les logs du ticket précédemment fermer"})
                      .then(() => console.log('Fichier envoyé avec succès'))
                      .catch(console.error);
                });
            })

            interaction.message.reply(`Fermeture du ticket...`).then(() => {
                setTimeout(() => {
                    ticketChannel.delete()
                }, 4000)
            })

            await interaction.deferUpdate()
        }

    }
}