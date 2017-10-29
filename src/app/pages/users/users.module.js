/**
 * @author msarno
 *
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.users', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        /*.state('users', {
          url: '/users',
          template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
          abstract: true,
          title: 'usuarios',
          sidebarMeta: {
            icon: 'ion-ios-flask-outline',
            order: 100,
          },
        }).state('table', {
          url: '/table',
          templateUrl: 'app/pages/users/users.html',
          title: 'tabla',
          controller: 'UsersCtrl',
          controllerAs: 'vm',
          sidebarMeta: {
            order: 200,
          },
        })*/
        .state('users', {
          url: '/users',
          templateUrl: 'app/pages/users/users.html',
          title: 'Usuarios',
          controller: 'UsersCtrl',
          controllerAs: 'vm',
          sidebarMeta: {
            order: 900,
            icon: 'ion-android-people'
          },
        });
    /*$urlRouterProvider.when('/users');*/
  }

})();
