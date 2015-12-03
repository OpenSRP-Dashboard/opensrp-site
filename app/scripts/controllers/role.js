'use strict';

/**
 * @ngdoc function
 * @name opensrpSiteApp.controller:RoleCtrl
 * @description
 * # RoleCtrl
 * Controller of the opensrpSiteApp
 */
angular.module('opensrpSiteApp')
  .controller('RoleCtrl', function ($scope,$rootScope,$window,$timeout,$routeParams,$http,AclService,Role,Common,Flash) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.can = AclService.can;
    var param = $routeParams.param;
     Role.accessTokens($rootScope);
     $scope.disabled = true;
    if (!param || param == '') {
      Role.accessTokens($rootScope);
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
      $rootScope.loading = true;
      
      Role.roleAndAccesssByRoleName(param,$rootScope,$timeout,$scope);
      $scope.edit = function() {
        Role.edit($scope.formData,$window,Flash);
      };
      /*
      $scope.checked = function(access){
        if (!angular.isUndefined($rootScope.roleAndAccess) || $rootScope.roleAndAccess != null) {
          return Common.checkboxChecked(access,$rootScope.roleAndAccess);
        }
        
      }*/
    }
  });
