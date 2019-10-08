var ivoox = require('../src/index.js')
var chai = require('chai')
var asPromised = require('chai-as-promised')
const mocha = require('mocha')

chai.use(asPromised)
chai.should()
let expect = chai.expect

mocha.describe('iVoox', function () {
  mocha.it('Is Object', function () {
    expect(ivoox).to.be.a('object')
  })

  mocha.it('Can request info', function () {
    expect(ivoox).to.include.keys('audios')
    expect(ivoox).to.include.keys('podcasts')
    expect(ivoox.audios).to.be.a('function')
    expect(ivoox.podcasts).to.be.a('function')
    expect(ivoox.format).to.be.a('function')
    expect(ivoox.getfile).to.be.a('function')
    expect(ivoox.search).to.be.a('function')

    mocha.describe('get audio file', function () {
      mocha.it('should err when body is not set', function () {
        (function () { ivoox.format() }).should.throw(Error)
      })

      mocha.it('should err when url is not set', function () {
        (function () { ivoox.getfile() }).should.throw(Error)
      })

      mocha.it('should err when topic is not set', function () {
        (function () { ivoox.search() }).should.throw(Error)
      })

      mocha.it('in audios shouldn´t change type', function () {
        ivoox.audios()
        expect(ivoox.type).to.equal(1)
      })

      mocha.it('in podcasts should change type', function () {
        ivoox.podcasts()
        expect(ivoox.type).to.equal(2)
      })

      mocha.it('in search should change type', function () {
        ivoox.search('test')
        expect(ivoox.type).to.equal(1)
      })
    })
  })

  mocha.it('Request', function () {
    mocha.describe('Audios', function () {
      mocha.it('Return object', function () {
        this.timeout(0)
        return Promise.resolve(ivoox.audios()).should.be.fulfilled
      })
    })

    mocha.describe('Podcast', function () {
      mocha.it('Return object', function () {
        this.timeout(0)
        return Promise.resolve(ivoox.podcasts()).should.be.fulfilled
      })
    })
  })

  mocha.it('Cann´t Request', function () {
    mocha.describe('Page not found', function () {
      mocha.it('Return reject', function () {
        this.timeout(0)
        return Promise.resolve(ivoox.audios(ivoox.urlBase + 'audios.html')).should.be.rejected
      })
    })
  })
})
