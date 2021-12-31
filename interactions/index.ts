import { Interaction, InteractionReplyOptions } from 'discord.js'
import generate from './generate'
import create from './create'
import example from './example_profile'
import image from '../images'

const COMMANDS = {
  GENERATE: 'generate',
  CREATE: 'create',
  EXAMPLE: 'example',
  IMAGE: 'image'
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
    case COMMANDS.CREATE:
      await create({ reply, db, interaction })
      break
    case COMMANDS.EXAMPLE:
      await example(reply)
      break
    case COMMANDS.IMAGE:
      await image({ reply, db, interaction })
      break
    default:
      return
  }

}

export default handleInteraction
