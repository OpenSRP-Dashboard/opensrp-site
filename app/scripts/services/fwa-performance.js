'use strict';

/**
 * @ngdoc service
 * @name opensrpSiteApp.FWAPerformance
 * @description
 * # FWAPerformance
 * Service in the opensrpSiteApp.
 */
angular.module('opensrpSiteApp')
  .service('FWAPerformanceService', function ($http,$rootScope,Base64,OPENSRP_WEB_BASE_URL) {
        var allData = null;
        var apiURLs = OPENSRP_WEB_BASE_URL+"/registers/ec?anm-id="+$rootScope.username; 
        var getData = $http.get(apiURLs, { cache: true}).success(function (data) {            
            allData = data.ecRegisterEntries;
            
            
        });    
        return {
            promise:getData,
            setData: function (data) {
                allData = data;
            },
            Data: function () {        
                return allData;
            }
        };
    
  });
