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
    Trip = require('../model/trip'),
    should = chai.Should(),
    supertest = require('supertest'),
    config = require('../service/settings'),
    api = supertest('http://localhost:' + config.server.port);

var validTripName = "Trip To Belfast",
    invalidTripName = "",
    validTripCity = "Belfast, United Kingdom",
    invalidTripCity = "";

/**
 * Tests organised by CRUD operations - Trip create
 *
 * TEST ONE: SUCCESS create a new trip
 * TEST TWO: FAIL create a new trip NULL TRIPNAME
 * TEST THREE: FAIL create a new trip NULL TRIPCITY
 * TEST FOUR: FAIL create a new trip NULL TRIPNAME && TRIPCITY
 *
 */
describe('-- Trip Create --', function () {
    before(function (done) {
        mongoose.connect(config.database.port, function () {
            Trip.findOneAndRemove({tripName: validTripName}, function (err) {
                if (err) throw err;
            });
            done();
        });
    });

    it('should succesfully create a new trip', function (done) {
        api.post('/api/trip')
            .set('Connection', 'keep-alive')
            .set('Accept', 'application/json')
            .send({
                tripName: validTripName,
                tripCity: validTripCity
            })
            .expect(config.http.SUCCESS_RESPONSE_CODE)
            .end(function (err, res) {
                if (err) return done(err);
                res.status.should.be.equal(config.http.SUCCESS_RESPONSE_CODE);
                done();
            });
    });

    it('should send an error as tripCity null', function (done) {
        api.post('/api/trip/')
            .set('Accept', 'application/json')
            .set('Connection', 'keep-alive')
            .send({
                tripName: invalidTripName,
                tripCity: invalidTripCity
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
 * Tests organised by CRUD operations - Trip create
 *
 * TEST ONE: SUCCESS return all existing trips
 * TEST TWO: SUCCESS return one existing trip
 *
 */
describe('-- Trip Read --', function () {

    it('should succesfully return all existing trip', function (done) {
        api.get('/api/trip')
            .set('Connection', 'keep-alive')
            .set('Accept', 'application/json')
            .expect(config.http.SUCCESS_RESPONSE_CODE)
            .end(function (err, res) {
                if (err) return done(err);
                res.status.should.be.equal(config.http.SUCCESS_RESPONSE_CODE);
                done();
            });
    });


});
