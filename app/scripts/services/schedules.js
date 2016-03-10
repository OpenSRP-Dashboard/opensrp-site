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
        var couchUrl = "http://192.168.21.18:1337/192.168.21.218:5984/opensrp/_design/ScheduleLog/_view/testViewForDashboard";
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
        // this ajax call below works
        /*$.ajax({
            async:false,       
            dataType: "json",
            url:hhTestUrl,
            //username:"sohel",
            //password:"Sohel@123",
            success:function (data) {
               //console.log(data.rows[0].value.actionType);
               console.log("data on success - " + data.total_rows);
               //console.log(typeof data);
               //schedules = data.rows;
            },
            error: function(a,b,c){
               console.log("jqXHR on error - " + a);
               console.log("textStatus on error - " + b);
               console.log("errorThrown on error - " + c);
            },
            complete:function(){
              console.log("call completed from scheduleLog service.");
            },
            type:"get"        
        });*/
        return {
            promise: scheduleData,
            setData: function (data) {
                schedules = data;
            },
            Data: function () {        
                return schedules;
            }
            /*dataFilter: function($scope,data,$filter){
              $scope.search = {};
              $scope.resetFilters = function () {    
                $scope.search = {};
              };
             
              $scope.sortType     = 'FWWOMAGE'; // set the default sort type
              $scope.sortReverse  = false;
              $scope.currentPage = 1;
              $scope.totalItems = data.length;        
              $scope.entryLimit = 10; // items per page
              $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
              
              $scope.$watch('search', function (newVal, oldVal) {              
                Common.ec_location_tree(newVal,$scope);
                
                $scope.filtered = $filter('filter')(data,newVal, true); 
                $scope.totalItems = $scope.filtered.length;          
                $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
                $scope.currentPage = 1;
              }, true);
            },
            download : function($scope,data,title){        
            if ($scope.filtered) {
                newHhFormExport($scope.filtered, title, true);
            }else{
                newHhFormExport(data, title, true);
            }
          };*/
        };
   
    // AngularJS will instantiate a singleton by calling "new" on this function
  });