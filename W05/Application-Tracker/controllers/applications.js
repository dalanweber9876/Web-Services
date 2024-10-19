const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db('Application-Tracker').collection('Applications').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db('Application-Tracker')
    .collection('Applications')
    .find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createNewApplication = async (req, res) => {
  const newContact = {
    position: req.body.position,
    applicationDate: req.body.applicationDate,
    status: req.body.status,
    contactPerson: req.body.contactPerson,
    followUpDate: req.body.followUpDate,
    notes: req.body.notes,
    companyName: req.body.companyName
  };
  const response = await mongodb
    .getDb()
    .db('Application-Tracker')
    .collection('Applications')
    .insertOne(newContact);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || "That didn't work..");
  }
};

// Not yet implemented
const updateApplication = async (/*req, res*/) => {};
const deleteApplication = async (/*req, res*/) => {};

module.exports = { getAll, getSingle, createNewApplication, updateApplication, deleteApplication };
