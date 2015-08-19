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
        $scope.loading = true;
            var apiURL = OPENSRP_WEB_BASE_URL+"registers/hh?anm-id="+$rootScope.username;          
            return  $http({method: 'GET', url: apiURL}).success(function(data) {
                console.log(data.hhRegisterEntries);
                $scope.loading = false;
                $scope.hhRegisterEntries = data.hhRegisterEntries;
              });
                 
        };

   
    // AngularJS will instantiate a singleton by calling "new" on this function
   
  });
