'use strict';

/**
 * @ngdoc service
 * @name opensrpSiteApp.Main
 * @description
 * # Main
 * Service in the opensrpSiteApp.
 */
angular.module('opensrpSiteApp')
  .service('Main', function ($http,$rootScope,$q,Base64,OPENSRP_WEB_BASE_URL) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    
    var households = [];
    var apiURLs = OPENSRP_WEB_BASE_URL+"/registers/hh?anm-id="+$rootScope.username; 
    var mainData = $http.get(apiURLs, { cache: true},true).success(function (data) {
      //households = data.hhRegisterEntries;
      households.push({"data":data.hhRegisterEntries});
    });
    
    var apiURLs = OPENSRP_WEB_BASE_URL+"/registers/ec?anm-id="+$rootScope.username;
    var elcoData = $http.get(apiURLs, { cache: true}).success(function (data) {            
           // elcos = data.ecRegisterEntries;
             households.push({"data":data.ecRegisterEntries});
    });
   
    
    $q.all([mainData, elcoData]).then(function(data){
      console.log(data[0], data[1]);
      
      return {
      promise:mainData,
      setData: function (data) {
        households = data;
      },
      Data: function () {        
        return households;
      }
    };
    });
    
  });
