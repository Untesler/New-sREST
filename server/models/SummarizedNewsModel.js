const mongoose    = require('mongoose'),
      localOffset = (new Date).getTimezoneOffset() * -60000,
      timestamp   = Date.now(Date.now() + localOffset)

const schema = mongoose.Schema({
    title    : {type:String, required: true},
    content  : {type: String, required: true},
    sourceUrl: {type: String, required: true},
    imageUrl : {type: String, required: true},
    author   : {type: String, required: true},
    publisher: {type: String, required: false},
    category : {type: String, required: false},
    tags     : [ String ],
    language : [ String ],
    publishAt: {type: Date, required: true},
    insertDt : {type: Date, required: true, default: new Date(timestamp)}

}, { collection : 'SummarizedNews' })

module.exports = mongoose.model('SummarizedNewsModel', schema)