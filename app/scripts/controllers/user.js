'use strict';

/**
 * @ngdoc function
 * @name opensrpSiteApp.controller:AccesstokensCtrl
 * @description
 * # AccesstokensCtrl
 * Controller of the opensrpSiteApp
 */
angular.module('opensrpSiteApp')
  .controller('UserCtrl', function ($scope,$rootScope,Flash,$window,$timeout,$location,$routeParams,$http,User,AclService) {
    $scope.access = [
      {  name: 'Feature'}, 
      { name: 'Bug' }, 
      { name: 'Enhancement' }
    ];
    $scope.can = AclService.can;
    var roleId = $routeParams.param;
    if ($location.path() == '/user-assign') {
      $rootScope.loading = true;      
      $scope.formData = {};
      
      $scope.save = function(){
       User.role($scope.formData,$window,Flash);
      }
     
      User.users($scope,$rootScope,$timeout);
      User.activeRolesAndAccessTokens($scope,$rootScope,$timeout);
    }else if(roleId){
      $rootScope.loading = true;
      $scope.save = function(){
       User.editRole($scope.roleName,$scope.userName,roleId,$scope.statusModel,$window,Flash);
      }
      $scope.roleId = roleId;
      User.users($scope,$rootScope,$timeout,$routeParams.user);
      User.activeRolesAndAccessTokens($scope,$rootScope,$timeout,$routeParams.role,$routeParams.status);
    }else{
       $rootScope.loading = true;
       $scope.userAssign =
      ' <a href="#/add-user">'+
      '<i class="glyphicon glyphicon-list-alt"></i>'+
     ' <span>User assign to a role</span>'+
     '</a>';
      User.rolesAndUser($scope,$rootScope,$timeout);
      }
     
  });
