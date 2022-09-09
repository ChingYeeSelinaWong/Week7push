const mongoose = require('mongoose');
const parcelSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    senders:{
        type: mongoose.Schema.ObjectId,
        ref: 'Sender'
    },
    address:{
        type:String,
        required:true
    },
    weight:{
        type:Number,
        required:true
    },
    isFragile:{
        type:Boolean,
        required:true
    }
});

module.exports = mongoose.model('Parcel',parcelSchema);