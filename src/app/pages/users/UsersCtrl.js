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
      var success = function() {
        vm.currentUser.show = false
        vm.getUserList()
      }

      var error = function(data) {
        console.log('error')
        console.log(data)
      }

      if (vm.currentUser.new) {
        samService.addUser(vm.currentUser, success, error)
      } else {
        samService.updateUser(vm.currentUser, success, error)
      }
    }

    vm.deleteUser = function(user) {
      var success = function() {
        vm.getUserList()
      }

      var error = function(data) {
        console.log('error')
        console.log(data)
      }

      samService.deleteUser(user.username, success, error)
      //$state.reload() (injectar $state a UserCtrl) rompe la lista
      //$window.location.reload() (injectar $window a UserCtrl) recarga toooodo, tarda mucho
    }

    // INIT
    vm.getUserList = function() {
      samService.getUsers(
        function(data){vm.smartTableData = data}, 
        function(data){console.log(data)}
      )
    }

    vm.getUserList()

  } 

})();
