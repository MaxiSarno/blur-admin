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

    $scope.smartTableData = [
      {
        id: 1,
        firstName: 'Mark',
        lastName: 'Otto',
        username: '@mdo',
        email: 'mdo@gmail.com',
        age: '28'
      },
      {
        id: 2,
        firstName: 'Jacob',
        lastName: 'Thornton',
        username: '@fat',
        email: 'fat@yandex.ru',
        age: '45'
      },
      {
        id: 3,
        firstName: 'Larry',
        lastName: 'Bird',
        username: '@twitter',
        email: 'twitter@outlook.com',
        age: '18'
      },
      {
        id: 4,
        firstName: 'John',
        lastName: 'Snow',
        username: '@snow',
        email: 'snow@gmail.com',
        age: '20'
      },
      {
        id: 5,
        firstName: 'Jack',
        lastName: 'Sparrow',
        username: '@jack',
        email: 'jack@yandex.ru',
        age: '30'
      }
    ];

    $scope.editableTableData = $scope.smartTableData.slice(0, 36);

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
      },
      {
        "id": 1,
        "name": "Esther Vang",
        "status": 4,
        "group": 3
      },
      {
        "id": 2,
        "name": "Leah Freeman",
        "status": 3,
        "group": 1
      },
      {
        "id": 3,
        "name": "Mathews Simpson",
        "status": 3,
        "group": 2
      },
      {
        "id": 4,
        "name": "Buckley Hopkins",
        "group": 4
      },
      {
        "id": 5,
        "name": "Buckley Schwartz",
        "status": 1,
        "group": 1
      },
      {
        "id": 6,
        "name": "Mathews Hopkins",
        "status": 4,
        "group": 2
      },
      {
        "id": 7,
        "name": "Leah Vang",
        "status": 4,
        "group": 1
      },
      {
        "id": 8,
        "name": "Vang Schwartz",
        "status": 4,
        "group": 2
      },
      {
        "id": 9,
        "name": "Hopkin Esther",
        "status": 1,
        "group": 2
      },
      {
        "id": 10,
        "name": "Mathews Schwartz",
        "status": 1,
        "group": 3
      }
    ];

    $scope.statuses = [
      {value: 1, text: 'Good'},
      {value: 2, text: 'Awesome'},
      {value: 3, text: 'Excellent'},
    ];

    $scope.roles = [ 'USER', 'ADMIN'];

    $scope.showRole = function(user) {
      if(user.group && $scope.groups.length) {
        var selected = $filter('filter')($scope.groups, {id: user.group});
        return selected.length ? selected[0].text : 'Not set';
      } else return 'Not set'
    };

    $scope.showStatus = function(user) {
      var selected = [];
      if(user.status) {
        selected = $filter('filter')($scope.statuses, {value: user.status});
      }
      return selected.length ? selected[0].text : 'Not set';
    };


    $scope.removeUser = function(index) {
      $scope.users.splice(index, 1);
    };

    $scope.addUser = function() {
      $scope.inserted = {
        id: $scope.users.length+1,
        name: '',
        status: null,
        group: null
      };
      $scope.users.push($scope.inserted);
    };
  } 

})();
