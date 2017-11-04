/**
 * @author msarno
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.sensory')
    .config(function($httpProvider) {
      $httpProvider.defaults.headers.common.Authorization = 'Basic bWF4aXNhckBnbWFpbC5jb206bWF4aQ=='
      //Enable cross domain calls
      $httpProvider.defaults.useXDomain = true;
      //Send all requests, even OPTIONS, with credentials
      $httpProvider.defaults.withCredentials = true;
    })
    .service('samService', samService)
    .factory('Base64', function () {
        /* jshint ignore:start */

        var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

        return {
            encode: function (input) {
                var output = "";
                var chr1, chr2, chr3 = "";
                var enc1, enc2, enc3, enc4 = "";
                var i = 0;

                do {
                    chr1 = input.charCodeAt(i++);
                    chr2 = input.charCodeAt(i++);
                    chr3 = input.charCodeAt(i++);

                    enc1 = chr1 >> 2;
                    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                    enc4 = chr3 & 63;

                    if (isNaN(chr2)) {
                        enc3 = enc4 = 64;
                    } else if (isNaN(chr3)) {
                        enc4 = 64;
                    }

                    output = output +
                        keyStr.charAt(enc1) +
                        keyStr.charAt(enc2) +
                        keyStr.charAt(enc3) +
                        keyStr.charAt(enc4);
                    chr1 = chr2 = chr3 = "";
                    enc1 = enc2 = enc3 = enc4 = "";
                } while (i < input.length);

                return output;
            },

            decode: function (input) {
                var output = "";
                var chr1, chr2, chr3 = "";
                var enc1, enc2, enc3, enc4 = "";
                var i = 0;

                // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
                var base64test = /[^A-Za-z0-9\+\/\=]/g;
                if (base64test.exec(input)) {
                    window.alert("There were invalid base64 characters in the input text.\n" +
                        "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                        "Expect errors in decoding.");
                }
                input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

                do {
                    enc1 = keyStr.indexOf(input.charAt(i++));
                    enc2 = keyStr.indexOf(input.charAt(i++));
                    enc3 = keyStr.indexOf(input.charAt(i++));
                    enc4 = keyStr.indexOf(input.charAt(i++));

                    chr1 = (enc1 << 2) | (enc2 >> 4);
                    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                    chr3 = ((enc3 & 3) << 6) | enc4;

                    output = output + String.fromCharCode(chr1);

                    if (enc3 != 64) {
                        output = output + String.fromCharCode(chr2);
                    }
                    if (enc4 != 64) {
                        output = output + String.fromCharCode(chr3);
                    }

                    chr1 = chr2 = chr3 = "";
                    enc1 = enc2 = enc3 = enc4 = "";

                } while (i < input.length);

                return output;
            }
        };

        /* jshint ignore:end */
    });

  /** @ngInject */
  function samService($sce, $http, Base64, $rootScope) {
    var thiz = this
    var currentSamId = 0

    thiz.http = function(url, method, success, error) {
      thiz.SetCredentials('maxisar@gmail.com','maxi')
      /*var headers = {"Authorization": "Basic bWF4aXNhckBnbWFpbC5jb206bWF4aQ=="};
      $http.get('http://localhost:8180/sam/evaluation', {headers: headers}).then(function (response) {console.log("hola")})
*/
      var req = {
        method: method,
        url: url,
        dataType: 'json',
        headers: {'Content-Type': 'application/json'},
        withCredentials: true,
        useXDomain: true,
        headers: {
          'authorization': 'Basic bWF4aXNhckBnbWFpbC5jb206bWF4aQ==',
        }
      }

      $http(req)
        .success(function(data) {
          success(data)
        })
        .error(function(data) {
          if (error) {
            error(data)
          }
        })
    }

    thiz.SetCredentials = function (username, password) {
        var authdata = Base64.encode(username + ':' + password);
        
        /*$rootScope.globals = {
            currentUser: {
                username: username,
                authdata: authdata
            }
        };*/

        /*$http.defaults.headers.common.Authorization = 'Basic ' + user.accessToken;*/
        $http.defaults.headers.common.Authorization = 'Basic ' + authdata;
        /*$cookieStore.put('globals', $rootScope.globals);*/
    };

    thiz.ClearCredentials = function () {
        $rootScope.globals = {};
        //$cookieStore.remove('globals');
        $http.defaults.headers.common.Authorization = 'Basic ';
    };


    var mock = false
    /*RADAR*/
    /*var mockResult = {
        "samId": 3,
        "alpha": 0.1,
        "partialResults": [
            {
                "id": 0,
                "attributeName": "agrado del sabor",
                "areDifferent": true,
                "winner": "producto 3",
                "distribution": "ANOVA",
                "summaries": [
                    {
                        "id": 0,
                        "sampleName": "producto 1",
                        "count": 35,
                        "sum": 194,
                        "min": 3,
                        "max": 7,
                        "average": 5.542857142857144,
                        "variance": 0.7848739495798325
                    },
                    {
                        "id": 0,
                        "sampleName": "producto 2",
                        "count": 35,
                        "sum": 140,
                        "min": 2,
                        "max": 6,
                        "average": 4,
                        "variance": 1.2941176470588232
                    },
                    {
                        "id": 0,
                        "sampleName": "producto 3",
                        "count": 35,
                        "sum": 218,
                        "min": 1,
                        "max": 10,
                        "average": 6.228571428571429,
                        "variance": 8.416806722689074
                    },
                    {
                        "id": 0,
                        "sampleName": "producto 4",
                        "count": 35,
                        "sum": 219,
                        "min": 1,
                        "max": 10,
                        "average": 4,
                        "variance": 9.137815126050418
                    }
                ],
                "fValue": 13.033787029623705,
                "fCritValue": 0,
                "pValue": 0.00000910354265704072
            },
            {
                "id": 0,
                "attributeName": "intensidad del sabor",
                "areDifferent": true,
                "winner": "producto 3",
                "distribution": "ANOVA",
                "summaries": [
                    {
                        "id": 0,
                        "sampleName": "producto 1",
                        "count": 35,
                        "sum": 107,
                        "min": 2,
                        "max": 4,
                        "average": 3.057142857142857,
                        "variance": 0.173109243697479
                    },
                    {
                        "id": 0,
                        "sampleName": "producto 2",
                        "count": 35,
                        "sum": 103,
                        "min": 1,
                        "max": 5,
                        "average": 5.9428571428571426,
                        "variance": 0.9378151260504201
                    },
                    {
                        "id": 0,
                        "sampleName": "producto 3",
                        "count": 35,
                        "sum": 219,
                        "min": 1,
                        "max": 10,
                        "average": 6.257142857142856,
                        "variance": 9.137815126050418
                    },
                    {
                        "id": 0,
                        "sampleName": "producto 4",
                        "count": 35,
                        "sum": 219,
                        "min": 1,
                        "max": 10,
                        "average": 4,
                        "variance": 9.137815126050418
                    }
                ],
                "fValue": 36.263693014102984,
                "fCritValue": 0,
                "pValue": 1.2693179840539415e-12
            },
            {
                "id": 0,
                "attributeName": "intensidad del jabon",
                "areDifferent": true,
                "winner": "producto 3",
                "distribution": "ANOVA",
                "summaries": [
                    {
                        "id": 0,
                        "sampleName": "producto 1",
                        "count": 35,
                        "sum": 107,
                        "min": 2,
                        "max": 4,
                        "average": 6.057142857142857,
                        "variance": 0.173109243697479
                    },
                    {
                        "id": 0,
                        "sampleName": "producto 2",
                        "count": 35,
                        "sum": 103,
                        "min": 1,
                        "max": 5,
                        "average": 5.9428571428571426,
                        "variance": 0.9378151260504201
                    },
                    {
                        "id": 0,
                        "sampleName": "producto 3",
                        "count": 35,
                        "sum": 219,
                        "min": 1,
                        "max": 10,
                        "average": 2.257142857142856,
                        "variance": 9.137815126050418
                    },
                    {
                        "id": 0,
                        "sampleName": "producto 4",
                        "count": 35,
                        "sum": 219,
                        "min": 1,
                        "max": 10,
                        "average": 4,
                        "variance": 9.137815126050418
                    }
                ],
                "fValue": 36.263693014102984,
                "fCritValue": 0,
                "pValue": 1.2693179840539415e-12
            },
            {
                "id": 0,
                "attributeName": "intensidad del sabor residual",
                "areDifferent": true,
                "winner": "producto 3",
                "distribution": "ANOVA",
                "summaries": [
                    {
                        "id": 0,
                        "sampleName": "producto 1",
                        "count": 35,
                        "sum": 105,
                        "min": 1,
                        "max": 4,
                        "average": 2.9999999999999996,
                        "variance": 0.23529411764705882
                    },
                    {
                        "id": 0,
                        "sampleName": "producto 2",
                        "count": 35,
                        "sum": 101,
                        "min": 1,
                        "max": 5,
                        "average": 2.8857142857142852,
                        "variance": 0.8100840336134457
                    },
                    {
                        "id": 0,
                        "sampleName": "producto 3",
                        "count": 35,
                        "sum": 190,
                        "min": 1,
                        "max": 10,
                        "average": 5.428571428571428,
                        "variance": 6.72268907563025
                    },
                    {
                        "id": 0,
                        "sampleName": "producto 4",
                        "count": 35,
                        "sum": 219,
                        "min": 1,
                        "max": 10,
                        "average": 4,
                        "variance": 9.137815126050418
                    }
                ],
                "fValue": 27.883383816529616,
                "fCritValue": 0,
                "pValue": 2.1868395982949096e-10
            }
        ]
    }*/
    /*BARS*/
    var mockResult = {
        "samId": 3,
        "alpha": 0.1,
        "partialResults": [
            {
                "id": 0,
                "attributeName": "agrado del sabor",
                "areDifferent": true,
                "winner": "producto 3",
                "distribution": "ANOVA",
                "summaries": [
                    {
                        "id": 0,
                        "sampleName": "producto 1",
                        "count": 35,
                        "sum": 194,
                        "min": 3,
                        "max": 7,
                        "average": 5.542857142857144,
                        "variance": 0.7848739495798325
                    },
                    {
                        "id": 0,
                        "sampleName": "producto 2",
                        "count": 35,
                        "sum": 140,
                        "min": 2,
                        "max": 6,
                        "average": 4,
                        "variance": 1.2941176470588232
                    },
                    {
                        "id": 0,
                        "sampleName": "producto 3",
                        "count": 35,
                        "sum": 218,
                        "min": 1,
                        "max": 10,
                        "average": 6.228571428571429,
                        "variance": 8.416806722689074
                    },
                    {
                        "id": 0,
                        "sampleName": "producto 4",
                        "count": 35,
                        "sum": 219,
                        "min": 1,
                        "max": 10,
                        "average": 4,
                        "variance": 9.137815126050418
                    }
                ],
                "fValue": 13.033787029623705,
                "fCritValue": 0,
                "pValue": 0.00000910354265704072
            },
            {
                "id": 0,
                "attributeName": "intensidad del sabor",
                "areDifferent": true,
                "winner": "producto 3",
                "distribution": "ANOVA",
                "summaries": [
                    {
                        "id": 0,
                        "sampleName": "producto 1",
                        "count": 35,
                        "sum": 107,
                        "min": 2,
                        "max": 4,
                        "average": 3.057142857142857,
                        "variance": 0.173109243697479
                    },
                    {
                        "id": 0,
                        "sampleName": "producto 2",
                        "count": 35,
                        "sum": 103,
                        "min": 1,
                        "max": 5,
                        "average": 5.9428571428571426,
                        "variance": 0.9378151260504201
                    },
                    {
                        "id": 0,
                        "sampleName": "producto 3",
                        "count": 35,
                        "sum": 219,
                        "min": 1,
                        "max": 10,
                        "average": 6.257142857142856,
                        "variance": 9.137815126050418
                    },
                    {
                        "id": 0,
                        "sampleName": "producto 4",
                        "count": 35,
                        "sum": 219,
                        "min": 1,
                        "max": 10,
                        "average": 4,
                        "variance": 9.137815126050418
                    }
                ],
                "fValue": 36.263693014102984,
                "fCritValue": 0,
                "pValue": 1.2693179840539415e-12
            }
        ]
    }

    var evaluationUrl = 'http://localhost:8180/sam/evaluation'

    var getList = function(success, error) {
      thiz.http(evaluationUrl, 'GET', success, error)
    }

    var getDetail = function(samId, success, error) {
      var getDetailUrl = evaluationUrl+'/'+samId
      thiz.http(getDetailUrl, 'GET', success, error)
    }

    var saveDetail = function(samDetail, success, error) {
      var saveDetailUrl = evaluationUrl+'?name='+samDetail.name+'&type='+samDetail.type+'&scale='+samDetail.scale
      thiz.http(saveDetailUrl, 'POST', success, error)
    }

    var getDesign = function(samId, success, error) {
      var getDesignUrl = evaluationUrl+'/'+samId+'/design'
      thiz.http(getDesignUrl, 'GET', success, error)
    }

    var saveDesign = function(samId, samDesign, success, error) {
      var saveDesignUrl = evaluationUrl+'/'+samId+'/design?judges='+samDesign.judges+'&samples='+samDesign.samples
      thiz.http(saveDesignUrl, 'POST', success, error)
    }

    var getDesignCsvUrl = function(samId, judges, samples) {
      return evaluationUrl+'/'+samId+'/design/export?type=csv&judges='+judges+'&samples='+samples
    }

    var getAttributesCsvUrl = function(samId, attributes, success, error) {
      return evaluationUrl+'/'+samId+'/attributes/template?attributes='+attributes
    }

    var getResult = function(samId, success, error) {
      if (mock) {
        success(mockResult)
      } else {
        var getResultUrl = evaluationUrl+'/'+samId+'/results'
        thiz.http(getResultUrl, 'GET', success, error)
      }
    }

    var calcResult = function(samId, alpha, success, error) {
      var getResultUrl = evaluationUrl+'/'+samId+'/results?alpha='+alpha
      thiz.http(getResultUrl, 'POST', success, error)
    }


    return {
      getCurrentSamId: function () {
        return currentSamId
      },
      setCurrentSamId: function(value) {
        currentSamId = value
      },
      getList : getList,
      getDetail : getDetail,
      saveDetail : saveDetail,
      getDesignCsvUrl: getDesignCsvUrl,
      getDesign  : getDesign,
      saveDesign  : saveDesign,
      getAttributesCsvUrl : getAttributesCsvUrl,
      getResult : getResult,
      calcResult : calcResult
    }

  }

})();