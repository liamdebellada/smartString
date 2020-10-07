//Module imports
import express from "express"
import Discord from "discord.js"

//Init stuff
var app = express()
const client = new Discord.Client();

client.on('ready', () => {
    console.log("Discord connected")
})




client.login('NzU4ODM2NzA3NTc5MTMzOTYz.X20vwQ.8uJDWrbzQ8Y5YuXvawQUCnVpq8o');
app.listen(3000)