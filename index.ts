import loki from 'lokijs'
import { Client, Intents } from 'discord.js'
import { token } from './credentials.json'

import { parse } from 'csv-parse/sync'
import { readFile } from 'fs/promises'

import interactions from './interactions'

// init discord
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => console.log('Connected to Discord.'))
client.login(token)

// init db
const db = new loki('data.db', {
  autoload: true,
  autoloadCallback,
  autosave: true,
  autosaveInterval: 4000
})

client.on('interactionCreate', (interaction) => interactions(interaction, db))

async function autoloadCallback (): Promise<void> {
  if (process.env.INGEST) {
    const profiles = db.addCollection(process.env.NAME as string)

    const rawCsvData = await readFile(process.env.CSVPATH as string, 'utf8')
    const [shape, ...parsedCsvData] = parse(rawCsvData)

    const transformedCsvData = parsedCsvData.map((document: Array<string>) => 
      document.reduce((prev, cur, i) => ({...prev, [shape[i]]: document[i]}), {})
    )

    console.log(transformedCsvData)

    profiles.insert(transformedCsvData)
  }
}
