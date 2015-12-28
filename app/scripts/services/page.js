'use strict';

/**
 * @ngdoc service
 * @name opensrpSiteApp.page
 * @description
 * # page
 * Service in the opensrpSiteApp.
 */
angular.module('opensrpSiteApp')   
   .service('page', function (filterFilter) {
      this.dataFilter = function($scope,data,$filter,defaultSort,object){
        $scope.search = {};
        $scope.resetFilters = function () {    
          $scope.search = {};
        };
       
        $scope.sortType     = defaultSort; // set the default sort type
        $scope.sortReverse  = false;
        $scope.currentPage = 1;
        $scope.totalItems = data.length;        
        $scope.entryLimit = 10; // items per page
        $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
        
        $scope.$watch('search', function (newVal, oldVal) {   
        //$scope.filtered = filterFilter(data, newVal);
          $scope.unions = "";
          $scope.thanas = "";          
          if (newVal.details && newVal.details.existing_District ) {
            var key = Object.keys(newVal.details);
            window.allLocation = window.locationList;            
            window.thanaList = jsonsql.query("select * from allLocation where ( tag =='Upazilla' && parent._value == '"+newVal.details[key[0]]+"'  ) ",allLocation);
            $scope.thanas = thanaList;            
          }
          if (newVal.details && newVal.details.existing_Upazilla) {
            if ($scope.thanas.length == 0) {
              $scope.unions = "";
              delete newVal.details.existing_Union ;
              delete newVal.details.existing_Upazilla ;
            }else{
              
              window.allData = window.householdList;            
              window.unionsList = jsonsql.query("select * from allLocation where ( tag =='Union' && parent._value == '"+newVal.details[key[1]]+"'  ) ",allLocation);
              $scope.unions = unionsList;
            }            
          }
          if (newVal.details && newVal.details.existing_District == "") {
            delete newVal.details.existing_District;
          }          
          $scope.filtered = $filter('filter')(data,newVal, true); 
          $scope.totalItems = $scope.filtered.length;          
          $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
          $scope.currentPage = 1;
        }, true);
      };
      this.download = function($scope,data,title){        
        if ($scope.filtered) {
            newHhFormExport($scope.filtered, title, true);
        }else{
            newHhFormExport(data, title, true);
        }
      }
    
    this.downloadHH = function(data,title){     
      newHhFormExport(data, title, true);       
    }
    this.downloadpw = function(data,title){     
      psrfFromExport(data, title, true);       
    }
    this.downloadCS = function(data,title){     
      censusFornExport(data, title, true);       
    }
    
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
        var queryResult= jsonsql.query("select * from getData where ("+today+" >='"+start+"' && "+today+" <='"+end+"') ",getData);                   
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
        var end = moment(date).format('YYYY-MM-DD');
        var start = moment(date.setDate(date.getDate()-7)).format('YYYY-MM-DD');       
        window.getData = JSON.parse(JSON.stringify($scope.filtered));
        var queryResult= jsonsql.query("select * from getData where ("+today+" >='"+start+"' && "+today+" <='"+end+"') ",getData);                   
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
        var currentDay = moment(date).format('YYYY-MM-DD');              
        window.getData = JSON.parse(JSON.stringify($scope.filtered));
        var queryResult= jsonsql.query("select * from getData where ("+today+" =='"+currentDay+"') ",getData);                   
        $scope[ngBind] = queryResult.length;        
        
      }, true);
        
    }
    // AngularJS will instantiate a singleton by calling "new" on this function
  });
