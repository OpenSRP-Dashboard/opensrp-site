'use strict';

/**
 * @ngdoc function
 * @name opensrpSiteApp.controller:HhRegisterControllerCtrl
 * @description
 * # HhRegisterControllerCtrl
 * Controller of the opensrpSiteApp
 */
angular.module('opensrpSiteApp')
  .controller('HouseholdCtrl', function ($scope,$rootScope,$http,HHRegisterService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.download= function(){
      //JSONToCSVConvertor(data, "Vehicle Report", true);
    };
     // this should match however many results your API puts on one page
    HHRegisterService.households($scope);

    
  $scope.itemsPerPage = 5;
  $scope.currentPage = 0;

  $scope.range = function() {
    var rangeSize = 5;
    var ret = [];
    var start;

    start = $scope.currentPage;
    if ( start > $scope.pageCount()-rangeSize ) {
      start = $scope.pageCount()-rangeSize;
    }

    for (var i=start; i<start+rangeSize; i++) {
      ret.push(i);
    }
    return ret;
  };


  $scope.prevPage = function() {
    if ($scope.currentPage > 0) {
      $scope.currentPage--;
    }
  };

  $scope.prevPageDisabled = function() {
    return $scope.currentPage === 0 ? "disabled" : "";
  };

  $scope.nextPage = function() {
    if ($scope.currentPage < $scope.pageCount() - 1) {
      $scope.currentPage++;
    }
  };

  $scope.nextPageDisabled = function() {
    return $scope.currentPage === $scope.pageCount() - 1 ? "disabled" : "";
  };

  $scope.pageCount = function() {
    return Math.ceil($scope.total/$scope.itemsPerPage);
  };

  $scope.setPage = function(n) {
    if (n > 0 && n < $scope.pageCount()) {
 
      $scope.currentPage = n;
    }
  };

  $scope.$watch("currentPage", function(newValue, oldValue) {
     HHRegisterService.Item($scope,newValue*$scope.itemsPerPage, $scope.itemsPerPage);
    
  });
   
    
  
  
});