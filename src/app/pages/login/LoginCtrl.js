/**
 * @author msarno
 *
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.login')
      .controller('LoginCtrl', LoginCtrl);

  /** @ngInject */
  function LoginCtrl($rootScope, $scope, $http, samService) {
    var vm = this;
    console.log('seteando $rootScope.$isLoggedIn = true')
    $rootScope.$isLoggedIn = true

  } 

})();
