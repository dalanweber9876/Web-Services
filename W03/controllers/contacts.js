const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db('CSE341').collection('Contacts').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db('CSE341').collection('Contacts').find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createNewContact = async (req, res) => {
  const newContact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await mongodb.getDb().db('CSE341').collection('Contacts').insertOne(newContact);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || "That didn't work..");
  }
};

const updateContact = async (req, res) => {
  const id = new ObjectId(req.params.id);
  const updateContact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await mongodb
    .getDb()
    .db('CSE341')
    .collection('Contacts')
    .replaceOne({ _id: id }, updateContact);
  if (response.modifiedCount > 0) {
    res.status(204).json(response);
  } else {
    res.status(500).json(response.error || "That didn't work..");
  }
};

const deleteContact = async (req, res) => {
  const response = await mongodb
    .getDb()
    .db('CSE341')
    .collection('Contacts')
    .deleteOne({ _id: new ObjectId(req.params.id) });
  if (response.deletedCount > 0) {
    res.status(200).json(response);
  } else {
    res.status(500).json(response.error || "That didn't work..");
  }
};

module.exports = { getAll, getSingle, createNewContact, updateContact, deleteContact };
