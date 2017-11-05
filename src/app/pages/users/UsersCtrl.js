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
    var vm = this;

    vm.roles = [ 'USER', 'ADMIN']

    //aca guardo los datos del usuario que estoy creando o editando
    vm.currentUser = {
      show : false,
      new: true,
      username: '',
      password : '',
      description : '',
      role : vm.roles[0]
    }

    vm.newUser = function() {
      var doShow = !vm.currentUser.show
      
      vm.currentUser = {
        show : doShow,
        new : true,
        username: '',
        password : '',
        description : '',
        role : vm.roles[0]
      }
    }

    vm.editUser = function(user) {
      console.log(user)
      vm.currentUser = {
        show : true,
        new : false,
        username: user.username,
        password : user.password,
        description : user.description,
        role : user.role
      }
    }

    vm.saveUser = function() {
      console.log("add or edit user")
      if (vm.currentUser.new) {
        samService.addUser(vm.currentUser)
      } else {
        samService.updateUser(vm.currentUser)
      }
    }

    vm.deleteUser = function(user) {
      console.log(user.username)
      samService.deleteUser(user.username)
    }

    // INIT
    samService.getUsers(
      function(data){vm.smartTableData = data}, 
      function(data){console.log(data)}
      )

  } 

})();
