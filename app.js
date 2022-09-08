//https://hub.packtpub.com/building-movie-api-express/
const express = require('express');
const mongoose = require('mongoose');

const senders = require('./routers/sender');
const parcels = require('./routers/parcel');

const app = express();

app.listen(8080);


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost:27017/week7lab', function (err) {
    if (err) {
        return console.log('Mongoose - connection error:', err);
    }
    console.log('Connect Successfully');

});

//Configuring Endpoints
//Actor RESTFul endpoionts 
app.post('/sender', senders.createOne);
app.get('/sender/:name', senders.getOne);
app.put('/sender', senders.updateOne);
app.put('/sender/parcel', senders.addParcel);
app.delete('/sender', senders.deleteOne);


//Movie RESTFul  endpoints
app.get('/parcel', parcels.getAll);
app.put('/parcel', parcels.updateOne);