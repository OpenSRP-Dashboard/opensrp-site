'use strict';

/**
 * @ngdoc function
 * @name opensrpSiteApp.controller:AclCtrl
 * @description
 * # AclCtrl
 * Controller of the opensrpSiteApp
 */
angular.module('opensrpSiteApp')
  .controller('AclCtrl', function ($scope,$http,$rootScope,$timeout,User,Role,Common,AclService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.can = AclService.can;
    console.log($scope.can + " --the can variable from acl from /controllers/acl.js");
     $scope.createRole =
     ' <a href="#/add-role">'+
     '<i class="glyphicon glyphicon-list-alt"></i>'+
    ' <span>Create Role</span>'+
    '</a>';
    $rootScope.loading = true;
    Role.accessTokens($rootScope);
    User.rolesAndAccessTokens($scope,$rootScope,$timeout);
    
    $scope.checked = function(access,role){              
     return Common.checkboxChecked(access,role);
    }
    
  });
