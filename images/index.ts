import steam from './steam/builder'
import { CommandInteraction, InteractionReplyOptions, MessageAttachment } from 'discord.js'

const TYPES = {
  STEAM: 'steam'
}

const image = async (
  {
    db,
    reply,
    interaction
  }:
  {
  db: LokiConstructor,
  reply(...args: InteractionReplyOptions[]): any,
  interaction: CommandInteraction
  }
) => {
  const type = interaction.options.getString('type')

  if (!type) return await reply({ content: 'Please specify a type', ephemeral: true })

  let image

  switch (type) {
    case TYPES.STEAM:
      image = await steam(db)
      break
    default:
      return await reply({ content: 'Please specify a valid type', ephemeral: true })
  }

  const attatchment = new MessageAttachment(image, `${type}.png`)

  await reply({ ephemeral: false, files: [attatchment] })
}

export default image
