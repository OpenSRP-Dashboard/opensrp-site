'use strict';

/**
 * @ngdoc service
 * @name opensrpSiteApp.scheduleLogService
 * @description
 * # scheduleLogService
 * Service in the opensrpSiteApp.
 */
angular.module('opensrpSiteApp')
  .service('testService', function ($http,$rootScope,Base64,OPENSRP_WEB_BASE_URL,Common, COUCHURL) {
        console.log("inside testService");
        var users = null;

        var couchUrl = "http://192.168.21.86:1337/192.168.21.218:5984/rules/_design/AccessControl/_view/All_Users";
        var userData = $http.get(couchUrl, { 
              cache: true, 
              withCredentials: false,
              headers: {
                'Authorization' : ''
              }
            })
            .success(function (data) { 
              console.log("inside success function of user promise.");           
              users = data.rows;
              //window.geScheduleData = data.rows;
              //console.log(data.rows.length + " - number of schedules received.");
              //return data.rows;
        });
        return {
            promise: userData,
            setData: function (data) {
                users = data;
            },
            Data: function () {    
                return users;                
            }
        };
   
    // AngularJS will instantiate a singleton by calling "new" on this function
  });