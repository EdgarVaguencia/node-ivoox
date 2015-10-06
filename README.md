node-ivoox
===========

Unofficial iVoox API for node

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

ivoox.audios().done(function(data) { console.log(data) });
```

Methods
-------

* audios
* podcasts

Example of a response
---------------------

```json
[
  {
    "author": "Podcast de Vocerrante",
    "category": "Arte y literatura",
    "img": "http://static-1.ivoox.com/audios/1443155227g.jpg",
    "link": "vocerrante016-partes-batalla-audios-mp3_rf_8599612_1.html",
    "title": "Vocerrante016 - Partes de Batalla",
    "file": "http://www.ivoox.com/s_me_8599612_1.html"
  },
  {
    "author": "Enjoy the sound Podcast with.",
    "category": "Electrónica",
    "img": "http://static-1.ivoox.com/audios/1443185336g.jpg",
    "link": "enjoy-the-sound-radioshow-028-ibiza-live-sessions-audios-mp3_rf_8607271_1.html",
    "title": "Enjoy the sound RADIOSHOW #028 IBIZA LIVE SESSIONS - Carl Cox Birthday @ Space Ibiza part2",
    "file": "http://www.ivoox.com/s_me_8607271_1.html"
  }
]
```



