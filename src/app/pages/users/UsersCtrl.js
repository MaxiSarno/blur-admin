/**
 * @author msarno
 *
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.users')
      .controller('UsersCtrl', UsersCtrl);

  /** @ngInject */
  function UsersCtrl($scope, $http, samService) {

  	$scope.roles = [ 'USER', 'ADMIN'];

    $scope.users = [
      {
      	username: 'maxisar@gmail.com',
      	password: 'tuvieja',
      	description: 'Maxi Sarno',
      	role: 'ADMIN'
      },
      {
      	username: 'mfgc87@gmail.com',
      	password: 'suvieja',
      	description: 'flor Gimenez',
      	role: 'USER'
      }
    ];

    $scope.removeUser = function(index) {
      $scope.users.splice(index, 1);
    };

    $scope.addUser = function()  	{
      	console.log("addUser")
      $scope.inserted = {
        id: $scope.users.length+1,
        username: null,
        password: null,
        role: $scope.roles[0]
      };
      $scope.users.push($scope.inserted);
    };

    $scope.saveUser = function(rowform) {
      console.log("saveUser")
      console.log(rowform)
      /*$scope.inserted = {
        id: $scope.users.length+1,
        name: '',
        status: null,
        group: null
      };
      $scope.users.push($scope.inserted);*/
    };

  } 

})();
