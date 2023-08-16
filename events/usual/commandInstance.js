module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {

    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction, client);
    } catch (error) {
        console.error(error);
        return interaction.reply({
            content: "Une erreur s'est produite lors de l'exécution de cette commande !",
            ephemeral: true
        });
        };
    }
}