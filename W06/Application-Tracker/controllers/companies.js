const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    const lists = await mongodb
      .getDb()
      .db('Application-Tracker')
      .collection('Companies')
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
    return res.status(400).json('Must use a valid company id to find a company');
  }

  const userId = new ObjectId(req.params.id);
  try {
    const result = await mongodb
      .getDb()
      .db('Application-Tracker')
      .collection('Companies')
      .find({ _id: userId })
      .toArray();

    if (result.length === 0) {
      return res.status(404).json({ message: 'Company not found' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result[0]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const createNewCompany = async (req, res) => {
  const newCompany = {
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
    .insertOne(newCompany);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || "That didn't work..");
  }
};

const updateCompany = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid company id to find a company');
  }
  const id = new ObjectId(req.params.id);
  const updateCompany = {
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
    .replaceOne({ _id: id }, updateCompany);
  if (response.modifiedCount > 0) {
    res.status(204).json(response);
  } else {
    res.status(500).json(response.error || "That didn't work..");
  }
};

const deleteCompany = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid company id to find a company');
  }
  const id = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db('Application-Tracker')
    .collection('Companies')
    .deleteOne({ _id: id });
  if (response.deletedCount > 0) {
    res.status(200).json(response);
  } else {
    res.status(500).json(response.error || "That didn't work..");
  }
};

module.exports = { getAll, getSingle, createNewCompany, updateCompany, deleteCompany };
