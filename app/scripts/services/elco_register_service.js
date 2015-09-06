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
        var elcos = null;
        var apiURLs = OPENSRP_WEB_BASE_URL+"/registers/ec?anm-id="+$rootScope.username; 
        var elcoData = $http.get(apiURLs, { cache: true}).success(function (data) {            
            elcos = data.ecRegisterEntries;
            //console.log(elcos);
            window.elcoData = JSON.parse(JSON.stringify(data));            
            var s= jsonsql.query("select * from elcoData.ecRegisterEntries where (PROVIDERID=='opensrp') ",elcoData);
            console.log(s.length);
            var results =[];
             var arr = [];
            for(var j=0;j<3;j++){
                arr[j] = []; 
                for (var i = 0; i <4; i++) {
                    arr[j][i] = j*i;
                    //results.push(d);
                }
                //results.push( JSON.stringify(sub));
            }
            console.log(arr.length);
        });    
        return {
            promise:elcoData,
            setData: function (data) {
                elcos = data;
            },
            Data: function () {        
                return elcos;
            }
        };
   
    // AngularJS will instantiate a singleton by calling "new" on this function
  });
