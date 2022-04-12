//Integration Testing 

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const app = require('../app.js'); //replace server with server file name: ex: app.js
const should = chai.should();
const expect = chai.expect;
// starwars mocks
//const all_paths = require('../views/login.ejs');


//console.log("Integration Testing");

describe('GET /myDashboard to GET /login page', () => {
  it('should return 200 status from Dashboard landing page to Login Page', done => {
    chai
      .request(app)
      .get('/')	//Dashboard Api call //dashboard redirection
      .end((err, res) => {
        res.should.have.status(200);
        //expect(res.body).to.deep.equal(starwarsFilmListMock);
        res.get('/login') // Login page has to match file name for login: register.ejs
        	res.should.have.status(200);
        done();
      });
  });
});

describe('POST /login to authenticated session', () => {
  it('should return 200 status from login page to authenticated Dashboard for the user', done => {
    chai
      .request(app)
      .post('/login')	//Dashboard Api call
             let User = {
            name: "erica",
            password: "butts"
        }
      .send(User)
      .end((err, res) => {
        res.should.have.status(200);
        res.get('/') // Login page
        	//code to check if user is signed in
        	//if check fails user is not authenticated
        	res.should.have.status(200);
        done();
      });
  });
});

describe('GET /signUP to GET /login page', () => {
  it('should return 200 status from Signup Page to Login Page', done => {
    chai
      .request(app)
      .get('/signUp')	//Dashboard Api call
      .end((err, res) => {
        res.should.have.status(200);
        //expect(res.body).to.deep.equal(starwarsFilmListMock);
        res.get('/login') // Login page
        	res.should.have.status(200);
        done();
      });
  });
});

describe('POST /login to GET /Settings', () => {
  it('should return 200 status from logged in user to settings page', done => {
    chai
      .request(app)
      .post('/login')	//Dashboard Api call
       let User = {
            name: "erica", //credentials have to be changed to existing user in DB
            password: "butts"
        }
      .send(User)
      .end((err, res) => {
        res.should.have.status(200);
        //expect(res.body).to.deep.equal(starwarsFilmListMock);
        res.get('/settings') // Login page
        	res.should.have.status(200);
        done();
      });
  });
});

describe('GET /dashboard to GET /signOut page', () => {
  it('should return 200 status from authenticated session Dashboard landing page to Signed Out', done => {
    chai
      .request(app)
      .post('/login')	//Dashboard Api call
       let User = {
            name: "erica",
            password: "butts"
        }
      .send(User)
      .end((err, res) => {
        res.should.have.status(200);
        //expect(res.body).to.deep.equal(starwarsFilmListMock);
        res.get('/') // Login page
        	res.should.have.status(200);

       	res.get('/signOut')
       		res.should.have.status(200);
        done();
      });
  });
});


console.log("Unit Test Cases");

