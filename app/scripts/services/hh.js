'use strict';

/**
 * @ngdoc service
 * @name opensrpSiteApp.HH
 * @description
 * # HH
 * Service in the opensrpSiteApp.
 */
angular.module('opensrpSiteApp')
  .service('HH', function (Common) {
    
    
    return {
            reportThisMonth : function($scope,data,$rootScope,today,ngBind,$filter){      
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
            reportThisWeek : function($scope,data,$rootScope,today,ngBind,$filter){      
              $scope.search = {};
              $scope.resetFilters = function () {    
                $scope.search = {};
              };
              $scope.$watch('search', function (newVal, oldVal) {
                Common.hh_location_tree(newVal,$scope);                
                $scope.filtered = $filter('filter')(data,newVal, true); 
                var date = new Date();
                var end = moment(date).format('YYYY-MM-DD');
                var start = moment(date.setDate(date.getDate()-7)).format('YYYY-MM-DD');       
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
                Common.hh_location_tree(newVal,$scope); 
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
