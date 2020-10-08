//Module imports
import express from "express"
import Discord from "discord.js"
import {TextChannel} from "discord.js"
import mongoose from "mongoose"
import compileEmail = require('./compileEmail')


//Init stuff
var app = express()
const client = new Discord.Client();
var CHAT = {}
const COMMMANDS = [new compileEmail.commands("-link"), new compileEmail.contribute("-contribute"), new compileEmail.swear("-swear")]


//mongo connection
mongoose.connect('mongodb://localhost:27017', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

//create message send function
var sendMsg = (content: String) => {
    (CHAT as TextChannel).send(content)
}


client.on('message', async message => {
    if (!message.author.bot) {
        var data = message.content.split(" ")
        var requestedProcess = COMMMANDS.filter(function(cmd) {return cmd.command == data[0]})
        if (requestedProcess.length == 1) {
            if (requestedProcess[0].process(0) == "sw") {
                sendMsg("")
            } else {
                if (data[1]) {
                    var response = await requestedProcess[0].process(data[1])
                    if (typeof(response) == "object") {
                        sendMsg(response)
                    }
                    if (response == true) {
                        sendMsg(`Added ${data[1]}`)
                    } else if (!response) {
                        sendMsg("An error occured.")
                    } else if (response == "iv") {
                        sendMsg("Invalid email format")
                    }
                } else {
                    sendMsg("Invalid command usage")
                }
            }
        }
    }
})

client.on('ready', () => {
    console.log("Discord connected")
    CHAT = client.channels.cache.get('668582160864641034')
})

app.get('/generate', async (req, res) => {
    var data = await COMMMANDS[0].process(100, false)
    res.json(data)
})


client.login('NzU4ODM2NzA3NTc5MTMzOTYz.X20vwQ.AFhpSbSYlge13eTshWdSigHzaX4');
app.listen(3000, '192.168.1.225')