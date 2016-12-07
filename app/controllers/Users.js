/**
 * Created by Pierre on 30/11/2016.
 */
'use strict';


const models  = require('../models');

var Users = {
    index: function (req, res) {
        models
            .User
            .findAll()
            .then(function(users) {
                res.render('index', {
                    users: users
                });
            });

    },
    create: function (req, res) {
        if(req.body.name && req.body.firstname && req.body.password){
            console.log("well input");
            models.User.find({
                where: {
                    name: req.body.name,
                    firstname: req.body.firstname
                }
            }).then( function(user){
                console.log(user);
                if(user!=null){
                    console.log("not null");
                    return false;
                }
                else
                    console.log("null");
                return true;
            }).then( function(bool){
                if(bool){
                    models.User.create({ name: req.body.name, firstname: req.body.firstname, password: req.body.password}).then(function(){
                        console.log({error : null});
                    }, function () {
                        console.log({error : '1'});
                    });
                }
                else
                    console.log("user already exist");
            }).then( function () {
                res.redirect('/users');
            });
        }
        else{
            console.log("error: no input");
            res.redirect("/users/inscription");
        }
    },
    update: function (req, res){
        models.User
            .find({
                where: {
                    name: req.body.name,
                    firstname: req.body.firstname
                }
            })
            .then( function (user) {
                user.update({
                    password: req.body.password
                }).then(function(){
                    console.log({error : null});
                }, function () {
                    console.log({error : '1'});
                });
            }).then( function (){
            res.redirect('/users');
        });
    },
    delete: function (req, res) {
        models.User
            .find({
                where: {
                    name: req.body.name,
                    firstname: req.body.firstname
                }
            })
            .then( function (user) {
                user.destroy({
                    where: {},
                    truncate: true
                }).then(function(){
                    console.log({error : null});
                }, function () {
                    console.log({error : '1'});
                });
            }).then( function (){
            res.redirect('/users');
        });
    }
};

module.exports = Users;