import { CommandInteraction, InteractionReplyOptions } from 'discord.js'
import joi, { ValidationError } from 'joi'

const MAPPINGS: { [key: string]: string } = {
  notes: 'Interesting Notes',
  postcode: 'Post Code',
  last: 'Last Name'
}

const create = async ({ reply, db, interaction }: {reply(...args: InteractionReplyOptions[]): any, db: LokiConstructor, interaction: CommandInteraction }) => {
  const profile = interaction.options.getString('profile')

  if (!profile) return await reply({ content: 'Error: Missing profile', ephemeral: true })

  const profileSchema = joi.object({
    title: joi.string().required(),
    first: joi.string().required(),
    last: joi.string().required(),
    address0: joi.string(),
    address: joi.string().required(),
    postcode: joi.string().required(),
    tel: joi.number(),
    email: joi.string().required(),
    notes: joi.string()
  })

  try {
    const profiles = db.getCollection('profiles')
    const parsedProfile = JSON.parse(profile)

    const transformed = await profileSchema.validateAsync(parsedProfile)

    const transformedAndParsedProfile = Object.entries(transformed).reduce((prev, [key, value]) => ({
      ...(MAPPINGS[key] && { [MAPPINGS[key]] : value }),
      [key.charAt(0).toUpperCase() + key.slice(1)] : value,
      ...prev
    }), {})

    profiles.insertOne(transformedAndParsedProfile)

    await reply({ content: 'Success: Profile created', ephemeral: true})
  } catch (e) {
    console.log(e)
    if (e instanceof SyntaxError) return await reply({ content: 'Invalid format', ephemeral: true })
    await reply({ content: `Error: Something is not quite right, \n> ${(e as ValidationError).message}`, ephemeral: true})
  }
}

export default create
