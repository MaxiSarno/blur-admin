/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages', [
    'ui.router',
    
    'BlurAdmin.pages.sensory', 
    'BlurAdmin.pages.users', 
    'BlurAdmin.pages.login', 

    'BlurAdmin.pages.dashboard',
    'BlurAdmin.pages.profile'
/*    'BlurAdmin.pages.ui',
    'BlurAdmin.pages.components',
    'BlurAdmin.pages.form',
    'BlurAdmin.pages.tables',
    'BlurAdmin.pages.charts',
    'BlurAdmin.pages.maps',*/
  ])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($urlRouterProvider, baSidebarServiceProvider) {

     /*$urlRouterProvider.rule(function ($injector, $location) {
       //what this function returns will be set as the $location.url
        var path = $location.path(), normalized = path.toLowerCase();
        if (path != normalized) {
            //instead of returning a new url string, I'll just change the $location.path directly so I don't have to worry about constructing a new url string and so a new state change is not triggered
            $location.replace().path(normalized);
        }
        // because we've returned nothing, no state change occurs
        var $rootScope = $injector.get("$rootScope");

        if (!$rootScope.$isLoggedIn) {
          console.log('tuvieja')
          return '/login'
        }
    });*/

    $urlRouterProvider.otherwise('/dashboard');

    baSidebarServiceProvider.addStaticItem({
      title: 'Pages',
      icon: 'ion-document',
      subMenu: [{
        title: 'Sign In',
        fixedHref: 'auth.html',
        blank: true
      }, {
        title: 'Sign Up',
        fixedHref: 'reg.html',
        blank: true
      }, {
        title: 'User Profile',
        stateRef: 'profile'
      }, {
        title: '404 Page',
        fixedHref: '404.html',
        blank: true
      }]
    });
  }

})();
