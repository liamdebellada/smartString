# Smart String 🧠
Memory DB leveraging the Discord bot API for generic data.

## About

This is a small "joke" project used as a bit of fun for friends on Discord. The main concept is to allow arbitrary documents to be inserted and retrieved through Discord's `/` API. For example: a random list of junk emails or user profiles.

## Configuration and running

1. Create a file named `credentials.json` at the root of the project with the following shape: 
```
"token": "",
"clientId": "",
"guildId": ""
```

Where:
- `token` is your Discord access token used to authenticate
- `clientId` is your Discord clientId used to specify which Application you would like to use alongside your Bot
- `guildId` is the ID of the server you wish to deploy the `/` commands to

<hr />

2. Insert your data
> Note: Data must be in the .csv format, however feel free to change this under `autoLoadCallback`

- Place your `.csv` data at the root of the project with a name of your choice
- Modify the `package.json` to include your data in the ingest script
  - Modify the `CSVPATH` variable to match the location of your `.csv` data
  - Modify the `NAME` variable in the ingest script to anything meaningful
- Run the ingest script: `npm run ingest`

<hr />

3. Deploy Discord commands to the guild specified in the `credentials.json`
- Run the deploy script: `npm run deploycmd`

<hr />

4. Finally start the project 🎉
- Run the start script: `npm run start`
