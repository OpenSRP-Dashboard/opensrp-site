'use strict';

/**
 * @ngdoc function
 * @name opensrpSiteApp.controller:HhCtrl
 * @description
 * # HhCtrl
 * Controller of the opensrpSiteApp
 */
angular.module('opensrpSiteApp')
  .controller('HhCtrl', function ($scope,$http,$rootScope,$timeout,HHRegisterService,page,HH,Common,AclService,$filter) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.detailDataLink =
     ' <a href="#/households">'+
     '<i class="glyphicon glyphicon-list-alt"></i>'+
    ' <span>Data Details</span>'+
    '</a>';
    
    //console.log(daysInMonth(1,2015));
    
    $scope.data = HHRegisterService.Data();
    $scope.can = AclService.can;
    
    var date = new Date();
    var currentMonth = new Date(date.getFullYear(), date.getMonth(), 1);    
    var firstDay = moment(currentMonth).format('YYYY-MM-DD');
    var toDay = moment(date).format('YYYY-MM-DD');
    
    var previousSevenDaysDate = moment(date.setDate(date.getDate()-7)).format('YYYY-MM-DD');
    
    function thisMonth(getData,start,end){
      var queryResult= jsonsql.query("select * from getData where (TODAY >='"+start+"' && TODAY <='"+end+"') ",getData);                   
      $scope.thisMonth = queryResult.length;
    }
    
    function daysInMonth(month,year) {
      return new Date(year, month, 0).getDate();
    }
    
    var monthLists = [];
    monthLists[3] = new Date(date.getFullYear(), date.getMonth(), 1);
    monthLists[2] = new Date(date.getFullYear(), date.getMonth()-1, 1);
    monthLists[1] = new Date(date.getFullYear(), date.getMonth()-2, 1);
    monthLists[0] = new Date(date.getFullYear(), date.getMonth()-3, 1);
   
    
    Common.chartDataCal($scope,monthLists,window.getHHata,'TODAY',$timeout);
    
    HH.reportThisMonth($scope,$scope.data,$rootScope,'TODAY','thisMonth',$filter);
    HH.reportThisWeek($scope,$scope.data,$rootScope,'TODAY','thisWeek',$filter);
    HH.reportToday($scope,$scope.data,$rootScope,'TODAY','today',$filter);
    Common.locations($scope);
    Common.users($scope);
    //thisMonth(getData,firstDay,toDay);
    
    
  });
