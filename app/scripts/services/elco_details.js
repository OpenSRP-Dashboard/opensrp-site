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
        console.log("inside ElcoRegisterService");
        var elcos = null;
        var apiURLs = OPENSRP_WEB_BASE_URL+"/registers/ec?anm-id="+$rootScope.username; 
        var elcoData = $http.get(apiURLs, { cache: true}).success(function (data) { 
            console.log("inside success function of elcoData promise.");           
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
              console.log("is it printed everytime search is changed?");
             
              $scope.sortType     = 'FWWOMAGE'; // set the default sort type
              $scope.sortReverse  = false;
              $scope.currentPage = 1;
              $scope.totalItems = data.length;        
              $scope.entryLimit = 10; // items per page
              $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
              
              // this $watch snippet below binds the function provided with
              // the object 'search' which gets changed whenever an option 
              // is selected in the top 4 dropdowns
              $scope.$watch('search', function (newVal, oldVal) {              
                Common.ec_location_tree(newVal,$scope);
                console.log("inside watch");
                $scope.filtered = $filter('filter')(data,newVal, true); 
                //console.log(newVal); //during the controller call it prints a null object( Object {} )
                //console.log($scope.filtered);
                //console.log(typeof $scope.filtered);

                $scope.totalItems = $scope.filtered.length;          
                $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);

                // as this function is fired whenver the object 'search' changes
                // so always the currentPage is set to 0, as every combination 
                // of the dropdowns is likely to demnand a new set of data
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
