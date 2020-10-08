import mongoose from "mongoose"
import words = require('./mongo-config/words')
import tlds = require('./mongo-config/topLevel')

//email regex
const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

class commands {
    command: string;
    constructor(c: string) {
        this.command = c;
    }

    async process(num: any, limit: boolean = true) {
        if (limit && num > 5) {
            return ["Error: Maximum is 5"]
        }
        var compiled: any = []
        for (var i = 0; i < num; i++) {
            var e: any = []
            var emails = await words.wordsTable.aggregate([{ $match: { email: { $regex: "@", "$options": "i" } } },{ $sample: { size: 2 } }])
            .then(response => response)
            .catch(error => error)
            var tld = await tlds.topLevelTable.aggregate([{ $sample: { size: 1 } }])
            .then(response => response)
            .catch(error => error)
            emails.forEach(function(em: any) {
                e.push(em.email)
            })
            compiled.push(`${e[0].split("@")[0]}@${e[1].split("@")[1]}.${tld[0].tld.toLowerCase()}`)
        }

        return compiled
    }
}

class contribute {
    command: string;
    constructor(c: string) {
        this.command = c;
    }

    async process(contribution: any) {
        if(re.test(contribution)) {
            var done = await words.wordsTable.create({email : contribution})
            .then(() => true)
            .catch(() => false)
            return done
        } else {
            return "iv"
        }
    }
}

class swear {
    command: string;
    constructor(c: string) {
        this.command = c;
    }

    process() {
        return "sw"
    }
}

export { commands, contribute, swear }