"use strict";
var mysql = require('mysql');

var mysql_pool= mysql.createPool({
    connectionLimit : 100,
      host : 'db4free.net',
      database : 'servidormtc',
      user : 'servidormtc',
      password : 'Afp123$$',
      port:3306,
      
  });
class CategoriesController{


    

    getAi(req, res, next){
        let data = require('../data/generales');
        let array = getList(data.questions.length);
        let newRandom = randomFromListGenerator(array);
        let questions = {
            questions: []
        };
        for(let i = 0; i < 40; i++){
            
            questions.questions.push(data.questions[newRandom()])

           // console.log(questions.questions);
            //console.log(newRandom());
        }

        res.render('questions', {
           title: "Simulador de examen: Categoría AI",
           questions: questions.questions,
       
        });
    }

    getAiia(req, res, next){
        let data_g = require('../data/generales');
        let data_aiia = require('../data/aiia');
        let array_g = getList(data_g.questions.length);
        let array_aiia = getList(data_aiia.questions.length);
        let newRandom_g = randomFromListGenerator(array_g);
        let newRandom_aiia = randomFromListGenerator(array_aiia);
        let questions = {
            questions: []
        };
        for(let i = 0; i < 20; i++)
            questions.questions.push(data_g.questions[newRandom_g()])
        for(let i = 0; i < 20; i++)
            questions.questions.push(data_aiia.questions[newRandom_aiia()])
        res.render('questions', {
            title: "Simulador de examen: Categoría AIIa",
            questions: questions.questions
        });
    }

    getAiib(req, res, next){
        let data_g = require('../data/generales');
        let data_aiib = require('../data/aiib');
        let array_g = getList(data_g.questions.length);
        let array_aiib = getList(data_aiib.questions.length);
        let newRandom_g = randomFromListGenerator(array_g);
        let newRandom_aiib = randomFromListGenerator(array_aiib);
        let questions = {
            questions: []
        };
        for(let i = 0; i < 20; i++)
            questions.questions.push(data_g.questions[newRandom_g()])
        for(let i = 0; i < 20; i++)
            questions.questions.push(data_aiib.questions[newRandom_aiib()])
        res.render('questions', {
            title: "Simulador de examen: Categoría AIIb",
            questions: questions.questions
        });
    }

    getAiiia(req, res, next){
        let data_g = require('../data/generales');
        let data_aiiia = require('../data/aiiia');
        let array_g = getList(data_g.questions.length);
        let array_aiiia = getList(data_aiiia.questions.length);
        let newRandom_g = randomFromListGenerator(array_g);
        let newRandom_aiiia = randomFromListGenerator(array_aiiia);
        let questions = {
            questions: []
        };
        for(let i = 0; i < 20; i++)
            questions.questions.push(data_g.questions[newRandom_g()])
        for(let i = 0; i < 20; i++)
            questions.questions.push(data_aiiia.questions[newRandom_aiiia()])
        res.render('questions', {
            title: "Simulador de examen: Categoría AIIb",
            questions: questions.questions
        });
    }

    getAiiib(req, res, next){
        let data_g = require('../data/generales');
        let data_aiiib = require('../data/aiiib');
        let array_g = getList(data_g.questions.length);
        let array_aiiib = getList(data_aiiib.questions.length);
        let newRandom_g = randomFromListGenerator(array_g);
        let newRandom_aiiib = randomFromListGenerator(array_aiiib);
        let questions = {
            questions: []
        };
        for(let i = 0; i < 20; i++)
            questions.questions.push(data_g.questions[newRandom_g()])
        for(let i = 0; i < 20; i++)
            questions.questions.push(data_aiiib.questions[newRandom_aiiib()])
        res.render('questions', {
            title: "Simulador de examen: Categoría AIIIb",
            questions: questions.questions
        });
    }

    getAiiic(req, res, next){
        let data_g = require('../data/generales');
        let data_aiiia = require('../data/aiiic');
        let array_g = getList(data_g.questions.length);
        let array_aiiia = getList(data_aiiia.questions.length);
        let newRandom_g = randomFromListGenerator(array_g);
        let newRandom_aiiia = randomFromListGenerator(array_aiiia);
        let questions = {
            questions: []
        };
        for(let i = 0; i < 20; i++)
            questions.questions.push(data_g.questions[newRandom_g()])
        for(let i = 0; i < 20; i++)
            questions.questions.push(data_aiiia.questions[newRandom_aiiia()])
        res.render('questions', {
            title: "Simulador de examen: Categoría AIIIc",
            questions: questions.questions
        });
    }

    getSignals(req, res, next){
        console.log("entré ");
        let data_sen = require('../data/señales');
        let array_sen = getList(data_sen.questions.length);
        let newRandom_g = randomFromListGenerator(array_sen);
        let questions = {
            questions: []
        };
        for(let i = 0; i < 40; i++)
            questions.questions.push(data_sen.questions[newRandom_g()])
        console.log(questions);
        res.render('questions', {
            title: "Simulador de examen: Señales",
            questions: questions.questions
        });
    }

    check(req, res, next){
        let questionData = req.body.questionData,
            responses = req.body.responses,
            rights = req.body.score,
            reviewed = req.body.reviewed,
            percentage = rights/40*100,
            incorrect = 40 - rights;
        //console.log(responses);
        res.render(
            'check',
            {
                rights: rights,
                incorrect: incorrect,
                percentage: percentage,
                reviewed: JSON.parse(reviewed),
                questionData: questionData,
                responses: responses
            }
        );
    }

    validate(req, res, next){
        let questionData = req.body.questionData;
        let check = req.body.check;
        let reviewed = req.body.reviewed;
        let responses = req.body.responses;

        res.render(
            'questions',
            {
                title: 'Corrección de preguntas',
                questions: JSON.parse(questionData),
                check: check,
                reviewed: reviewed,
                responses: responses

            }
        );
    }

    login(req, res, next){
 
        var query ="select p.correo , f.descripcion as Categoria, e.descripcion from postulante  p inner  join  perfil f on f.idperfil=p.idestado "+
        "inner join    estado e on e.idestado=p.idestado   where   p.idperfil !=2    and    correo ='"+req.body.user+"' and pass='"+req.body.password+"' ";
         
        let password = req.body.password;
        let category = req.body.category.toString();
         
      
         mysql_pool.getConnection(function(err, connection) {
        if (err) {
            connection.release();
              console.log(' Error getting mysql_pool connection: ' + err);
              throw err;
          }
        connection.query(query, function(err2, results1, fields) {	
            if (err2) {
                var data = { "Time":"", "DatabaseStatus":"" };
                data["Time"] = (new Date()).getTime();
                data["DatabaseStatus"] = "Down";
                res.json(data); 
            } else {
      
      
            const  listapendientes=   JSON.parse(   JSON.stringify(results1));
            console.log(listapendientes.length);
         if(listapendientes.length!=0 ){
                console.log(listapendientes);
            //category=listapendientes[0].Categoria
            if(listapendientes[0].descripcion == 'activo'){
                req.session.login = true;

                switch (category){
                    case 'AI':
                        res.redirect('/ai');
                        break;
                    case 'AIIa':
                        res.redirect('/aiia');
                        break;
                    case 'AIIb':
                        res.redirect('/aiib');
                        break;
                    case 'AIIIa':
                        res.redirect('/aiiia');
                        break;
                    case 'AIIIb':
                        res.redirect('/aiiib');
                        break;
                    case 'AIIIc':
                        res.redirect('/aiiic');
                        break;
                    case 'Señales':
                        console.log("entré a señales");
                        res.redirect('/senales');
                        break;
                }
            }
        }
            else {
                res.redirect('/');
            }









         var  respuesta = {
                 error: false,
                 codigo: 200,
                 Lista: listapendientes,
                 
                };
               // res.send(respuesta);
            
            console.log(respuesta);
            }
            console.log(' mysql_pool.release()');
            connection.release();
        });
      });
      

       
        const pass = require('../data/security/pass').pass.toString();

        console.log(category);

       
    }
}

function randomFromListGenerator(list){
    var position = 0;

    for (var i=0, l=list.length; i<l; i++) {
        var random = Math.floor((Math.random() * l));
        var aux = list[i];
        list[i] = list[random];
        list[random] = aux;
    }

    return function () {
        return list[position++ % list.length];
    }
}

function getList(n){
    let list = [];
    for(let i = 0; i<n; i++){
        list.push(i);
    }
    return list;
}

module.exports = CategoriesController;