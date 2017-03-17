const chai = require('chai');
const expect = chai.expect;
const app = require('../server.js');
const chaiHttp = require('chai-http');
const environment = 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

chai.use(chaiHttp);

describe('Server', () => {
  it('should exist', () => {
    expect(app).to.exist;
  });
});

describe('GET /', () => {
  it('should send back an html file', (done) => {
    chai.request(app)
    .get('/')
    .end((err, res) => {
      if(err) { done(err); }
      expect(res).to.have.status(200);
      expect(res).to.be.html;
      done();
    })
  })
})

describe('GET /api/v1/folders', () => {
  it('should respond back with all folders', (done) => {
    chai.request(app)
    .get('/api/v1/folders')
    .end((err, res) => {
      if(err) {done(err) }
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.be.a('array');
      expect(res.body).to.have.length(2);
      done()
    })
  })
})

// describe('GET /api/v1/folders/:id', () => {
//   it('should respond back with a folder', (done) => {
//     chai.request(app)
//     .get('/api/v1/folders/***insert id***')
//     .end((err, res) => {
//       if(err) { done(err); }
//       expect(res).to.have.status(201);
//       expect(res).to.be.json;
//       expect(res).to.be.a('object');
//       done();
//     })
//   })
//
//   it('should propmt 422 error if folder doesn\'t exist', (done) => {
//     chai.request(app)
//   })
// })

// describe('POST /api/v1/folders', () => {
//   it('should store folder and respond back with all folders', (done) => {
//     chai.request(app)
//   })
//
//   it('should check for duplicates', (done) => {
//     chai.request(app)
//   })
// })
