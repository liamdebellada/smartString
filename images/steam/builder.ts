import { readFileSync } from 'fs'
import fetch from 'node-fetch'
import builder from '../builder'

const build = async (db: LokiConstructor): Promise<Buffer> => {
  const profiles = db.getCollection('profiles')

  const size = profiles.count()

  const [ profile ] = profiles.chain()
  .offset(Math.floor(Math.random() * size))
  .limit(1)
  .data()

  const picture = 'https://thispersondoesnotexist.com/image'
  const username = `${profile.Title} ${profile.First || profile['First Name']} ${profile.Last || profile['Last Name']}`
  let bio = profile['Interesting Notes']

  if (!bio) {
     const response = await fetch('https://insult.mattbas.org/api/insult')
     const altBio = await response.text()
     bio = altBio
  }

  const data = {
    picture,
    username,
    bio,
    level: 23
  }

  const html = readFileSync('/home/liam/Documents/emails/images/steam/template.html', 'utf-8')
  const builtImage = await builder(html, data)
  return builtImage
}

export default build
