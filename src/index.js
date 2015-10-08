'use strict';
var promise = require('bluebird');
var request = require('request');
var cheerio = require('cheerio');
var createError = require('http-errors');

module.exports = {

  urlBase: 'http://www.ivoox.com/',

  urlAudios: 'audios_sa_f_1.html?nogallery',

  urlPodcasts: 'audios_sc_f_1.html?nogallery',

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
    body('.audio_list_item').each(function(k ,i) {
      if (cheerio(i).attr('id') !== 'adsensem') {
        var img = cheerio(i).find('img.thumb_item');
        if (self.type === 1) {
          var title = cheerio(i).find('a.titulo');
          var author = cheerio(i).find('.categorias a:first-child');
          var category = cheerio(i).find('.categorias a:last-child');
          list.push({
            'img': img.attr('src'),
            'title': title.text(),
            'author': author.text(),
            'category': category.text(),
            'link': title.attr('href'),
            'file': self.urlBase + '/s_me_' + self.getfile(title.attr('href')) + '_1.html'
          });
        } else if(self.type === 2 || self.type === 3){
          var nombre = cheerio(i).find('a.tituloPodcast');
          var audios = cheerio(i).find('span.listen_radio');
          list.push({
            'img': img.attr('src'),
            'name': nombre.text(),
            'audio': audios.text(),
            'link': nombre.attr('href')
          });
          if (self.type === 3) {
            self.type = 1;
          }
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
    this.type = 3;
    return this._request();
  },
};
