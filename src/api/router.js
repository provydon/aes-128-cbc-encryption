'use strict';

// Router
const router = require('express').Router();
const api = require('./index');

// api
router.get('/', api.status);

// Export the router
module.exports = router;