/**
 * @author msarno
 *
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.sensory')
      .controller('SensoryEvaluationCtrl', SensoryEvaluationCtrl);

  /** @ngInject */
  function SensoryEvaluationCtrl($scope, $http, samService) {
    var vm = this;

    vm.samDetail = {}
    vm.samDesign = {}
    vm.samResult = {}
    vm.samAttributes = {}
    vm.samChart = {}

    vm.getSamDetail = function() {
      samService.getDetail(vm.samDetail.samId, 
        function(data){vm.samDetail=data})
    }

    vm.samDetailSave = function() {
      samService.saveDetail(vm.samDetail, 
        function(data) {vm.samDetail.samId = data.data}, 
        function(data){console.log('Error en vm.samDetailSave samId:'+vm.samDetail.samId)})
    }

    vm.getSamDesign = function() {
      samService.getDesign(vm.samDetail.samId, 
        function(data){vm.samDesign=data})
    }

    vm.samDesignSave = function() {
      samService.saveDesign(vm.samDetail.samId, vm.samDesign, 
        function(data) {console.log(data)}, 
        function(data) {console.log('Error:' + data.notification.message)})
    }

    vm.getSamDesignCsv = function() {
      return samService.getDesignCsvUrl(vm.samDetail.samId)
    }

    vm.getSamAttributesTemplate = function() {
      return samService.getAttributesCsvUrl(vm.samDetail.samId, vm.samAttributes.names)
    }


    vm.attributesUpload = function() {
      var file = vm.samAttributes.archivo
      var uploadUrl =  'http://localhost:8180/sam/evaluation/'+vm.samDetail.samId+'/attributes/fileupload'

      var fd = new FormData();
        fd.append('file', file);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(){
          console.log("ok")
        })
        .error(function(){
          console.log("error")
        });




      /*var req = {
        method: 'POST',
        url: 'http://localhost:8180/sam/evaluation/'+vm.samDetail.samId+'/attributes/fileupload',
        headers: {
          'Content-Type': multipart/form-data
        },
        data: { test: 'test' }
      }

      $http(req).then(console.log('success'), console.log('error'));*/
    }

    vm.attributesUploadB = function() {
      console.log('upload')

      var uploadUrl = "http://localhost:8180/sam/evaluation/" + vm.samDetail.samId + "/attributes/fileupload"
      var myForm = document.getElementById('attributesUploadForm')
      console.log(myForm)
      myForm.action = uploadUrl
    }

    vm.round = function(num, places) {
      return +(Math.round(num + "e+" + places)  + "e-" + places);
    }

    vm.roundResult = function(data) {
      for (var i = 0; i < data.partialResults.length; i++) {
        var partialResult = data.partialResults[i]

        for (var j = 0; j < partialResult.summaries.length; j++) {
          var summary = partialResult.summaries[j]
          summary.average = vm.round(summary.average, 3)
          summary.variance = vm.round(summary.variance, 3)
        }
      }
      return data
    }

    vm.buildRadarChart = function(data) {

    }

    vm.buildGraphicData = function(data) {
      var response =  {
        labels : new Array(),
        series : new Array(),
        data : new Array()
      }

      if (data.length < 3) {
        response.bars = true
      } else {
        response.radar = true
      }

      for (var i = 0; i < data.length; i++) {
        var partialResult = data[i]
        response.labels.push(partialResult.attributeName)

        for (var j = 0; j < partialResult.summaries.length; j++) {
          var summary = partialResult.summaries[j]

          if (response.data.length <= j) {
            response.data.push(new Array())
            response.series.push(summary.sampleName)
          }

          response.data[j].push(summary.average)
        }
      }
      
      return response     
    }

    vm.processResult = function(data) {
      vm.samResult=vm.roundResult(data)
      vm.samChart = vm.buildGraphicData(vm.samResult.partialResults)
    }

    vm.getSamResult = function() {
      return samService.getResult(vm.samDetail.samId,
        vm.processResult)
    }

    vm.calcSamResult = function() {
      return samService.calcResult(vm.samDetail.samId, vm.samResult.alpha, 
        vm.processResult,
        function(data){console.log('Error en vm.calcSamResult samId:'+vm.samDetail.samId)})
    }

    // initialize
    if (0 < samService.getCurrentSamId()) {
      vm.samDetail = { samId : samService.getCurrentSamId() }
      vm.getSamDetail()
      vm.getSamDesign()
      vm.getSamResult()
    }

  }

})();
