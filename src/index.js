'use strict'
const axios = require('axios')
const cheerio = require('cheerio')

module.exports = {

  urlBase: 'https://www.ivoox.com/',

  urlAudios: 'audios_sa_f_1.html',

  urlPodcasts: 'audios_sc_f_1.html',

  type: 1,

  /**
   * Llamada http
   * @return {promise}
   */
  _request: function () {
    var self = this
    return axios.get(self.urlRequest)
      .then(resp => {
        var data = self.format(cheerio.load(resp.data))
        return data
      })
      .catch(err => {
        return err
      })
  },

  /**
   * Obtiene los audios de la lista explorar audios
   */
  audios: function (url) {
    this.urlRequest = url !== undefined ? url : this.urlBase + this.urlAudios
    this.type = 1
    return this._request()
  },

  /**
   * Obtiene podcasts de la lista explorar
   */
  podcasts: function () {
    this.urlRequest = this.urlBase + this.urlPodcasts
    this.type = 2
    return this._request()
  },

  /**
   * Realiza el formato correcto depende de la lista solicitada
   * @param  {Object} body
   * @param  {int} type
   * @return {array}
   */
  format: function (body) {
    var self = this
    var list = []
    if (body === undefined) {
      throw new Error('body is needed')
    }
    body('.flipper').not(function (i, e) {
      return cheerio(this).attr('class') === '.modulo-type-banner'
    }).each(function (k, el) {
      var img = cheerio(el).find('img.main')
      var imgSmall = cheerio(el).find('img.mini')
      var title = cheerio(el).find('div.content p.title-wrapper a')
      if (self.type === 1) {
        var author = cheerio(el).find('div.wrapper a')
        var category = cheerio(el).find('div.content a.rounded-label')
        var fileLink = self.getfile(title.attr('href'))
        list.push({
          'imgMain': img.attr('src'),
          'imgMini': imgSmall.attr('src'),
          'title': title.attr('title'),
          'author': author.attr('title'),
          'category': category.attr('title'),
          'link': title.attr('href'),
          'file': `http://ivoox.com/listen_mn_${fileLink}_1.mp3`
        })
      }
      if (self.type === 2) {
        var audios = cheerio(el).find('li.microphone a')
        list.push({
          'imgMain': img.attr('src'),
          'imgMini': imgSmall.attr('src'),
          'name': title.attr('title'),
          'audio': audios.text(),
          'link': title.attr('href')
        })
      }
    })
    return list
  },

  /**
   * Regresa URL del arichivo
   * @param  {string} link
   * @return {string} fileLink
   */
  getfile: function (link) {
    var fileLink = ''
    if (link === undefined || typeof link !== 'string') {
      throw new Error('a link is needed')
    }
    fileLink = link.split('_')
    return fileLink[2]
  },

  /**
   * Realiza un petición de busqueda
   * @param topic     parametro de busqueda
   */
  search: function (topic) {
    if (topic === undefined && typeof topic !== 'string') {
      throw new Error('topic is needed')
    }
    this.urlRequest = this.urlBase + topic + '_sb.html'
    this.type = 1
    return this._request()
  }
}
