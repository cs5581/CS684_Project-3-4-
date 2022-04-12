const LocalStrategy = require('passport-local').Strategy;
const express = require('express')
const axios = require('axios')
const newsr=express.Router()
const app=express()
const moment = require('moment')
const exp = require('constants')
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('API_KEY');
const mysql = require('mysql')

const math = require('math')
const { Router, response } = require('express')
const path = require('path');


app.locals.moment = moment;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'overalls',
    database: 'usersDB'
})

connection.connect(function(err) {
    if (err) throw err;
    console.log("Database connected!");
});


module.exports = function(app, passport) {

    app.get('/sports',async(req,res)=>{

        try {
            var url = 'https://newsapi.org/v2/top-headlines/sources?category=sports&apiKey=c311a717afc94a8a8ee4c60a86822b08';
            const news_get =await axios.get(url)
            // console.log(news_get.data.sources)
            res.render('category'
            ,{articles:news_get.data.sources}
            )
    
        } catch (error) {
            if(error.response){
                console.log(error)
            }
    
        }
    });
    app.get('/technology',async(req,res)=>{
        try {
            var url = 'https://newsapi.org/v2/top-headlines/sources?category=technology&apiKey=c311a717afc94a8a8ee4c60a86822b08';
            const news_get =await axios.get(url)
            // console.log(news_get.data.sources)
            res.render('category'
            ,{articles:news_get.data.sources}
            )
    
        } catch (error) {
            if(error.response){
                console.log(error)
            }
    
        }
    });
    app.get('/entertainment',async(req,res)=>{
        try {
            var url = 'https://newsapi.org/v2/top-headlines/sources?category=entertainment&apiKey=c311a717afc94a8a8ee4c60a86822b08';
            const news_get =await axios.get(url)
            // console.log(news_get.data.sources)
            res.render('category'
            ,{articles:news_get.data.sources}
            )
    
        } catch (error) {
            if(error.response){
                console.log(error)
            }
    
        }
    });
    app.get('/business',async(req,res)=>{
        try {
            var url = 'https://newsapi.org/v2/top-headlines/sources?category=business&apiKey=c311a717afc94a8a8ee4c60a86822b08';
            const news_get =await axios.get(url)
            // console.log(news_get.data.sources)
            res.render('category'
            ,{articles:news_get.data.sources}
            )
    
        } catch (error) {
            if(error.response){
                console.log(error)
            }
    
        }
    });
    app.get('/science',async(req,res)=>{

        try {
            var url = 'https://newsapi.org/v2/top-headlines/sources?category=science&apiKey=c311a717afc94a8a8ee4c60a86822b08';
            const news_get =await axios.get(url)
            // console.log(news_get.data.sources)
            res.render('category'
            ,{articles:news_get.data.sources}
            )
    
        } catch (error) {
            if(error.response){
                console.log(error)
            }
    
        }
    });


    app.post('/search',async(req,res)=>{
        const search=req.body.search
        // console.log(req.body.search)
    
        try {
            var url = `http://newsapi.org/v2/everything?q=${search}&apiKey=c311a717afc94a8a8ee4c60a86822b08`
    
            const news_get =await axios.get(url)
            res.render('myDashboard',{username:req.user,articles:news_get.data.articles})
    
        } catch (error) {
            if(error.response){
                console.log(error)
            }
    
        }
    })


    app.get('/', 
    async(req,res)=>{


        try {
            var url = 'https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=c311a717afc94a8a8ee4c60a86822b08';
    
            const news_get =await axios.get(url)
            // console.log(news_get.data.articles)
            
            res.render('news'
            ,{articles:news_get.data.articles}
            )
    
        } catch (error) {
            if(error.response){
                console.log(error)
            }
    
        }
    });
    app.get('/myDashboard', isLoggedIn, async (req, res) => {
        var newsArray = [];
        var username = req.user;
        console.log("Your username is "+req.user)
        var username ="erica";
        var sports = false;
        var technology = false;
        var business = false;
        var science = false;
        var entertainment = false;
        var subjects=[];


        var username ="erica";
        connection.query('SELECT subject FROM mySubjects WHERE username=?',[username],function(error,results,fields){
            if(error){
                throw error;
            }
            if(results.length>0){
                results.forEach((result)=>{
                    subjects.push(result.subject);
                })
            } else{
                console.log("theres nothing here")
            }
            console.log("The subjects for the dashboard are "+ subjects)
            if(subjects.includes("sports")) {
                sports=true;
            }
            if(subjects.includes("technology")) {
                technology=true;
            }
            if(subjects.includes("entertainment")) {
                entertainment=true;
            }
            if(subjects.includes("science")) {
                science=true;
            }
            if(subjects.includes("business")) {
                business=true;
            }

            
            // res.render('settings',{username:req.user,message: "",sports:sports,technology:technology,entertainment:entertainment,science:science,business:business})

        })

        try {
            var url = 'https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=c311a717afc94a8a8ee4c60a86822b08';
    
            const news_get =await axios.get(url)
            // console.log(news_get.data.articles)
            res.render('myDashboard'
            ,{username:req.user,articles:news_get.data.articles,subjects:subjects}
            )
    
        } catch (error) {
            if(error.response){
                console.log(error)
            }
    
        }
    

        // res.render('myDashboard',{username:req.user});
    });

    app.get('/login', (req, res) => {
        res.render('login');
    });

    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/login');
    });

    app.get('/test',function(req,res){
        console.log("Here is the req "+req);
        console.log("Here is the req.user "+req.user);
        res.json(req.user);
    });

    app.post('/login', passport.authenticate('local', {
        failureRedirect: '/login',
        successRedirect: '/myDashboard'
    }));

    passport.use(new LocalStrategy({
        usernameField:'username',
        passwordField:'password',
        passReqToCallback:true
    },
        (req,username, password, done) => 

        {
            if(username && password) {

                connection.query('SELECT * FROM users WHERE username = ? AND password = ?',[username,password],function(error,results,fields){
                    if(error){throw error}
                    if(results.length>0){
                        console.log('you GOT LOGGED IN!')
                        return done(null, username);
                    } else{
                        console.log('INVALID USERNAME PASSWORD')
                        return done(null, false,{message:"You failed to log in."});
                    }


                })


                // return done(null, {username: username});
            } else {


                // return done(null, false);
            }
        }
        
        
        // {
        //     if(username === 'test@gmail.com' && password === '1234') {
        //         return done(null, {username: 'test@gmail.com'});
        //     } else {
        //         return done(null, false);
        //     }
        // }
    ));

    passport.serializeUser((user, done) => {
        return done(null, user);
    });

    passport.deserializeUser((user, done) => {
 
        return done(null, user);
    }); 

    function isLoggedIn(req, res, done) {
        if(req.user){
            return done();
        }
        return res.redirect('/login');

        // if(req.isAuthenticated()) {
        //     return next();
        // } else {
        //     return res.redirect('/login');
        // }
    }






    app.get('/aboutUs',isLoggedIn,function(req,res) {
        //this needs to show the current SETTINGS FROM SQL -__- render the array in CHECKBOXES!!
        res.render('settings',{username:req.user,message: ""})
    })

    app.get('/signUp',function(request,response) {
        response.render('signUp')
    })
    function getMySettings(){

    }
    function renderMySettingsPage(){
        var username ="erica";
        var sports = false;
        var technology = false;
        var business = false;
        var science = false;
        var entertainment = false;
        var subjects=[];


        var username ="erica";
        connection.query('SELECT subject FROM mySubjects WHERE username=?',[username],function(error,results,fields){
            if(error){
                throw error;
            }
            if(results.length>0){
                results.forEach((result)=>{
                    subjects.push(result.subject);
                })
            } else{
                console.log("theres nothing here")
            }
            console.log("The subjects are "+ subjects)
            if(subjects.includes("sports")) {
                sports=true;
            }
            if(subjects.includes("technology")) {
                technology=true;
            }
            if(subjects.includes("entertainment")) {
                entertainment=true;
            }
            if(subjects.includes("science")) {
                science=true;
            }
            if(subjects.includes("business")) {
                business=true;
            }
            res.render('settings',{username:req.user,message: "",sports:sports,technology:technology,entertainment:entertainment,science:science,business:business})

        })

    }

    app.get('/mySettings',function(req,res){
        // var username=req.body.username;
        var username ="erica";
        var sports = false;
        var technology = false;
        var business = false;
        var science = false;
        var entertainment = false;
        var subjects=[];


        var username ="erica";
        connection.query('SELECT subject FROM mySubjects WHERE username=?',[username],function(error,results,fields){
            if(error){
                throw error;
            }
            if(results.length>0){
                results.forEach((result)=>{
                    subjects.push(result.subject);
                })
            } else{
                console.log("theres nothing here")
            }
            console.log("The subjects are "+ subjects)
            if(subjects.includes("sports")) {
                sports=true;
            }
            if(subjects.includes("technology")) {
                technology=true;
            }
            if(subjects.includes("entertainment")) {
                entertainment=true;
            }
            if(subjects.includes("science")) {
                science=true;
            }
            if(subjects.includes("business")) {
                business=true;
            }
            res.render('settings',{username:req.user,message: "",sports:sports,technology:technology,entertainment:entertainment,science:science,business:business})

        })


    })

    app.post('/mySettings',function(request,response){
           //replace with current session USERNAME
    // var username = request.user;
    var sports = false;
    var technology = false;
    var business = false;
    var science = false;
    var entertainment = false;
    var username = "erica";
    var subject = "";

    connection.query('DELETE FROM mySubjects WHERE username=?',[username],function(error,results,fields){
        if(error){
            throw error;
        }
        if(results>0){
            console.log("The deletion results are "+results);
        }

    })

    if(request.body.sports){
        var subject = "sports";
        connection.query('INSERT INTO mySubjects(username,subject) VALUES(?,?)',[username,subject],function(error,results,fields) {
            if (error) {
                console.log(error)
            }
            console.log(results)   
            sports=true;      
        }) 

    }
    if(request.body.science){
        var subject = "science";
        connection.query('INSERT INTO mySubjects(username,subject) VALUES(?,?)',[username,subject],function(error,results,fields) {
            if (error) {
                console.log(error)
            }
            console.log(results)         
        }) 

    }
    if(request.body.technology){
        var subject = "technology";
        connection.query('INSERT INTO mySubjects(username,subject) VALUES(?,?)',[username,subject],function(error,results,fields) {
            if (error) {
                console.log(error)
            }
            console.log(results)         
        }) 
    }
    if(request.body.entertainment){
        var subject = "entertainment";
        connection.query('INSERT INTO mySubjects(username,subject) VALUES(?,?)',[username,subject],function(error,results,fields) {
            if (error) {
                console.log(error)
            }
            console.log(results)         
        }) 
    }
    if(request.body.business){
        var subject = "business";
        connection.query('INSERT INTO mySubjects(username,subject) VALUES(?,?)',[username,subject],function(error,results,fields) {
            if (error) {
                console.log(error)
            }
            console.log(results)         
        }) 
    }
    

    response.render("settings",{username:request.user,message:"Settings were updated.",sports:sports,technology:technology,entertainment:entertainment,science:science,business:business})

})

    app.post('/signUp',function(request,response){
        let username = request.body.username;
        let password = request.body.password;
    
        if (username && password) {
    
            connection.query('SELECT * FROM users WHERE username = ?',username, function(error, results, fields) {
                if (error) {
                    throw error
                }
                if (results.length > 0) {
                    
                    response.status(401)
                    .send({message: "The username already exists!"})
                                    
                }
                else {
    
                    connection.query('INSERT INTO users(username,password) VALUES(?,?)',[username,password],function(error,results,fields) {
                        if (error) {
                            console.log(error)
                        }
    
                        request.session['username'] = username;
                        // console.log("your username is " + request.session['username'])
                        

                        response.status(200)
                        .send({message: "Successfully signed up! Your username is " + request.session['username']})
                        
                        //start a session
    
                        
                    })
                    
                }
                // response.end();
    
            });
    
        }         
        else {
            response.status(401)
            .send({message: "Please enter username and password!"})
                }
    

    })



}