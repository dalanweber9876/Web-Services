const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    const lists = await mongodb
      .getDb()
      .db('Application-Tracker')
      .collection('Applications')
      .find()
      .toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Must use a valid application id to find an application');
  }

  const userId = new ObjectId(req.params.id);
  try {
    const result = await mongodb
      .getDb()
      .db('Application-Tracker')
      .collection('Applications')
      .find({ _id: userId })
      .toArray();

    if (result.length === 0) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result[0]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const createNewApplication = async (req, res) => {
  const newApplication = {
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
    .insertOne(newApplication);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || "That didn't work..");
  }
};

const updateApplication = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid application id to find a application');
  }
  const id = new ObjectId(req.params.id);
  const updateApplication = {
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
    .replaceOne({ _id: id }, updateApplication);
  if (response.modifiedCount > 0) {
    res.status(204).json(response);
  } else {
    res.status(500).json(response.error || "That didn't work..");
  }
};

const deleteApplication = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid application id to find a application');
  }
  const id = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db('Application-Tracker')
    .collection('Applications')
    .deleteOne({ _id: id });
  if (response.deletedCount > 0) {
    res.status(200).json(response);
  } else {
    res.status(500).json(response.error || "That didn't work..");
  }
};

module.exports = { getAll, getSingle, createNewApplication, updateApplication, deleteApplication };
