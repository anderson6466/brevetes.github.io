"use strict";

class CamsController {
    getPanel(req, res, next){
        res.render('cams', {
            title: "Acceso a cámaras."
        });
    }
}

module.exports = CamsController;