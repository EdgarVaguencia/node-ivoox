var ivoox = require('../src/index.js')
var chai = require('chai')
var asPromised = require('chai-as-promised')

chai.use(asPromised)
chai.should()
expect = chai.expect

describe('iVoox', function () {
  it('Is Object', function () {
    expect(ivoox).to.be.a('object')
  })

  it('Can request info', function () {
    expect(ivoox).to.include.keys('audios')
    expect(ivoox).to.include.keys('podcasts')
    expect(ivoox.audios).to.be.a('function')
    expect(ivoox.podcasts).to.be.a('function')
    expect(ivoox.format).to.be.a('function')
    expect(ivoox.getfile).to.be.a('function')
    expect(ivoox.search).to.be.a('function')

    describe('get audio file', function () {

      it('should err when body is not set', function () {
        (function (){ivoox.format()}).should.throw(Error)
      })

      it('should err when url is not set', function () {
        (function (){ivoox.getfile()}).should.throw(Error)
      })

      it('should err when topic is not set', function () {
        (function (){ivoox.search()}).should.throw(Error)
      })

      it('in audios shouldn´t change type', function () {
        ivoox.audios()
        expect(ivoox.type).to.equal(1)
      })

      it('in podcasts should change type', function () {
        ivoox.podcasts()
        expect(ivoox.type).to.equal(2)
      })

      it('in search should change type', function () {
        ivoox.search('test')
        expect(ivoox.type).to.equal(1)
      })
    })

  })
})
