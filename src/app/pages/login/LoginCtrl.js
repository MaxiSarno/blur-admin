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
        $rootScope.user.role = data.role
        $rootScope.user.description = data.description
        $rootScope.$isLoggedIn = true
        $state.go('dashboard')
      }

      var error = function(data) {
        console.log('ERROR en el login:' + data)
      }

      samService.login(vm.user, success, error)
    }
    console

    vm.logout = function() {
      console.log("logout vieja")
      samService.logout(
        function(data) {
          $rootScope.$isLoggedIn = false
        }, function(data) {
          console.log('ERROR en el logout:' + data)
        }) 
    }

  } 

})();
