const buildPrettyReply = (
  {
    $loki,
    meta,
    ...profile
  }:
  {
    $loki: number,
    meta: Object,
    profile: any
  }
) => Object.entries(profile).reduce((prev, [k, v]) => `${prev}\n> **${k}**: ${v}`, '')


const generate = async ({ reply, db, sample }: {reply: Function, db: LokiConstructor, sample: number}) => {
  const profiles = db.getCollection('profiles')

  const size = profiles.count()

  const [ profile ] = profiles.chain()
  .offset(Math.floor(Math.random() * size))
  .limit(sample)
  .data()

  await reply({ content: buildPrettyReply(profile), ephemeral: false})
}

export default generate
