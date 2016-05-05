'use strict';

/**
 * @ngdoc function
 * @name opensrpSiteApp.controller:RoleCtrl
 * @description
 * # RoleCtrl
 * Controller of the opensrpSiteApp
 */
angular.module('opensrpSiteApp')
  .controller('RoleCtrl', function ($scope,$rootScope,$window,$timeout,$location,$routeParams,$http,AclService,Role,Common,Flash, $log) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.can = AclService.can;
    var roleId = $routeParams.roleId;
    
    $scope.disabled = true;

    //if (!param || param == '') {
    if(roleId){
      Role.accessTokens($rootScope, $timeout, $scope, roleId);
      $rootScope.loading = true;
      console.log("call for a particular role.");
      //Role.roleById($scope, $rootScope, $timeout, roleId);
      $scope.id = roleId;

      /*$scope.ifPrivileged = function(privilege){    
        if($scope.role.privileges == null){
          return false;
        } 
        else{
          for(var i = 0; i < $scope.role.privileges.length; i++){
            if($scope.role.privileges[i].name === privilege)
              return true;
          }         
          return false;
        }       
      }*/

      $scope.edit = function() {
        $log.warn("raw data from role edit form.");
        console.log($scope.formData);
        Role.edit($scope.formData,$window,Flash);
      };    
    }else if($location.path() == '/add-role') {
      $scope.formData = {};
      $scope.formData.name = "";
      $scope.addRole = true;
      Role.accessTokens($rootScope, $timeout, $scope);

      $scope.disabled = false;

      
      $scope.save = function() {
        Role.save($scope.formData,$window,Flash);
      };
    }else{
      //list of roles
      Role.allRoles($scope, $rootScope, $timeout);
    }
  });
