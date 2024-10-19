const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db('Application-Tracker').collection('Companies').find();
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
    .collection('Companies')
    .find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createNewCompany = async (req, res) => {
  const newContact = {
    name: req.body.name,
    industry: req.body.industry,
    location: req.body.location,
    contactEmail: req.body.contactEmail,
    website: req.body.website,
    interested: req.body.interested
  };
  const response = await mongodb
    .getDb()
    .db('Application-Tracker')
    .collection('Companies')
    .insertOne(newContact);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || "That didn't work..");
  }
};

// Not yet implemented
const updateCompany = async (/*req, res*/) => {};
const deleteCompany = async (/*req, res*/) => {};

module.exports = { getAll, getSingle, createNewCompany, updateCompany, deleteCompany };
