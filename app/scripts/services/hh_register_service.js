'use strict';

/**
 * @ngdoc service
 * @name opensrpSiteApp.hhRegisterService
 * @description
 * # hhRegisterService
 * Service in the opensrpSiteApp.
 */
angular.module('opensrpSiteApp')
  .service('HHRegisterService', function ($http,$rootScope,Base64,OPENSRP_WEB_BASE_URL) {   
     this.households = function ($scope) {
        $rootScope.loading = true;
        $scope.users = [];
        $scope.totalUsers = 30;
        $scope.usersPerPage =2;
        var apiURL = OPENSRP_WEB_BASE_URL+"/registers/hh?anm-id="+$rootScope.username;          
        return  $http({method: 'GET',cache:true, url: apiURL}).success(function(data) {
           
            $scope.loading = false;
            $scope.hhRegisterEntries = data.hhRegisterEntries;
            $scope.users = data.hhRegisterEntries;
            // console.log($scope.users);
            
            });
                 
        };
    this.Item = function($scope,offset, limit){       
        var items = [];        
        for (var i=offset; i<offset+limit; i++) {            
            items.push({ id: i, name: "name "+ i, description: "description " + i });
        }
            $scope.get = items;
            $scope.total = 50;         
        };
   
    // AngularJS will instantiate a singleton by calling "new" on this function
   
  });
