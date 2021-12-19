import { Interaction, InteractionReplyOptions } from 'discord.js'
import generate from './generate'

const COMMANDS = {
  GENERATE: 'generate'
}

const handleInteraction = async (interaction: Interaction, db: LokiConstructor) => {
  const isCommand = interaction.isCommand()
  if (!isCommand) return

  const { commandName: command } = interaction

  // quick hack to externalise reply without breaking interaction
  const reply = (options: InteractionReplyOptions) => interaction.reply(options)

  switch (command) {
    case COMMANDS.GENERATE:
      await generate({ reply, db, sample: 1 })
      break
    default:
      return
  }

}

export default handleInteraction
