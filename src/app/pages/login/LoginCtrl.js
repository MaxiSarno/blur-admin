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
    console.log('seteando $rootScope.$isLoggedIn = false')
    //$rootScope.$isLoggedIn = false

    vm.login = function() {
      $rootScope.$isLoggedIn = true
      $state.go('dashboard')
    }

    vm.logout = function() {
      $rootScope.$isLoggedIn = true
    }

  } 

})();
