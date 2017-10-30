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
  }

})();
