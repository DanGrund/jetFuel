const expect = require('chai').expect;
const validateHTTP = require('../src/helpers');

describe('helpers', () => {

  it('adds http:// to url if not present', () => {
    expect(validateHTTP('www.google.com')).to.equal('http://www.google.com');
  });

  it('does not add http:// if it already exists', () => {
    expect(validateHTTP('http://www.google.com')).to.equal('http://www.google.com');
  })
});
