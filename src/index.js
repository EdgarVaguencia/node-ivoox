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
    const self = this
    return axios.get(self.urlRequest)
      .then(resp => {
        const data = self.format(cheerio.load(resp.data))
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
    const self = this
    const list = []
    if (body === undefined) {
      throw new Error('body is needed')
    }
    body('.flipper .front').not(function (i, e) {
      return cheerio(this).attr('class') === 'front modulo-view modulo-type-banner card-native-add'
    }).each(function (k, el) {
      const img = cheerio(el).find('img.main')
      const urlMain = new URL(img.attr('data-src'))
      const imgSmall = cheerio(el).find('img.mini')
      const urlSmall = new URL(imgSmall.attr('data-src'))
      const title = cheerio(el).find('.content p').has('a').children()
      const popoverInfo = cheerio(el).find('.content p').find('.audio-description button')
      const date = cheerio(el).find('.date').attr('title')
      if (self.type === 1) {
        const author = cheerio(el).find('div.wrapper a')
        const category = cheerio(el).find('div.content a.rounded-label')
        const fileLink = self.getfile(title.attr('href'))
        list.push({
          imgMain: urlMain.searchParams.get('url'),
          imgMini: urlSmall.searchParams.get('url'),
          title: title.attr('title'),
          description: popoverInfo.attr('data-content'),
          author: author.attr('title'),
          category: category.attr('title'),
          date,
          link: title.attr('href'),
          file: `http://ivoox.com/listen_mn_${fileLink}_1.mp3`
        })
      }
      if (self.type === 2) {
        const audios = cheerio(el).find('li.microphone a')
        list.push({
          imgMain: urlMain.searchParams.get('url'),
          imgMini: urlSmall.searchParams.get('url'),
          name: title.attr('title'),
          audio: audios.text().trim(),
          link: title.attr('href')
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
    let fileLink = ''
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
