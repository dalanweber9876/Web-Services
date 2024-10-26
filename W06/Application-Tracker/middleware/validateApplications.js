const validator = require('../helpers/validate');

const saveApplication = (req, res, next) => {
  const validationRule = {
    position: 'required|string',
    applicationDate: 'required|strict_date_us',
    status: 'required|string',
    contactPerson: 'required|string',
    followUpDate: 'strict_date_us',
    notes: 'string',
    companyName: 'required|string'
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
  saveApplication
};
