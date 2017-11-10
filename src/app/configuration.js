'use strict'

// https://youtu.be/dQw4w9WgXcQ
angular.module('configuration', []).
  constant("samConfiguration", (function () {
    var url = "http://localhost"
    var port = '8180'
    var api = "/sam"

    return {
      getApiPath: function () {
        return url + ':' + port + api
      }
    };
  })()).
  constant('defaultConfiguration',
  {
    lang:'es_AR'
  })