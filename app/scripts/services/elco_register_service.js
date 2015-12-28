'use strict';

/**
 * @ngdoc service
 * @name opensrpSiteApp.elcoRegisterService
 * @description
 * # elcoRegisterService
 * Service in the opensrpSiteApp.
 */
angular.module('opensrpSiteApp')
  .service('ElcoRegisterService', function ($http,$rootScope,Base64,OPENSRP_WEB_BASE_URL,Common) {
        var elcos = null;
        var apiURLs = OPENSRP_WEB_BASE_URL+"/registers/ec?anm-id="+$rootScope.username; 
        var elcoData = $http.get(apiURLs, { cache: true}).success(function (data) {            
            elcos = data.ecRegisterEntries;
             window.getECata = data.ecRegisterEntries;
        });    
        return {
            promise:elcoData,
            setData: function (data) {
                elcos = data;
            },
            Data: function () {        
                return elcos;
            },
            dataFilter: function($scope,data,$filter){
              $scope.search = {};
              $scope.resetFilters = function () {    
                $scope.search = {};
              };
             
              $scope.sortType     = 'FWWOMFNAME'; // set the default sort type
              $scope.sortReverse  = false;
              $scope.currentPage = 1;
              $scope.totalItems = data.length;        
              $scope.entryLimit = 10; // items per page
              $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
              
              $scope.$watch('search', function (newVal, oldVal) {              
                Common.ec_location_tree(newVal,$scope);
                
                $scope.filtered = $filter('filter')(data,newVal, true); 
                $scope.totalItems = $scope.filtered.length;          
                $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
                $scope.currentPage = 1;
              }, true);
            },
            download : function($scope,data,title){        
            if ($scope.filtered) {
                newHhFormExport($scope.filtered, title, true);
            }else{
                newHhFormExport(data, title, true);
            }
          },
        };
   
    // AngularJS will instantiate a singleton by calling "new" on this function
  });
