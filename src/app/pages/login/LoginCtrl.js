/**
 * @author msarno
 *
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.login')
      .controller('LoginCtrl', LoginCtrl);

  /** @ngInject */
  function LoginCtrl($rootScope, $scope, $state, samService) {
    var vm = this;
    vm.user = {}

    vm.login = function() {
      var success = function(data) {
        console.log('success')
        $rootScope.user = vm.user
        $rootScope.$isLoggedIn = true
        $state.go('dashboard')
      }

      var error = function(data) {
        console.log('error enel login:' + data)
      }

      samService.login(vm.user, success, error)
      $rootScope.$isLoggedIn = true
      $state.go('dashboard')
    }

    vm.logout = function() {
      samService.logout(
        function(data) {
          $rootScope.$isLoggedIn = false
        }, function(data) {
          console.log('error en el logout:' + data)
        })
      
    }

  } 

})();
