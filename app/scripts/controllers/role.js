'use strict';

/**
 * @ngdoc function
 * @name opensrpSiteApp.controller:RoleCtrl
 * @description
 * # RoleCtrl
 * Controller of the opensrpSiteApp
 */
angular.module('opensrpSiteApp')
  .controller('RoleCtrl', function ($scope,$rootScope,$timeout,$routeParams,$http,Role,Common) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    var param = $routeParams.param;
     Role.accessTokens($rootScope);
    if (!param || param == '') {
      Role.accessTokens($rootScope);
      var param = $routeParams.param;
      $scope.formData = {};
      $scope.save = function() {
        Role.save($scope.formData);
      };
    }else{
      $rootScope.loading = true;
      
      Role.roleAndAccesssByRoleName(param,$rootScope,$timeout);
      $scope.formData = {
        roleName : param        
      }
      $scope.checked = function(access){
        if (!angular.isUndefined($rootScope.roleAndAccess) || $rootScope.roleAndAccess != null) {
          return Common.checkboxChecked(access,$rootScope.roleAndAccess);
        }
        
      }
    }
  });
