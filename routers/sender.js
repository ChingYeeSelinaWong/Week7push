const mongoose = require('mongoose');

const Sender = require('../models/sender');
const Parcel = require('../models/parcel');

module.exports = {

    createOne: function (req, res) {
        let newSenderDetails = req.body;
        newSenderDetails._id = new mongoose.Types.ObjectId();
        let sender = new Sender(newSenderDetails);
        sender.save(function (err) {
            res.json(sender);
        });
    },

    getOne: function (req, res) {
        Sender.findOne({ name: req.params.name })
            .populate('parcel')
            .exec(function (err, sender) {
                if (err) return res.json(err);
                if (!sender) return res.json();
                res.json(sender);
            });
    },


    updateOne: function (req, res) {
        Sender.findOneAndUpdate({ _id: req.body.id }, req.body, function (err, sender) {
            if (err) return res.status(400).json(err);
            if (!sender) return res.status(404).json();

            res.json(sender);
        });
    },


    deleteOne: function (req, res) {
        Sender.findOneAndRemove({ _id: req.body.id }, function (err) {
            if (err) return res.status(400).json(err);

            res.json();
        });
    },


    addParcel: function (req, res) {
        Sender.findOne({ _id: req.body.id }, function (err, sender) {
            if (err) return res.status(400).json(err);
            if (!sender) return res.status(404).json();

            let newParcelDetails = req.body.parcel;
            newParcelDetails._id = new mongoose.Types.ObjectId();
            newParcelDetails.senders = req.body.id;

            Parcel.create(newParcelDetails, function (err, parcel) {
                if (err) return res.status(400).json(err);
                // res.json(parcel);
            });

            Parcel.findOne({ senders: req.body.id }, function (err, parcel) {
                if (err) return res.status(400).json(err);
                if (!parcel) return res.status(404).json();
                sender.parcel.push(parcel);
                sender.save(function (err) {
                    if (err) return res.status(500).json(err);

                    res.json(sender);
                });
            })
        });
    }
};