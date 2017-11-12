/**
 * @author msarno
 *
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.login')
      .controller('LoginCtrl', LoginCtrl);

  /** @ngInject */
  function LoginCtrl($rootScope, $scope, $state, commonsService) {
    var vm = this;
    vm.user = {}

    vm.login = function() {
      var success = function(data) {
        console.log('login success:'+data)
        $state.go('dashboard')
      }

      var error = function(data) {
        console.log('ERROR en el login:' + data)
      }

      commonsService.login(vm.user, success, error)
    }
    console

    vm.logout = function() {
      console.log("logout vieja")
      commonsService.logout(
        function(data) {
          $rootScope.$isLoggedIn = false
        }, function(data) {
          console.log('ERROR en el logout:' + data)
        }) 
    }

  } 

})();
