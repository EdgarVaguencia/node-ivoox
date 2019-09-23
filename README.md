node-ivoox
===========

Unofficial iVoox API for node

[![NPM](https://nodei.co/npm/node-ivoox.png?downloads=true&downloadRank=true)](https://nodei.co/npm/node-ivoox/)

[![Build Status](https://travis-ci.org/EdgarVaguencia/node-ivoox.svg?branch=master)](https://travis-ci.org/EdgarVaguencia/node-ivoox) [![Code Climate](https://codeclimate.com/github/EdgarVaguencia/node-ivoox/badges/gpa.svg)](https://codeclimate.com/github/EdgarVaguencia/node-ivoox) [![Coverage Status](https://coveralls.io/repos/EdgarVaguencia/node-ivoox/badge.svg?branch=master&service=github)](https://coveralls.io/github/EdgarVaguencia/node-ivoox?branch=master)

Install
-------

```bash
npm install node-ivoox
```

Use
----

```javascript
var ivoox = require('node-ivoox');

ivoox.audios().then(function(data) { console.log(data) }).catch(function(e) { console.error(e); });
```

Methods
-------

* audios([urlPodcasts])
* podcasts()
* search(string)

Example of a response
---------------------

```json
[
  {
    "author": "La Lupa con Rosa Pérez (Podcast oficial)",
    "category": "Misterio y otras realidades",
    "file": "http://ivoox.com/listen_mn_3423261_1.mp3",
    "imgMain": "http://static-1.ivoox.com/audios/1408745050g.jpg",
    "imgMini": "http://static-1.ivoox.com/usuarios/6251441429674mini.jpg",
    "link": "http://www.ivoox.com/lupa-casas-malditas-encantadas-con-audios-mp3_rf_3423261_1.html",
    "title": "La Lupa – “Casas malditas y encantadas” con Joaquín Abenza, J.M Marsella, Jesús..."
  },
  {
    "author": "Contraperiodismo Matrix",
    "category": "Misterio y otras realidades",
    "file": "http://ivoox.com/listen_mn_9103980_1.mp3",
    "imgMain": "http://static-1.ivoox.com/canales/6371393915683g.jpg",
    "imgMini": "http://static-1.ivoox.com/usuarios/1211442557042mini.jpg",
    "link": "http://www.ivoox.com/211015-contraperiodismo-matrix-nba-iluminati-audios-mp3_rf_9103980_1.html",
    "title": "211015 contraperiodismo matrix. NBA iluminati."
  }
]
```



