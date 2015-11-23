'use strict';

/**
 * @ngdoc function
 * @name opensrpSiteApp.controller:AccesstokensCtrl
 * @description
 * # AccesstokensCtrl
 * Controller of the opensrpSiteApp
 */
angular.module('opensrpSiteApp')
  .controller('UserCtrl', function ($scope,$rootScope,$timeout,$routeParams,$http,User) {
    $scope.access = [
      {  name: 'Feature'}, 
      { name: 'Bug' }, 
      { name: 'Enhancement' }
    ];
   $scope.formData = {};
   $scope.save = function(){
    User.role($scope.formData);
   }
   User.users($scope,$rootScope,$timeout);
  User.roles($scope,$rootScope,$timeout);
   
    //console.log($rootScope.userList);
  });
