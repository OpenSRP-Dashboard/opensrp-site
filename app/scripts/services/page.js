'use strict';

/**
 * @ngdoc service
 * @name opensrpSiteApp.page
 * @description
 * # page
 * Service in the opensrpSiteApp.
 */
angular.module('opensrpSiteApp')   
   .service('page', function (filterFilter) {
    this.pagination = function($scope,data){
        $scope.search = {};
        $scope.resetFilters = function () {    
          $scope.search = {};
        };
        $scope.currentPage = 1;
        $scope.totalItems = data.length;
        $scope.entryLimit = 8; // items per page
        $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
        $scope.$watch('search', function (newVal, oldVal) {   
          $scope.filtered = filterFilter(data, newVal);    
          $scope.totalItems = $scope.filtered.length;
          $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
          $scope.currentPage = 1;
        }, true);        
        
    }
    // AngularJS will instantiate a singleton by calling "new" on this function
  });
