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
        var apiURL = OPENSRP_WEB_BASE_URL+"registers/hh?anm-id="+$rootScope.username;
        console.log(apiURL);
        return  $http({method: 'GET', url: apiURL}).success(function(data) {
            console.log(data);
            $scope.ecloRegisterEntries = data.ecRegisterEntries;
        });                 
    };
    // AngularJS will instantiate a singleton by calling "new" on this function
  });
