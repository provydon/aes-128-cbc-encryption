'use strict';

// Router
const router = require('express').Router();
const api = require('./index');

// api
router.get('/', api.status);
router.post('/encrypt', api.encrypt);
router.post('/decrypt', api.decrypt);

// Export the router
module.exports = router;