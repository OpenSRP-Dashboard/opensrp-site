'use strict';

/**
 * @ngdoc function
 * @name opensrpSiteApp.controller:AccesstokensCtrl
 * @description
 * # AccesstokensCtrl
 * Controller of the opensrpSiteApp
 */
angular.module('opensrpSiteApp')
  .controller('UserCtrl', function ($scope,$rootScope,$timeout,$location,$routeParams,$http,User,AclService) {
    $scope.access = [
      {  name: 'Feature'}, 
      { name: 'Bug' }, 
      { name: 'Enhancement' }
    ];
    $scope.can = AclService.can;
    var param = $routeParams.param;
    if ($location.path() == '/user-assign') {
      $rootScope.loading = true;      
      $scope.formData = {};
      $scope.formData= {
        roleName : 'admin'
      }
      $scope.save = function(){
       User.role($scope.formData);
      }
     
      User.users($scope,$rootScope,$timeout);
      User.rolesAndAccessTokens($scope,$rootScope,$timeout);
    }else if(param){
      $rootScope.loading = true;      
      User.users($scope,$rootScope,$timeout);
      User.rolesAndAccessTokens($scope,$rootScope,$timeout);
    }else{
       $rootScope.loading = true;
       $scope.userAssign =
      ' <a href="#/user-assign">'+
      '<i class="glyphicon glyphicon-list-alt"></i>'+
     ' <span>User assign to a role</span>'+
     '</a>';
      User.rolesAndUser($scope,$rootScope,$timeout);
      }
     
  });
