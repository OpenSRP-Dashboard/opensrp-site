'use strict';

/**
 * @ngdoc function
 * @name opensrpSiteApp.controller:HhRegisterControllerCtrl
 * @description
 * # HhRegisterControllerCtrl
 * Controller of the opensrpSiteApp
 */
angular.module('opensrpSiteApp')
.filter('startFrom', function () {
    return function (input, start) {
      if (input) {
          start = +start;
          return input.slice(start);
        }
      return [];
    };
  })
 .controller('HouseholdCtrl', function ($scope,$rootScope,$http,HHRegisterService,filterFilter) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  $scope.download= function(){
      //JSONToCSVConvertor(data, "Vehicle Report", true);
  }; 
  $scope.hhRegisterEntries = HHRegisterService.Data();
  $scope.search = {};

  $scope.resetFilters = function () {    
    $scope.search = {};
  };
  $scope.currentPage = 1;
  $scope.totalItems = HHRegisterService.Data().length;
  $scope.entryLimit = 8; // items per page
  $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
  $scope.$watch('search', function (newVal, oldVal) {   
    $scope.filtered = filterFilter($scope.hhRegisterEntries, newVal);    
    $scope.totalItems = $scope.filtered.length;
    $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
    $scope.currentPage = 1;
  }, true);
  
});