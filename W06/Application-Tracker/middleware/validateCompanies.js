const validator = require('../helpers/validate');

const saveCompany = (req, res, next) => {
  const validationRule = {
    name: 'required|string',
    industry: 'string',
    location: 'required|string',
    contactEmail: 'email',
    website: 'url',
    interested: 'required|boolean'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveCompany
};
