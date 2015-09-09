'use strict';

/**
 * @ngdoc function
 * @name opensrpSiteApp.controller:FwaPerformanceCtrl
 * @description
 * # FwaPerformanceCtrl
 * Controller of the opensrpSiteApp
 */
angular.module('opensrpSiteApp')
  .controller('FwaPerformanceCtrl', function ($scope,$http,FWAPerformanceService,page) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.range = function(n) {
        return new Array(n);
    };
    
    
    $scope.data = FWAPerformanceService.Data();    
    function getDates(startDate, stopDate) {
      var dateArray = [];
      var currentDate = moment(startDate);            
      while (currentDate <= moment(stopDate)) {                
        dateArray.push( moment(currentDate).format('YYYY-MM-DD') )
          currentDate = moment(currentDate).add(1, 'days');
        }
      return dateArray;
    }               
     // create weeks with demanding day     
    function calculateWeek(start,end){
      var days = getDates(start,end);
      var totalDays = parseInt(getDates(start,end).length);            
      var totalWeeks = Math.ceil(totalDays/7); 
      var weeks = [];
      for(var initWeeks=0;initWeeks<totalWeeks;initWeeks++){
        weeks[initWeeks] = [];
        var startValue = parseInt(initWeeks*7);
        var endValue = parseInt(startValue+7);
        var incrementValue = 0;           
        //console.log(endValue)            
        for (var initDays = startValue; initDays <endValue; initDays++) {
          if ( days[initDays]) {
            weeks[initWeeks][incrementValue] = days[initDays];
            incrementValue++;
          }
        }           
      }
      return weeks;
    }    
    //provider list
    function dataOperation(getData,start,end){
      var weeks = calculateWeek(start,end);
      var providerList = ['opensrp','sohel','demotest','proshanto','asif','shakil','shakil','shakil','shakil','shakil','shakil','shakil','shakil','shakil','shakil'];
      var reportDatas= [];
      var object = new Object();
      for(var provider=0;provider<providerList.length;provider++){
        var dataObject = new Object();                
        var reportData= [];
        reportData.push({init:providerList[provider]});
        for(var init=0;init<weeks.length;init++){
          var startDate =weeks[init][0];
          var endDate = weeks[init][weeks[init].length-1];                    
          var queryResult= jsonsql.query("select * from getData where (TODAY >='"+startDate+"' && TODAY <='"+endDate+"' && PROVIDERID =='"+providerList[provider]+"' ) ",getData);                   
          reportData.push({init:queryResult.length});
        }
        reportDatas.push({"data":reportData});        
      }
      return reportDatas;
    }    
    window.getData = JSON.parse(JSON.stringify($scope.data)); 
    $scope.data =   dataOperation(getData,'2015-01-01','2015-12-31');
    page.pagination($scope,$scope.data);
    $scope.report = function(date){
      var stratMonth = date.startDate._d.getMonth();
      stratMonth =  stratMonth < 10 ? '0' + stratMonth : '' + stratMonth;
      var startDay = date.startDate._d.getDate();
      startDay =  startDay < 10 ? '0' + startDay : '' + startDay;
      var endMonth = date.endDate._d.getMonth();
      endMonth =  endMonth < 10 ? '0' + endMonth : '' + endMonth;
      var start = date.startDate._d.getFullYear()+'-'+stratMonth+'-'+startDay;
      var endDay = date.endDate._d.getDate();
      endDay =  endDay < 10 ? '0' + endDay : '' + endDay;
      var end = date.endDate._d.getFullYear()+'-'+endMonth+'-'+endDay;
      console.log(getData);
      $scope.data =   dataOperation(getData,start,end);
      page.pagination($scope,$scope.data);
      
    }
  });
