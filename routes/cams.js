const express = require('express'),
    router = express.Router(),
    CamsController = require('../controllers/camsController'),
    cc = new CamsController();

router.get('/camaras', cc.getPanel);


module.exports = router;