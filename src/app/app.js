'use strict';

angular.module('BlurAdmin', [
  'ngAnimate',
  'ui.bootstrap',
  'ui.sortable',
  'ui.router',
  'ngTouch',
  'ngRoute',
  'toastr',
  'smart-table',
  "xeditable",
  'ui.slimscroll',
  'ngJsTree',
  'angular-progress-button-styles',

  'BlurAdmin.theme',
  'BlurAdmin.pages'
])
/*
 * Verifico si el usuario esta logueado, si no, lo redirijo al login
 * 
 * Esto es un menjunje entre ui.rouret y ngRoute
 *
 *
 *   ui.router -> $routeChangeStart
 *   ngRoute -> $stateChangeStart
 *   
 *   ui.router -> $state.go('login')
 *   ngRoute -> $location.path('/login')
 *   
 *
 * - y como salimos de aqui?
 * - pues cavando!
 */
 .run(['$rootScope', '$location', '$state', 'commonsService', function ($rootScope, $location, $state, commonsService) {

    $rootScope.$logout = function() {
      commonsService.logout(function() {$state.go('login')})
    }

    $rootScope.$on('$stateChangeStart', function (event, currRoute, prevRoute) {

      var isInLogInPage = currRoute.url.indexOf('/login') !== -1;

      if (!commonsService.isLoggedIn() && !isInLogInPage) {
        console.log('DENY : Redirecting to Login');
        event.preventDefault();
        
        $state.go('login')
      
      } else {
        console.log('ALLOW');
      }
    })


}])