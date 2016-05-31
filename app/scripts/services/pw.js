'use strict';

/**
 * @ngdoc service
 * @name opensrpSiteApp.PW
 * @description
 * # PW
 * Service in the opensrpSiteApp.
 */
angular.module('opensrpSiteApp')
  .service('PW', function (filterFilter, OPENSRP_WEB_BASE_URL) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.reportThisMonth = function($scope,data,$rootScope,today,ngBind){      
      $scope.search = {};
      $scope.resetFilters = function () {    
        $scope.search = {};
      };
      $scope.$watch('search', function (newVal, oldVal) {   
        $scope.filtered = filterFilter(data, newVal);
        var date = new Date();
        var currentMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        var start = moment(currentMonth).format('YYYY-MM-DD');
        var end = moment(date).format('YYYY-MM-DD');
        window.getData = JSON.parse(JSON.stringify($scope.filtered));       
        var queryResult= jsonsql.query("select * from getData where (details.today  >='"+start+"' && details.today  <='"+end+"'  && details.FWPSRPREGSTS == 1 ) ",getData);                      
        $scope[ngBind] = queryResult.length;
        
        
      }, true);
        
    }
    this.reportThisWeek = function($scope,data,$rootScope,today,ngBind){      
      $scope.search = {};
      $scope.resetFilters = function () {    
        $scope.search = {};
      };
      $scope.$watch('search', function (newVal, oldVal) {   
        $scope.filtered = filterFilter(data, newVal);
        var date = new Date();
        var end = moment(Dates[1]).format('YYYY-MM-DD');
         var Dates = new Date().getWeek();
        var start = moment(Dates[0]).format('YYYY-MM-DD');       
        window.getData = JSON.parse(JSON.stringify($scope.filtered));
        var queryResult= jsonsql.query("select * from getData where (details.today  >='"+start+"' && details.today  <='"+end+"'  && details.FWPSRPREGSTS == 1  ) ",getData);                      
        $scope[ngBind] = queryResult.length;
        
        
      }, true);
        
    }
    this.reportToday = function($scope,data,$rootScope,today,ngBind){      
      $scope.search = {};
      $scope.resetFilters = function () {    
        $scope.search = {};
      };
      $scope.$watch('search', function (newVal, oldVal) {   
        $scope.filtered = filterFilter(data, newVal);
        var date = new Date();
        var today = moment(date).format('YYYY-MM-DD');             
        window.getData = JSON.parse(JSON.stringify($scope.filtered));
        var queryResult= jsonsql.query("select * from getData where (details.today  >='"+today+"' && details.FWPSRPREGSTS == 1  ) ",getData);                      
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
        $scope['thisMonth'] = data[0].pwThisMonthCount;
        $scope['thisWeek'] = data[0].pwThisWeekCount;
        $scope['today'] = data[0].pwTodayCount;
        $rootScope.loading = false;
      });          
    }

  });
