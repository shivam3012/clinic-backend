const express = require('express');
const router = express.Router();
const SignatureController = require("../controller/signature");

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
    res.send('OK')
);

router.post('/sign', SignatureController.signData);

module.exports = router;