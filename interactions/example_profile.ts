const EXAMPLE_PROFILE = {
  "title": '',
  "first": '',
  "last": '',
  "address": '',
  "postcode": '',
  "email": '',
  "notes": ''
}

const example = async (reply: Function) => await reply({
  content: "```json\n" + JSON.stringify(EXAMPLE_PROFILE, null, 2) + "```" + "` " + JSON.stringify(EXAMPLE_PROFILE) + "`",
  ephemeral: true
})

export default example
