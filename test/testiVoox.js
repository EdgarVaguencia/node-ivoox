var ivoox = require('../src/index.js');
var chai = require('chai');
var asPromised = require('chai-as-promised');

chai.use(asPromised);
chai.should();
expect = chai.expect;

describe('iVoox', function() {
  it('Is Object', function() {
    expect(ivoox).to.be.a('object');
  });

  it('Can request info', function() {
    expect(ivoox).to.include.keys('audios');
    expect(ivoox).to.include.keys('podcasts');
  });
});