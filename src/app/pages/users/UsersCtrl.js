/**
 * @author msarno
 *
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.users')
      .controller('UsersCtrl', UsersCtrl);

  /** @ngInject */
  function UsersCtrl($scope, $http, samService, commonsService, toastr) {
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

    vm.userIsAllowed = function() {
      return commonsService.loggedInUserIsAdmin()
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
      if(vm.validateUser(vm.currentUser)) {
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
    }

    vm.getUserList = function() {
      samService.getUsers(
        function(data){
          console.log("cargando lista de usuarios")
          vm.smartTableData = data}, 
        function(data){console.log(data)}
      )
    }

    vm.validateUser = function(user) {
      /*if (!user.username.$valid) {
        console.log("invalid username")
        return false
      }*/
      var EMAIL_REGEXP = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
      if (!user.username || !EMAIL_REGEXP.test(user.username)) {
        vm.notify('error', 'Error al crear usuario', 'El email no es valido')
        return false
      }

      if(!user.password || user.password === user.username || user.password.length < 5) {
        vm.notify('error', 'Error al crear usuario', 'El password no debe estar vacio ni ser igual al email. Debe tener 5 o mas caracteres')
        return false
      }
      return true
    }

    vm.notify = function(type, title, message) {
      openedToasts.push(toastr[type](message, title));
    }

    var openedToasts = [];
    $scope.options = {
      autoDismiss: false,
      positionClass: 'toast-top-right',
      type: 'info',
      timeOut: '5000',
      extendedTimeOut: '2000',
      allowHtml: false,
      closeButton: false,
      tapToDismiss: true,
      progressBar: false,
      newestOnTop: true,
      maxOpened: 0,
      preventDuplicates: false,
      preventOpenDuplicates: false,
      title: "Some title here",
      msg: "Type your message here"
    }

    // INIT
    // por alguna razon, los datos se pisan si los cargo sin el timeout
    vm.init = function() {
      setTimeout(
        function(){
          vm.getUserList()
        }, 500);
    }

    vm.init()

  } 

})();
