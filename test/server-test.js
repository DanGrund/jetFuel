const chai = require('chai');
const expect = chai.expect;
const app = require('../server.js');
const chaiHttp = require('chai-http');
// const environment = 'test';
const configuration = require('../knexfile')['test'];
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
  beforeEach((done) => {
    database.migrate.rollback()
    .then(() => {
      database.migrate.latest()
      .then(() => {
        return database.seed.run()
        .then(() => {
          done();
        })
      })
    })
  })

  afterEach((done) => {
    database.migrate.rollback()
    .then(() => {
      done();
    })
  })

  xit('should respond back with all folders', (done) => {
    chai.request(app)
    .get('/api/v1/folders')
    .end((err, res) => {
      if(err) { return done(err) }
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.be.a('array');
      expect(res.body).to.have.length(2);
      done()
    })
  })
})

describe('GET /api/v1/folders/:id', () => {

  it('should respond back with a folder', (done) => {
    chai.request(app)
    .get('/api/v1/folders/123')
    .end((err, res) => {
      if(err) { done(err); }
      expect(res).to.have.status(201);
      expect(res).to.be.json;
      expect(res.body).to.be.a('array');
      done();
    })
  })
})

describe('POST /api/v1/folders', () => {

  beforeEach((done) => {
    database.migrate.rollback()
    .then(() => {
      database.migrate.latest()
      .then(() => {
        return database.seed.run()
        .then(() => {
          done();
        })
      })
    })
  })

  afterEach((done) => {
    database.migrate.rollback()
    .then(() => {
      done();
    })
  })

  xit('should store folder and respond back with all folders', (done) => {
    chai.request(app)
    .post('/api/v1/folders')
    .send({
        newFolder: 'puppies'
      })
    .end((err, res) => {
      if(err) { done(err); }
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      done();
    })
  })
})

describe('/:shortURL redirect', () => {
  it('redirects if the shortURL matches in the DB', (done) => {
    chai.request(app)
    .get('/abcde')
    .end((err, res) => {
      if(err) { done(err); }
      expect(res).to.have.status(302);
      expect(res).to.be.json;
      done();
    })
  })
})
