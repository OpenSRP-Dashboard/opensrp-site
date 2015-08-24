'use strict';

/**
 * @ngdoc service
 * @name opensrpSiteApp.elcoRegisterService
 * @description
 * # elcoRegisterService
 * Service in the opensrpSiteApp.
 */
angular.module('opensrpSiteApp')
  .service('ElcoRegisterService', function ($http,$rootScope,Base64,OPENSRP_WEB_BASE_URL) {
    this.elcos = function ($scope) {
        $scope.loading = true;
        var apiURL = OPENSRP_WEB_BASE_URL+"/registers/ec?anm-id="+$rootScope.username;
        console.log(apiURL);
        return  $http({method: 'GET',cache:true, url: apiURL}).success(function(data) {
            console.log(data);
            $scope.loading = false;
            $scope.ecloRegisterEntries = data.ecRegisterEntries;
        });                 
    };
    // AngularJS will instantiate a singleton by calling "new" on this function
  });
