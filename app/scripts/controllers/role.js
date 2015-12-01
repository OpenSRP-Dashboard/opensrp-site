'use strict';

/**
 * @ngdoc function
 * @name opensrpSiteApp.controller:RoleCtrl
 * @description
 * # RoleCtrl
 * Controller of the opensrpSiteApp
 */
angular.module('opensrpSiteApp')
  .controller('RoleCtrl', function ($scope,$rootScope,$window,$timeout,$routeParams,$http,AclService,Role,Common) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.can = AclService.can;
    var param = $routeParams.param;
     Role.accessTokens($rootScope);
    if (!param || param == '') {
      Role.accessTokens($rootScope);
      var param = $routeParams.param;
      
      $scope.formData = {};
      $scope.formData = {              
              roleId : 22
            }
      $scope.save = function() {
        Role.save($scope.formData,$window);
      };
    }else{
      $rootScope.loading = true;      
      Role.roleAndAccesssByRoleName(param,$rootScope,$timeout,$scope);
      $scope.edit = function() {
        Role.edit($scope.formData,$window);
      };
      /*
      $scope.checked = function(access){
        if (!angular.isUndefined($rootScope.roleAndAccess) || $rootScope.roleAndAccess != null) {
          return Common.checkboxChecked(access,$rootScope.roleAndAccess);
        }
        
      }*/
    }
  });
