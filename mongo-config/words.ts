import mongoose from 'mongoose'

const Schema = mongoose.Schema;
const words = new Schema({
    email: String
})

var wordsTable = mongoose.model('words', words)

export { wordsTable }