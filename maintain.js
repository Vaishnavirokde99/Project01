const { default: mongoose } = require("mongoose");



const maintainSchema = new mongoose.Schema({
    Status : {
        type:String,
        required:true
    },
    Author : {
        type:String,
        required:true
    },
    Recommended : {
        type:String,
        required:true
    },

})

const collection = new mongoose.model("collection1",maintainSchema);
module.exports = collection;