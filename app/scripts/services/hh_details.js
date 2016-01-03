'use strict';

/**
 * @ngdoc service
 * @name opensrpSiteApp.hhRegisterService
 * @description
 * # hhRegisterService
 * Service in the opensrpSiteApp.
 */
angular.module('opensrpSiteApp')
  .service('HHRegisterService', function ($http,$rootScope,Base64,OPENSRP_WEB_BASE_URL,filterFilter,Common) {     
        var households = null;       
        var apiURLs = OPENSRP_WEB_BASE_URL+"/registers/hh?anm-id="+$rootScope.username; 
        var householdData = $http.get(apiURLs, { cache: true}).success(function (data) {
            households = data.hhRegisterEntries;
            window.getHHata = data.hhRegisterEntries;
        });    
        return {
            promise:householdData,
            setData: function (data) {
                households = data;
            },
            Data: function () {              
                return households;
            },
            dataFilter: function($scope,data,$filter){
              $scope.search = {};
              $scope.resetFilters = function () {    
                $scope.search = {};
              };
             
              $scope.sortType     = 'FWHOHFNAME'; // set the default sort type
              $scope.sortReverse  = false;
              $scope.currentPage = 1;
              $scope.totalItems = data.length;        
              $scope.entryLimit = 10; // items per page
              $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
              
              $scope.$watch('search', function (newVal, oldVal) {   
              //$scope.filtered = filterFilter(data, newVal);
                Common.hh_location_tree(newVal,$scope)
                console.log(newVal);
                $scope.filtered = $filter('filter')(data,newVal, true); 
                $scope.totalItems = $scope.filtered.length;          
                $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
                $scope.currentPage = 1;
              }, true);
            },                  
          
        };
        
        
        
      
      
  });
