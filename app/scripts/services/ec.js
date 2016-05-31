'use strict';

/**
 * @ngdoc service
 * @name opensrpSiteApp.EC
 * @description
 * # EC
 * Service in the opensrpSiteApp.
 */
angular.module('opensrpSiteApp')
  .service('EC', function (Common, OPENSRP_WEB_BASE_URL) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    
      this.reportThisMonth = function($scope,data,$rootScope,today,ngBind,$filter){      
        $scope.search = {};
        $scope.resetFilters = function () {    
          $scope.search = {};
        };
      $scope.$watch('search', function (newVal, oldVal) {   
         //$scope.filtered = filterFilter(data, newVal);
          Common.ec_location_tree(newVal,$scope);                
          $scope.filtered = $filter('filter')(data,newVal, true); 
          var date = new Date();
          var currentMonth = new Date(date.getFullYear(), date.getMonth(), 1);
          var start = moment(currentMonth).format('YYYY-MM-DD');
          var end = moment(date).format('YYYY-MM-DD');
          window.getData = JSON.parse(JSON.stringify($scope.filtered));
         // var queryResult= jsonsql.query("select * from getData where ("+today+" >='"+start+"' && "+today+" <='"+end+"' && ELCODETAILS[0].FWWOMCOUNTRY == 'Bangladesh' && PROVIDERID =='"+$rootScope.username+"' ) ",getData);

          //window.getData = jsonsql.query("select * from getData where (FWELIGIBLE == 1 )", getData);
          var queryResult= jsonsql.query("select * from getData where ("+today+" >='"+start+"' && "+today+" <='"+end+"' ) ",getData);
          //console.log(start + " -- " + end + " -- " + today);
          //console.log(queryResult);
          $scope[ngBind] = queryResult.length;
          
          
        }, true);
          
      },
      this.reportThisWeek = function($scope,data,$rootScope,today,ngBind,$filter){      
        $scope.search = {};
        $scope.resetFilters = function () {    
          $scope.search = {};
        };
        $scope.$watch('search', function (newVal, oldVal) {
          Common.ec_location_tree(newVal,$scope);
          var Dates = new Date().getWeek();                
          $scope.filtered = $filter('filter')(data,newVal, true); 
          var date = new Date();
          var end = moment(Dates[1]).format('YYYY-MM-DD');
          var start = moment(Dates[0]).format('YYYY-MM-DD');
         
          //alert(Dates[0].toLocaleDateString() + ' to '+ Dates[1].toLocaleDateString())
          window.getData = JSON.parse(JSON.stringify($scope.filtered));
          var queryResult= jsonsql.query("select * from getData where ("+today+" >='"+start+"' && "+today+" <='"+end+"') ",getData);                   
          $scope[ngBind] = queryResult.length;
          
          
        }, true);
          
      },
      this.reportToday = function($scope,data,$rootScope,today,ngBind,$filter){      
        $scope.search = {};
        $scope.resetFilters = function () {    
          $scope.search = {};
        };
        $scope.$watch('search', function (newVal, oldVal) {
          Common.ec_location_tree(newVal,$scope); 
          $scope.filtered = $filter('filter')(data,newVal, true); 
          var date = new Date();
          var currentDay = moment(date).format('YYYY-MM-DD');              
          window.getData = JSON.parse(JSON.stringify($scope.filtered));
          var queryResult= jsonsql.query("select * from getData where ("+today+" =='"+currentDay+"' ) ",getData);                   
          $scope[ngBind] = queryResult.length;        
          
        }, true);
          
      },

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
          $scope['thisMonth'] = data[0].elcoThisMonthCount;
          $scope['thisWeek'] = data[0].elcoThisWeekCount;
          $scope['today'] = data[0].elcoTodayCount;
          $rootScope.loading = false;
        });          
      }
  });
