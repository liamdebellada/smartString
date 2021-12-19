import { SlashCommandBuilder } from '@discordjs/builders'
import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'
import { clientId, guildId, token } from './credentials.json'

const commands = [
  new SlashCommandBuilder().setName('generate').setDescription('Returns one profile'),
  new SlashCommandBuilder().setName('create').setDescription('Creates and inserts one profile').addStringOption(option => option.setName('profile').setDescription('Enter a profile')),
  new SlashCommandBuilder().setName('example').setDescription('Returns an example of how the creation object should look'),
].map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
  .then(() => console.log('Successfully registered application commands.'))
  .catch(console.error);

