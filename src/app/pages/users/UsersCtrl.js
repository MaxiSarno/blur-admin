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

  	samService.getUsers(
  		function(data){vm.smartTableData = data}, 
  		function(data){console.log(data)}
  		)

  	var vm = this

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
        description : null,
        role: $scope.roles[0]
      };
      vm.currentUser = $scope.inserted
      $scope.users.push($scope.inserted);
    };

    $scope.saveUser = function(user) {
      console.log("saveUser")
      console.log(user)
      console.log('$scope.inserted:'+$scope.inserted.username)
      console.log('vm.currentUser'+vm.currentUser)

      samService.saveUser(user, 
      	function(data) {console.log('usuario creado')},
      	function(data) {console.log('error al crear usuario')})
      /*console.log($scope.users[$scope.users.length-1])*/
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
