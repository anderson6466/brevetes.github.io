const express = require('express');
const router = express.Router();
const isLoggedIn = require('../midlewares/index').isLoggedIn;
const CategoriesController = require('../controllers/categoriesController'),
    cc = new CategoriesController();

/* GET home page. */
router
    .get('/', function(req, res, next) {
        let login = false;
        if(req.session.login){
            login = true
        }
        res.render('index', {
            title: 'DISEIM SAC',
            login: login
        });
    })
    .post('/login', cc.login)

    // Rutas protegidas:
    .get('/ai', isLoggedIn, cc.getAi)
    .get('/aiia', isLoggedIn, cc.getAiia)
    .get('/aiib', isLoggedIn, cc.getAiib)
    .get('/aiiia', isLoggedIn, cc.getAiiia)
    .get('/aiiib', isLoggedIn, cc.getAiiib)
    .get('/aiiic', isLoggedIn, cc.getAiiic)
    .get('/senales', isLoggedIn, cc.getSignals)

    .post('/check', isLoggedIn, cc.check)
    .post('/validate', isLoggedIn, cc.validate)



module.exports = router;