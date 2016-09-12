/**
 * Test file for server utility
 *
 * Tests done using mocha framework
 * Assertion done using chai library:
 *  . expect to assert expected http response code
 *  . should . be . equal to check assert
 *
 *  Supertest pulls server and app config from express, allowing us to plug into the express middleware.
 *  This grants us all of the validation and functionality which is part of the route.
 */
var should = require('chai').should(),
    expect = require('chai').expect,
    supertest = require('supertest'),
    config = require('../service/settings'),
    api = supertest('http://localhost:' + config.server.port);


describe('Check Server Status ', function () {
    it('should return a 200 response', function (done) {
        api.get('/status')
            .set('Accept', 'application/json')
            .expect(200, done)
    });
});