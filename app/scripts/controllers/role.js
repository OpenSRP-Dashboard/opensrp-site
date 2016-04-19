'use strict';

/**
 * @ngdoc function
 * @name opensrpSiteApp.controller:RoleCtrl
 * @description
 * # RoleCtrl
 * Controller of the opensrpSiteApp
 */
angular.module('opensrpSiteApp')
  .controller('RoleCtrl', function ($scope,$rootScope,$window,$timeout,$location,$routeParams,$http,AclService,Role,Common,Flash) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.can = AclService.can;
    var param = $routeParams.param;
    Role.accessTokens($rootScope, $timeout);
    $scope.disabled = true;

    //if (!param || param == '') {
    if(param){
      $rootScope.loading = true;
      console.log("call for a particular role.");
      Role.roleById($scope,$rootScope,$timeout,param);

      $scope.ifPrivileged = function(privilege){     
       for(var i = 0; i < $scope.role.privileges.length; i++){
          if($scope.role.privileges[i].name === privilege)
            return true;
       }         
       return false;
      }

      $scope.edit = function() {
        Role.edit($scope.formData,$window,Flash);
      };
      /*
      $scope.checked = function(access){
        if (!angular.isUndefined($rootScope.roleAndAccess) || $rootScope.roleAndAccess != null) {
          return Common.checkboxChecked(access,$rootScope.roleAndAccess);
        }
        
      }*/     
    }else if($location.path() == '/add-role') {
      Role.accessTokens($rootScope, $timeout);
      var param = $routeParams.param;
      $scope.disabled = false;
      $scope.formData = {};
      $scope.formData = {              
              roleId : 22
            }
      $scope.save = function() {
        Role.save($scope.formData,$window,Flash);
      };
    }else{
      //list of roles
      Role.allRoles($scope, $rootScope, $timeout);
    }
  });
