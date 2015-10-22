'use strict';
var promise = require('bluebird');
var request = require('request');
var cheerio = require('cheerio');
var createError = require('http-errors');

module.exports = {

  urlBase: 'http://www.ivoox.com/',

  urlAudios: 'audios_sa_f_1.html',

  urlPodcasts: 'audios_sc_f_1.html',

  type : 1,

  /**
   * Llamada http
   * @return {promise}
   */
  _request: function () {
    var self = this;
    return new promise(function(resolve, reject) {
      request.get(self.urlRequest, function(error, response, body) {
        if (response.statusCode === 200) {
          var data = self.format(cheerio.load(body));
          resolve(data);
        }else {
          reject(createError(response.statusCode));
        }
      });
      
    });
  },

  /**
   * Obtiene los audios de la lista explorar audios
   */
  audios: function() {
    this.urlRequest = this.urlBase + this.urlAudios;
    this.type = 1;
    return this._request();
  },

  /**
   * Obtiene podcasts de la lista explorar
   */
  podcasts: function() {
    this.urlRequest = this.urlBase + this.urlPodcasts;
    this.type = 2;
    return this._request();
  },

  /**
   * Realiza el formato correcto depende de la lista solicitada
   * @param  {Object} body
   * @param  {int} type
   * @return {array}
   */
  format: function(body) {
    var self = this;
    var list = [];
    if (body === undefined) {
      throw new Error('body is needed');
    }
    body('.flipper').each(function(k ,i) {
      if (cheerio(i).find('.modulo-type-banner').length === 0) {
        var img = cheerio(i).find('img.main');
        var imgSmall = cheerio(i).find('img.mini');
        var title = cheerio(i).find('div.content h4 a');
        if (self.type === 1) {
          var author = cheerio(i).find('div.wrapper a');
          var category = cheerio(i).find('div.content a.rounded-label');
          list.push({
            'imgMain': img.attr('src'),
            'imgMini': imgSmall.attr('src'),
            'title': title.text(),
            'author': author.text(),
            'category': category.text(),
            'link': title.attr('href'),
            'file': 'http://files.ivoox.com/listen/' + self.getfile(title.attr('href'))
          });
        } else if(self.type === 2){
          var audios = cheerio(i).find('li.microphone a');
          list.push({
            'imgMain': img.attr('src'),
            'imgMini': imgSmall.attr('src'),
            'name': title.text(),
            'audio': audios.text(),
            'link': title.attr('href')
          });
        }
      }
    });
    return list;
  },

  /**
   * Regresa URL del arichivo 
   * @param  {string} link 
   * @return {string} fileLink
   */
  getfile: function(link) {
    var fileLink = '';
    if (link === undefined || typeof link !== 'string') {
      throw new Error('a link is needed');
    }
    fileLink = link.split('_');
    return fileLink[2];
  },

  /**
   * Realiza un petición de busqueda
   * @param topic     parametro de busqueda
   */
  search: function(topic) {
    if (topic === undefined && typeof topic !== 'string') {
      throw new Error('topic is needed');
    }
    this.urlRequest = this.urlBase + topic + '_sb.html';
    this.type = 1;
    return this._request();
  },
};
