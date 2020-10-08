import mongoose from "mongoose"

const Schema = mongoose.Schema;
const topLevels = new Schema({
    tld: String
})

var topLevelTable = mongoose.model('tld', topLevels)

export { topLevelTable }