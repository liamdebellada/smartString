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

  const profileSample = profiles.chain()
  .offset(Math.floor(Math.random() * size))
  .limit(sample * 10) // maximum potential fields
  .data()

  let hasEnoughKeys = true

  profileSample.forEach(profile => { Object.keys(profile).length < 10 && (hasEnoughKeys = false) }) // if something in our sample does not have enough keys to mash we will use the first item instead

  const profile = () => profileSample.reduce((prev, current, index) => {
    const key = Object.keys(current)[index]
    return { ...prev, [key]: current[key] }
  }, {})

  await reply({ content: buildPrettyReply(hasEnoughKeys ? profile() : profileSample[0]), ephemeral: false})
}

export default generate
