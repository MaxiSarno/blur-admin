/**
 * @author msarno
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.sensory')
    .service('samService', samService);

  /** @ngInject */
  function samService($sce, $http) {
    var thiz = this
    var currentSamId = 0

    thiz.http = function(url, method, success, error) {
      var req = {
        method: method,
        url: url,
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
        console.log('seteando el csid en:'+value)
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