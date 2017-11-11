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
 * - y como salimos de aqui?
 * - pues cavando!
 */
 .run(['$rootScope', '$location', '$state', 'commonsService', function ($rootScope, $location, $state, commonsService) {

    var isLoggedIn

    var name = "isLoggedIn" + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i].trim();
      if (c.indexOf(name) == 0) {
        // quito la expiracion
        var value = c.substring(name.length, c.length);
        value = value.slice(0, value.indexOf(", expires"));
        isLoggedIn = value;
       }
    }
    $rootScope.$isLoggedIn = isLoggedIn


    $rootScope.$logout = function() {
      commonsService.logout(function() {$state.go('login')})
    }


    // para ui.router es $routeChangeStart
    // para ngRoute es $stateChangeStart
    $rootScope.$on('$stateChangeStart', function (event, currRoute, prevRoute) {

      var isInLogInPage = currRoute.url.indexOf('/login') !== -1;

      console.log('url:'+currRoute.url)
      console.log('$rootScope.$isLoggedIn:'+$rootScope.$isLoggedIn)

      if (!$rootScope.$isLoggedIn && !isInLogInPage) {
        console.log('DENY : Redirecting to Login');
        event.preventDefault();
        
        // para ui.router es $state.go('login')
        // para ngRoute es $location.path('/login')
        $state.go('login')
      
      } else {
        console.log('ALLOW');
      }
    })


}])