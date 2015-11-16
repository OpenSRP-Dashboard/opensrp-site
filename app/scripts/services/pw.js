'use strict';

/**
 * @ngdoc service
 * @name opensrpSiteApp.PW
 * @description
 * # PW
 * Service in the opensrpSiteApp.
 */
angular.module('opensrpSiteApp')
  .service('PW', function (filterFilter) {
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
       // var queryResult= jsonsql.query("select * from getData where ("+today+" >='"+start+"' && "+today+" <='"+end+"' && ELCODETAILS[0].FWWOMCOUNTRY == 'Bangladesh' && PROVIDERID =='"+$rootScope.username+"' ) ",getData);
         var queryResult= jsonsql.query("select * from getData where (PSRFDETAILS != '' && PSRFDETAILS[0].today  >='"+start+"' && PSRFDETAILS[0].today  <='"+end+"'  && details.FWPSRPREGSTS == 1 ) ",getData);                      
        $scope[ngBind] = queryResult.length;
        console.log( queryResult.length);
        
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
        var end = moment(date).format('YYYY-MM-DD');
        var start = moment(date.setDate(date.getDate()-7)).format('YYYY-MM-DD');       
        window.getData = JSON.parse(JSON.stringify($scope.filtered));
        var queryResult= jsonsql.query("select * from getData where (PSRFDETAILS != '' &&  PSRFDETAILS[0].today  >='"+start+"' && PSRFDETAILS[0].today  <='"+end+"'  && details.FWPSRPREGSTS != ''  ) ",getData);                      
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
        var queryResult= jsonsql.query("select * from getData where (PSRFDETAILS != '' && PSRFDETAILS[0].today  >='"+today+"' && details.FWPSRPREGSTS == 1  ) ",getData);                      
        $scope[ngBind] = queryResult.length;        
        
      }, true);
        
    }
  });
