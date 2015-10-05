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
    expect(ivoox.audios).to.be.a('function');
    expect(ivoox.podcasts).to.be.a('function');
    expect(ivoox.format).to.be.a('function');
    expect(ivoox.getfile).to.be.a('function');

    describe('get audio file', function() {

      it('should err when body and type is not set', function() {
        expect(ivoox.format()).to.equal('Falta body');
        expect(ivoox.format('')).to.equal('Falta type');
      });

      it('should err when url is not set', function() {
        var iVoooxFile = ivoox.getfile();
        expect(iVoooxFile).to.not.be.a('string');
      });
    });

  });
});