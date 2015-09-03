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
        var households = null;
        var apiURLs = OPENSRP_WEB_BASE_URL+"/registers/hh?anm-id="+$rootScope.username; 
        var householdData = $http.get(apiURLs, { cache: true}).success(function (data) {
            households = data.hhRegisterEntries;
            console.log(households)
        });    
        return {
            promise:householdData,
            setData: function (data) {
                households = data;
            },
            Data: function () {        
                return households;
            }
        };
  });
