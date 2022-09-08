var Sender = require('../models/sender');
var Parcel = require('../models/parcel');
const mongoose = require('mongoose');

module.exports = {

    getAll: function (req, res) {
        Parcel.find({address: req.query.address},
            function (err, parcels) {
            if (err) return res.status(400).json(err);

            res.json(parcels);
        });
    },
    updateOne: function (req, res) {
        Parcel.findOneAndUpdate({ _id: req.body.id }, req.body.address, function (err, parcel) {
            if (err) return res.status(400).json(err);
            if (!parcel) return res.status(404).json();

            res.json(parcel);
        });
    },
};