/**
 * Test file for user routes
 *
 * Tests done using mocha framework
 * Assertion done using chai library:
 *  . expect to assert expected http response code
 *  . should . be . equal to check assert
 *
 *  Supertest pulls server and app config from express, allowing us to plug into the express middleware.
 *  This grants us all of the validation and functionality which is part of the route.
 */
var chai = require('chai'),
    mongoose = require('mongoose'),
    User = require('../model/deprecated_user'),
    should = chai.Should(),
    supertest = require('supertest'),
    config = require('../service/settings'),
    api = supertest('http://localhost:' + config.server.address);

// Test data
var validEmail = "testemail@gmail.com",
    validEmailAlt = "kelvin@gmail.com",
    invalidEmail = "kelvinharronatgmail.com",
    validPassword = "getpostputdelete2elite",
    invalidPassword = "password";

/**
 * Tests organisation by using describe command, organises results in terminal
 *
 * Test denoated by the it command, gives description of the test and content includes
 * api end point to be tested
 * setting conenction status and content type
 * variables we are sending
 * the expected result
 * ends with processing the final result
 *
 *  TEST ONE: SUCCESS signup of user
 *  TEST TWO: FAIL signup of user EMAIL ALREADY USED
 *  TEST THREE: FAIL signup of user BAD PASSWORD
 *  TEST FOUR: FAIL signup of user BAD EMAIL
 *  TEST FIVE: FAIL signup of user BAD EMAIL && PASSWORD
 */
describe('-- User Signup --', function () {

    /**
     * Before each test, connect to the database and delete the valid email so we can use it in multiple test
     */
    before(function (done) {
        mongoose.connect(config.database.address, function () {
            User.findOneAndRemove({email: validEmail}, function (err) {
                if (err) throw err;
            });
        });
        done();
     });

    it('should succesfully register a new user', function (done) {
        api.post('/api/user/signup')
            .set('Connection', 'keep-alive')
            .set('Accept', 'application/json')
            .send({
                email: validEmail,
                password: validPassword
            })
            .expect(config.http.SUCCESS_RESPONSE_CODE)
            .end(function (err, res) {
                if (err) return done(err);
                res.status.should.be.equal(config.http.SUCCESS_RESPONSE_CODE);
                done();
            });
    });

    it('should send an error as email already used', function (done) {
        api.post('/api/user/signup')
            .set('Accept', 'application/json')
            .set('Connection', 'keep-alive')
            .send({
                email: validEmail,
                password: validPassword
            })
            .expect(config.http.CONFLICT_RESPONSE_CODE)
            .end(function (err, res) {
                if (err) return done(err);
                res.status.should.be.equal(config.http.CONFLICT_RESPONSE_CODE);
                done();
            });
    });

    it('should send an error as password invalid', function (done) {
        api.post('/api/user/signup')
            .set('Accept', 'application/json')
            .set('Connection', 'keep-alive')
            .send({
                email: validEmailAlt,
                password: invalidPassword
            })
            .expect(config.http.BAD_RESPONSE_CODE)
            .end(function (err, res) {
                if (err) return done(err);
                res.status.should.be.equal(config.http.BAD_RESPONSE_CODE);
                done();

            });
    });

    it('should send an error as email invalid', function (done) {
        api.post('/api/user/signup')
            .set('Accept', 'application/json')
            .set('Connection', 'keep-alive')
            .send({
                email: invalidEmail,
                password: validPassword
            })
            .expect(config.http.BAD_RESPONSE_CODE)
            .end(function (err, res) {
                if (err) return done(err);
                res.status.should.be.equal(config.http.BAD_RESPONSE_CODE);
                done();
            });
    });

    it('should send an error as email AND password invalid', function (done) {
        api.post('/api/user/signup')
            .set('Accept', 'application/json')
            .set('Connection', 'keep-alive')
            .send({
                email: invalidEmail,
                password: invalidPassword
            })
            .expect(config.http.BAD_RESPONSE_CODE)
            .end(function (err, res) {
                if (err) return done(err);
                res.status.should.be.equal(config.http.BAD_RESPONSE_CODE);
                done();
            });
    });
});

/**
 * Test set two
 *
 * TEST ONE: SUCCESS login of user
 * TEST TWO: FAIL login of user EMAIL NOT REGISTERED
 * TEST THREE: FAIL login of user INCORRECT PASSWORD
 */
describe('-- User Login --', function () {

    it('should succesfully login the user', function (done) {
        api.post('/api/user/login')
            .set('Accept', 'application/json')
            .set('Connection', 'keep-alive')
            .send({
                email: validEmail,
                password: validPassword
            })
            .expect(config.http.SUCCESS_RESPONSE_CODE)
            .end(function (err, res) {
                if (err) return done(err);
                res.status.should.be.equal(config.http.SUCCESS_RESPONSE_CODE);
                done();
            });
    });

    it('should send an error as email not registered', function (done) {
        api.post('/api/user/login')
            .set('Accept', 'application/json')
            .set('Connection', 'keep-alive')
            .send({
                email: validEmailAlt,
                password: validPassword
            })
            .expect(config.http.BAD_RESPONSE_CODE)
            .end(function (err, res) {
                ;
                res.status.should.be.equal(config.http.BAD_RESPONSE_CODE);
                done();
            });
    });

    it('should send an error as password incorrect', function (done) {
        api.post('/api/user/login')
            .set('Accept', 'application/json')
            .set('Connection', 'keep-alive')
            .send({
                email: validEmail,
                password: invalidPassword
            })
            .expect(config.http.BAD_RESPONSE_CODE)
            .end(function (err, res) {
                if (err) return done(err);
                res.status.should.be.equal(config.http.BAD_RESPONSE_CODE);
                done();
            });
    });
});
