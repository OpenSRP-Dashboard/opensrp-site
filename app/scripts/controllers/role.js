'use strict';

/**
 * @ngdoc function
 * @name opensrpSiteApp.controller:RoleCtrl
 * @description
 * # RoleCtrl
 * Controller of the opensrpSiteApp
 */
angular.module('opensrpSiteApp')
  .controller('RoleCtrl', function ($scope,$rootScope,$routeParams,$http,Role) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
     $scope.accessList = ['Household', 'Household Details', 'Elco', 'Elco Details','PW','PW Details','Data Export'];
     $scope.typeOptions = [
        {  name: 'Feature'}, 
        { name: 'Bug' }, 
        { name: 'Enhancement' }
    ];
     var param = $routeParams.param;
      $scope.formData = {};
      $scope.save = function() {
        Role.save($scope.formData);
      };
  });
