const { requiresAuth } = require('express-openid-connect');

// Export requiresAuth so it can be used in other files
module.exports = requiresAuth;
