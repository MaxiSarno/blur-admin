/**
 * @author msarno
 *
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.sensory')
      .controller('SensoryListCtrl', SensoryListCtrl);

  /** @ngInject */
  function SensoryListCtrl($scope, $http, samService, commonsService) {
    var vm = this
    $scope.smartTablePageSize = 10;
    samService.setCurrentSamId(0)

    vm.guardarId = function(id) {
      samService.setCurrentSamId(id)
    }

    vm.getList = function() {
      samService.getList(function(data){vm.smartTableData = data}, function(data){console.log(data)})
    }

    vm.userIsAllowed = function() {
      return commonsService.loggedInUserIsAdmin()
    }

    // INIT
    // por alguna razon, los datos se pisan si los cargo sin el timeout
    vm.init = function() {
      setTimeout(
        function(){
          vm.getList()
        }, 500);
    }

    vm.init()
  }

})();
