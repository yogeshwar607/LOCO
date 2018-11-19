//apiTest.js
const request = require('supertest');
const app = require('../index').app;

/**
 * Testing put transaction endpoint with valid data
 */
describe('PUT /transactionservice/transaction/:transaction_id', function () {
    let data = {
        "type": "debit",
        "amount": 121,
        "parent_id": 1234
    }
    it('respond with 400 not created', function (done) {
        request(app)
            .put('/transactionservice/transaction/1234567')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});

/**
 * Testing put transaction endpoint with invalid data
 */
describe('PUT /transactionservice/transaction/:transaction_id', function () {
    let data = {
        //no id
        "type": "debit",

    }
    it('respond with 400 not created', function (done) {
        request(app)
            .put('/transactionservice/transaction/1234567')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});

/**
 * Testing get transactions by type endpoint by giving transaction type
 */
describe('GET /transactionservice/types/debit', function () {
    it('respond with json containing array of transaction ids of type debit ', function (done) {
        request(app)
            .get('/transactionservice/types/debit')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('GET /transactionservice/types/credit', function () {
    it('respond with json containing array of transaction ids of type credit ', function (done) {
        request(app)
            .get('/transactionservice/types/debit')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

/**
 * Testing get transactions sum  endpoint by giving transaction id
 */
describe('GET /transactionservice/sum/::transaction_id', function () {
    it('respond with json with sum of transaction as key', function (done) {
        request(app)
            .get('/transactionservice/sum/1234567')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

/**
 * Testing get transactions details endpoint by giving transaction id
 */
describe('GET /transactionservice/transaction/:transaction_id', function () {
    it('respond with json containing transaction details', function (done) {
        request(app)
            .get('/transactionservice/transaction/1234567')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});