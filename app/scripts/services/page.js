'use strict';

/**
 * @ngdoc service
 * @name opensrpSiteApp.page
 * @description
 * # page
 * Service in the opensrpSiteApp.
 */
angular.module('opensrpSiteApp')
  .service('page', function () {
    this.pagination = function($scope){
        $scope.range = function() {
        var rangeSize = $scope.pageCount();
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
        if ($scope.currentPage > 1) {
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
        /*if (n > 0 && n < $scope.pageCount()) {     
          $scope.currentPage = n;
        }*/
        $scope.currentPage = n;
      };
        
    }
    // AngularJS will instantiate a singleton by calling "new" on this function
  });
