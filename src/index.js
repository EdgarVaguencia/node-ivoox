'use strict';
var promise = require('bluebird');
var request = require('request');
var cheerio = require('cheerio');
var createError = require('http-errors');

module.exports = {

  urlBase: 'http://www.ivoox.com/',

  urlAudios: 'audios_sa_f_1.html?nogallery',

  urlPodcasts: 'audios_sc_f_1.html?nogallery',

  list: [],

  audio_list: [],

  podcast_list: [],

  /**
   * Llamada http
   * @param  {string} url Enlace de petición
   * @param  {int} list_type Tipo de lista para su formato correcto
   * @return {promise}
   */
  _request: function(url, list_type){
    var self = this;
    return new promise(function(resolve, reject) {
      request(url, function(error, response, body) {
        if (response.statusCode === 200) {
          resolve(self.format(cheerio.load(body), list_type));
        }else {
          reject(createError(response.statusCode));
        }
      });
      
    });
  },

  /**
   * Obtiene los audios de la lista explorar audios
   * @return {void} Los items son almacenados en audios_list
   */
  audios: function() {
    var url = this.urlBase + this.urlAudios;
    return this._request(url, 1);
  },

  /**
   * Obtiene podcasts de la lista explorar
   * @return {Void} Los items son almacenados en podcast_list
   */
  podcasts: function() {
    var url = this.urlBase + this.urlPodcasts;
    return this._request(url, 2);
  },

  /**
   * Realiza el formato correcto depende de la lista solicitada
   * @param  {Object} body
   * @param  {int} type
   * @return {array}
   */
  format: function(body, type) {
    var self = this;
    body('.audio_list_item').each(function(k ,i) {
      var img = cheerio(i).find('img.thumb_item');
      if (type === 1) {
        var title = cheerio(i).find('a.titulo');
        var author = cheerio(i).find('.categorias a:first-child');
        var category = cheerio(i).find('.categorias a:last-child');
        self.list.push({
          'img': img.attr('src'),
          'title': title.text(),
          'author': author.text(),
          'category': category.text()
        });
      } else if(type === 2){
        var nombre = cheerio(i).find('a.tituloPodcast');
        var audios = cheerio(i).find('span.listen_radio');
        self.list.push({
          'img': img.attr('src'),
          'name': nombre.text(),
          'audio': audios.text()
        });
      }
    });
    return this.list;
  },
};
