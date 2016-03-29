'use strict';

/**
 * @ngdoc service
 * @name opensrpSiteApp.scheduleLogService
 * @description
 * # scheduleLogService
 * Service in the opensrpSiteApp.
 */
angular.module('opensrpSiteApp')
  .service('scheduleLogService', function ($http,$rootScope,Base64,OPENSRP_WEB_BASE_URL,Common) {
        console.log("inside scheduleLogService");
        var schedules = null;
        //"http://192.168.21.218:1234/192.168.21.218:5984/opensrp/_design/ScheduleLog/_view/testViewForDashboard";
        //var apiURLs = OPENSRP_WEB_BASE_URL+"/registers/ec?anm-id="+$rootScope.username;  192.168.19.96:5984
        //var apiURLs = "http://192.168.21.18:5984/opensrp/_design/ScheduleLog/_view/testViewForDashboard";
        var hhTestUrl = "http://192.168.21.246:5984/opensrp/_design/HouseHold/_view/all";
        var couchUrl = "http://192.168.21.86:1337/192.168.21.218:5984/opensrp/_design/ScheduleLog/_view/testViewForDashboard";
        var scheduleData = $http.get(couchUrl, { 
              cache: true, 
              withCredentials: false,
              headers: {
                'Authorization' : ''
              }
            })
            .success(function (data) { 
              console.log("inside success function of schedule promise.");           
              schedules = data.rows;
              //window.geScheduleData = data.rows;
              console.log(data.rows.length + " - number of schedules received.");
              //return data.rows;
        });
        return {
            promise: scheduleData,
            setData: function (data) {
                schedules = data;
            },
            Data: function () {        
                return schedules;
            },            
            dataFilter: function($scope){
              $scope.search = {};

              var callIndex = 0;

              $scope.sortType     = 'value.anmIdentifier'; // set the default sort type
              $scope.sortReverse  = false;
              $scope.currentPage = 1;
              $scope.totalItems = $scope.schedules.length;        
              $scope.entryLimit = 10; // items per page
              
              $scope.$watch('search', function (newVal, oldVal) {              
                console.log("inside search watch");
                $scope.combinedFilter();
              }, true);
              $scope.$watch('dateRange', function (newVal, oldVal) {           
                console.log("inside dateRange watch");

                if(callIndex == 1){
                  $scope.combinedFilter();
                }
                if(callIndex == 0){
                  callIndex = 1;
                  console.log("calling finalFilter for the first time blocked.");                                      
                }                
              }, true);
            },
            anmList: function($scope,data){
              var anms = new Array();
              var currentWindows = new Array();

              for(var i =0; i < data.length; i++){
                if(anms.indexOf(data[i].value.anmIdentifier) == -1){
                  anms.push(data[i].value.anmIdentifier);
                }
                if(currentWindows.indexOf(data[i].value.currentWindow) == -1){
                  currentWindows.push(data[i].value.currentWindow);
                }
              }

              $scope.anms = anms;  
              $scope.currentWindows = currentWindows;
              //console.log("number of anm - " + anms.length);            
            }
        };
   
    // AngularJS will instantiate a singleton by calling "new" on this function
  });