//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let api = require('../src/converter');
let expect = chai.expect;
//let expect = require('expect')
chai.use(chaiHttp);




//TEST CASES WITH ONLINE DATASET
describe('Get Test-Cases from ONLINE DATASET', () => {
    it('Converting from api OK EUR to something', (done) => {
        chai.request(api)
            .get('/api/convert/2019-09-06/EUR/JPY/10')
            .end((err, res) => {
                expect(res).to.have.status(200);
                
                expect(res.body).to.have.property('amount',1180.1000000000001);
                expect(res.body).to.have.property('currency','JPY');
                done();
          });
    });
    it('Converting from api OK - EUR to EUR', (done) => {
        chai.request(api)
            .get('/api/convert/2019-09-06/EUR/EUR/10')
            .end((err, res) => {
                expect(res).to.have.status(200);
                
                expect(res.body).to.have.property('amount',10);
                expect(res.body).to.have.property('currency','EUR');
                done();
            });
    });
    it('Converting from api OK - something to EUR', (done) => {
        chai.request(api)
            .get('/api/convert/2019-09-06/USD/EUR/10')
            .end((err, res) => {
                expect(res).to.have.status(200);
                
                expect(res.body).to.have.property('amount',9.068649678062936);
                expect(res.body).to.have.property('currency','EUR');
                done();
            });
    });
    it('Converting from api WRONG - bad reference_date. It is not available in the dataset. ', (done) => {
        chai.request(api)
            .get('/api/convert/2011-09-06/USD/EUR/10')
            .end((err, res) => {
                expect(res).to.have.status(400);
                
                expect(res.body).to.have.property('error', 'wrong DATE' );
                done();
            });
    });
    it('Converting from api WRONG - bad src_currency. It is not available in the dataset. ', (done) => {
        chai.request(api)
            .get('/api/convert/2019-09-06/AAA/EUR/10')
            .end((err, res) => {
                expect(res).to.have.status(400);
                
                expect(res.body).to.have.property('error', "wrong SRC_CURRENCY" );
                done();
            });
    });
    it('Converting from api WRONG - bad src_currency. It is not available in the dataset. ', (done) => {
        chai.request(api)
            .get('/api/convert/2019-09-06/EUR/AAA/10')
            .end((err, res) => {
                expect(res).to.have.status(400);
                
                expect(res.body).to.have.property('error', "wrong DEST_CURRENCY" );
                done();
            });
    });
    it('Converting from api WRONG - bad src_currency.  VALUE is not a number. ', (done) => {
        chai.request(api)
            .get('/api/convert/2019-09-06/EUR/EUR/HELLO')
            .end((err, res) => {
                expect(res).to.have.status(400);
                
                expect(res.body).to.have.property('error', "wrong. VALUE is not a number" );
                done();
            });
    });
});

//TEST CASES WITH STORED JSON
describe('Get Test-Cases from STORED DATASET', () => {
    it('Converting from api OK EUR to something', (done) => {
        chai.request(api)
            .get('/api/stored/convert/2019-09-06/EUR/JPY/10')
            .end((err, res) => {
                expect(res).to.have.status(200);
                
                expect(res.body).to.have.property('amount',1180.1000000000001);
                expect(res.body).to.have.property('currency','JPY');
                done();
          });
    });
    it('Converting from api OK - EUR to EUR', (done) => {
        chai.request(api)
            .get('/api/stored/convert/2019-09-06/EUR/EUR/10')
            .end((err, res) => {
                expect(res).to.have.status(200);
                
                expect(res.body).to.have.property('amount',10);
                expect(res.body).to.have.property('currency','EUR');
                done();
            });
    });
    it('Converting from api OK - something to EUR', (done) => {
        chai.request(api)
            .get('/api/stored/convert/2019-09-06/USD/EUR/10')
            .end((err, res) => {
                expect(res).to.have.status(200);
                
                expect(res.body).to.have.property('amount',9.068649678062936);
                expect(res.body).to.have.property('currency','EUR');
                done();
            });
    });
    it('Converting from api WRONG - bad reference_date. It is not available in the dataset. ', (done) => {
        chai.request(api)
            .get('/api/stored/convert/2011-09-06/USD/EUR/10')
            .end((err, res) => {
                expect(res).to.have.status(400);
                
                expect(res.body).to.have.property('error', 'wrong DATE' );
                done();
            });
    });
    it('Converting from api WRONG - bad src_currency. It is not available in the dataset. ', (done) => {
        chai.request(api)
            .get('/api/stored/convert/2019-09-06/AAA/EUR/10')
            .end((err, res) => {
                expect(res).to.have.status(400);
                
                expect(res.body).to.have.property('error', "wrong SRC_CURRENCY" );
                done();
            });
    });
    it('Converting from api WRONG - bad src_currency. It is not available in the dataset. ', (done) => {
        chai.request(api)
            .get('/api/stored/convert/2019-09-06/EUR/AAA/10')
            .end((err, res) => {
                expect(res).to.have.status(400);
                
                expect(res.body).to.have.property('error', "wrong DEST_CURRENCY" );
                done();
            });
    });
    it('Converting from api WRONG - bad src_currency.  VALUE is not a number. ', (done) => {
        chai.request(api)
            .get('/api/stored/convert/2019-09-06/EUR/EUR/HELLO')
            .end((err, res) => {
                expect(res).to.have.status(400);
                
                expect(res.body).to.have.property('error', "wrong. VALUE is not a number" );
                done();
            });
    });
});


//TEST CASES WITH ONLINE DATASET AND QUERY PARAMS
describe('Get Test-Cases WITH QUERY PARAMS from ONLINE DATASET', () => {
    it('Converting from api OK EUR to something', (done) => {
        chai.request(api)
            .get('/api/convert?reference_date=2019-09-06&src_currency=EUR&dest_currency=JPY&amount=10')
            .end((err, res) => {
                expect(res).to.have.status(200);
                
                expect(res.body).to.have.property('amount',1180.1000000000001);
                expect(res.body).to.have.property('currency','JPY');
                done();
          });
    });
    it('Converting from api OK - EUR to EUR', (done) => {
        chai.request(api)
            .get('/api/convert?reference_date=2019-09-06&src_currency=EUR&dest_currency=EUR&amount=10')
            .end((err, res) => {
                expect(res).to.have.status(200);
                
                expect(res.body).to.have.property('amount',10);
                expect(res.body).to.have.property('currency','EUR');
                done();
            });
    });
    it('Converting from api OK - something to EUR', (done) => {
        chai.request(api)
            .get('/api/convert?reference_date=2019-09-06&src_currency=USD&dest_currency=EUR&amount=10')
            .end((err, res) => {
                expect(res).to.have.status(200);
                
                expect(res.body).to.have.property('amount',9.068649678062936);
                expect(res.body).to.have.property('currency','EUR');
                done();
            });
    });
    it('Converting from api WRONG - bad reference_date. It is not available in the dataset. ', (done) => {
        chai.request(api)
            .get('/api/convert?reference_date=2011-09-06&src_currency=USD&dest_currency=EUR&amount=10')
            .end((err, res) => {
                expect(res).to.have.status(400);
                
                expect(res.body).to.have.property('error', 'wrong DATE' );
                done();
            });
    });
    it('Converting from api WRONG - bad src_currency. It is not available in the dataset. ', (done) => {
        chai.request(api)
            .get('/api/convert?reference_date=2019-09-06&src_currency=AAA&dest_currency=EUR&amount=10')
            .end((err, res) => {
                expect(res).to.have.status(400);
                
                expect(res.body).to.have.property('error', "wrong SRC_CURRENCY" );
                done();
            });
    });
    it('Converting from api WRONG - bad dest_currency. It is not available in the dataset. ', (done) => {
        chai.request(api)
            .get('/api/convert?reference_date=2019-09-06&src_currency=USD&dest_currency=AAA&amount=10')
            .end((err, res) => {
                expect(res).to.have.status(400);
                
                expect(res.body).to.have.property('error', "wrong DEST_CURRENCY" );
                done();
            });
    });
    it('Converting from api WRONG - bad amount.  VALUE is not a number. ', (done) => {
        chai.request(api)
            .get('/api/convert?reference_date=2019-09-06&src_currency=USD&dest_currency=EUR&amount=hello')
            .end((err, res) => {
                expect(res).to.have.status(400);
                
                expect(res.body).to.have.property('error', "wrong. VALUE is not a number" );
                done();
            });
    });
});



//TEST CASES WITH STORED JSON AND QUERY PARAMS
describe('Get Test-Cases WITH QUERY PARAMS from STORED DATASET', () => {
    it('Converting from api OK EUR to something', (done) => {
        chai.request(api)
            .get('/api/stored/convert?reference_date=2019-09-06&src_currency=EUR&dest_currency=JPY&amount=10')
            .end((err, res) => {
                expect(res).to.have.status(200);
                
                expect(res.body).to.have.property('amount',1180.1000000000001);
                expect(res.body).to.have.property('currency','JPY');
                done();
          });
    });
    it('Converting from api OK - EUR to EUR', (done) => {
        chai.request(api)
            .get('/api/stored/convert?reference_date=2019-09-06&src_currency=EUR&dest_currency=EUR&amount=10')
            .end((err, res) => {
                expect(res).to.have.status(200);
                
                expect(res.body).to.have.property('amount',10);
                expect(res.body).to.have.property('currency','EUR');
                done();
            });
    });
    it('Converting from api OK - something to EUR', (done) => {
        chai.request(api)
            .get('/api/stored/convert?reference_date=2019-09-06&src_currency=USD&dest_currency=EUR&amount=10')
            .end((err, res) => {
                expect(res).to.have.status(200);
                
                expect(res.body).to.have.property('amount',9.068649678062936);
                expect(res.body).to.have.property('currency','EUR');
                done();
            });
    });
    it('Converting from api WRONG - bad reference_date. It is not available in the dataset. ', (done) => {
        chai.request(api)
            .get('/api/stored/convert?reference_date=2011-09-06&src_currency=USD&dest_currency=EUR&amount=10')
            .end((err, res) => {
                expect(res).to.have.status(400);
                
                expect(res.body).to.have.property('error', 'wrong DATE' );
                done();
            });
    });
    it('Converting from api WRONG - bad src_currency. It is not available in the dataset. ', (done) => {
        chai.request(api)
            .get('/api/stored/convert?reference_date=2019-09-06&src_currency=AAA&dest_currency=EUR&amount=10')
            .end((err, res) => {
                expect(res).to.have.status(400);
                
                expect(res.body).to.have.property('error', "wrong SRC_CURRENCY" );
                done();
            });
    });
    it('Converting from api WRONG - bad dest_currency. It is not available in the dataset. ', (done) => {
        chai.request(api)
            .get('/api/stored/convert?reference_date=2019-09-06&src_currency=USD&dest_currency=AAA&amount=10')
            .end((err, res) => {
                expect(res).to.have.status(400);
                
                expect(res.body).to.have.property('error', "wrong DEST_CURRENCY" );
                done();
            });
    });
    it('Converting from api WRONG - bad amount.  VALUE is not a number. ', (done) => {
        chai.request(api)
            .get('/api/stored/convert?reference_date=2019-09-06&src_currency=USD&dest_currency=EUR&amount=hello')
            .end((err, res) => {
                expect(res).to.have.status(400);
                
                expect(res.body).to.have.property('error', "wrong. VALUE is not a number" );
                done();
            });
    });
});
