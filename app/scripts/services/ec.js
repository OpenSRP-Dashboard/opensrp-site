'use strict';

/**
 * @ngdoc service
 * @name opensrpSiteApp.EC
 * @description
 * # EC
 * Service in the opensrpSiteApp.
 */
angular.module('opensrpSiteApp')
  .service('EC', function (Common) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return {
            reportThisMonth : function($scope,data,$rootScope,today,ngBind,$filter){      
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
                var queryResult= jsonsql.query("select * from getData where ("+today+" >='"+start+"' && "+today+" <='"+end+"') ",getData);                   
                $scope[ngBind] = queryResult.length;
                
                
              }, true);
                
            },
            reportThisWeek : function($scope,data,$rootScope,today,ngBind,$filter){      
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
            reportToday: function($scope,data,$rootScope,today,ngBind,$filter){      
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
                var queryResult= jsonsql.query("select * from getData where ("+today+" =='"+currentDay+"') ",getData);                   
                $scope[ngBind] = queryResult.length;        
                
              }, true);
                
            },
          
    };
  });
