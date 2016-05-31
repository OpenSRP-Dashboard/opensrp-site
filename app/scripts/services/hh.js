'use strict';

/**
 * @ngdoc service
 * @name opensrpSiteApp.HH
 * @description
 * # HH
 * Service in the opensrpSiteApp.
 */
angular.module('opensrpSiteApp')
  .service('HH', function (Common, OPENSRP_WEB_BASE_URL) {
    
        this.reportThisMonth = function($scope,data,$rootScope,today,ngBind,$filter){      
          $scope.search = {};
          $scope.resetFilters = function () {    
              $scope.search = {};
          };
          $scope.$watch('search', function (newVal, oldVal) {   
             //$scope.filtered = filterFilter(data, newVal);
              Common.hh_location_tree(newVal,$scope);                
              $scope.filtered = $filter('filter')(data,newVal, true); 
              var date = new Date();
              var currentMonth = new Date(date.getFullYear(), date.getMonth(), 1);
              var start = moment(currentMonth).format('YYYY-MM-DD');
              var end = moment(date).format('YYYY-MM-DD');
              window.getData = JSON.parse(JSON.stringify($scope.filtered));
             // var queryResult= jsonsql.query("select * from getData where ("+today+" >='"+start+"' && "+today+" <='"+end+"' && ELCODETAILS[0].FWWOMCOUNTRY == 'Bangladesh' && PROVIDERID =='"+$rootScope.username+"' ) ",getData);
              var queryResult= jsonsql.query("select * from getData where ("+today+" >='"+start+"' && "+today+" <='"+end+"') ",getData);                   
              
              $scope[ngBind] = queryResult.length;
              
              
            }, true);                
        },
        this.reportThisWeek = function($scope,data,$rootScope,today,ngBind,$filter){      
          $scope.search = {};
          $scope.resetFilters = function () {    
            $scope.search = {};
          };
          $scope.$watch('search', function (newVal, oldVal) {
            Common.hh_location_tree(newVal,$scope);                
            $scope.filtered = $filter('filter')(data,newVal, true); 
            var date = new Date();
            var Dates = new Date().getWeek();
            var end = moment(Dates[1]).format('YYYY-MM-DD');
            var start = moment(Dates[0]).format('YYYY-MM-DD');       
            window.getData = JSON.parse(JSON.stringify($scope.filtered));
            var queryResult= jsonsql.query("select * from getData where ("+today+" >='"+start+"' && "+today+" <='"+end+"') ",getData);                   
            $scope[ngBind] = queryResult.length;
          }, true);                
        },
        this.reportToday =  function($scope,data,$rootScope,today,ngBind,$filter){      
          $scope.search = {};
          $scope.resetFilters = function () {    
            $scope.search = {};
          };
          $scope.$watch('search', function (newVal, oldVal) {
            Common.hh_location_tree(newVal,$scope); 
            $scope.filtered = $filter('filter')(data,newVal, true); 
            var date = new Date();
            var currentDay = moment(date).format('YYYY-MM-DD');              
            window.getData = JSON.parse(JSON.stringify($scope.filtered));
            var queryResult= jsonsql.query("select * from getData where ("+today+" =='"+currentDay+"') ",getData);                   
            $scope[ngBind] = queryResult.length;        
            
          }, true);
            
        }
        this.allReports = function($scope, $rootScope, $http){
          var date = new Date();
          var currentMonth = new Date(date.getFullYear(), date.getMonth(), 1);  
          var startMonth = moment(currentMonth).format('YYYY-MM-DD');
          var endMonth = moment(date).format('YYYY-MM-DD');    
      
          var Dates = new Date().getWeek();
          var endWeek = moment(Dates[1]).format('YYYY-MM-DD');
          var startWeek = moment(Dates[0]).format('YYYY-MM-DD');
          var url = OPENSRP_WEB_BASE_URL+"/registers/data-count?anm-id="+$rootScope.username+"&start-month="+startMonth+"&end-month="+endMonth+"&start-week="+startWeek+"&end-week="+endWeek+"&type=all";
          $rootScope.loading = true;
          $http.get(url, { cache: false}).success(function (data) {              
            console.log(data);
            $scope['thisMonth'] = data[0].householdThisMonthCount;
            $scope['thisWeek'] = data[0].householdThisWeekCount;
            $scope['today'] = data[0].householdTodayCount;
            $rootScope.loading = false;
          });          
        }
    
  });
