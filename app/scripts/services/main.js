'use strict';

/**
 * @ngdoc service
 * @name opensrpSiteApp.Main
 * @description
 * # Main
 * Service in the opensrpSiteApp.
 */
angular.module('opensrpSiteApp')
  .service('Main', function ($http,$rootScope,$q,Base64,OPENSRP_WEB_BASE_URL,page, COUCHURL) {
    // AngularJS will instantiate a singleton by calling "new" on this function
   
  function TotalCount(type){   
    if(type == 'H'){
      var stringLength = window.getHHData + ""; //total+"";
    }else if(type == 'E'){
      var stringLength = window.getEligibleCouplesData + "";
    }else if(type == 'W'){
      var stringLength = window.getPregnantWomenData + "";
    }
    //var stringLength = total+"";
    var Length = stringLength.split("");
    if (Length.length == 1) {
      $("#L"+type).html(0);
      $("#M"+type+"1").html(0);
      $("#M"+type+"2").html(0);
      $("#M"+type+"3").html(0);
      $("#R"+type).html(Length[0]);
      
    }else if(Length.length == 2){
      $("#L"+type).html(0);
      $("#M"+type+"1").html(0);
      $("#M"+type+"2").html(0);
      $("#M"+type+"3").html(Length[0]);
      $("#R"+type).html(Length[1]);
    }else if(Length.length == 3){
      $("#L"+type).html(0);
      $("#M"+type+"1").html(0);
      $("#M"+type+"2").html(Length[0]);
      $("#M"+type+"3").html(Length[1]);
      $("#R"+type).html(Length[2]);
      
    }else if (Length.length == 4) {      
      $("#L"+type).html(0);
      $("#M"+type+"1").html(Length[0]);
      $("#M"+type+"2").html(Length[1]);
      $("#M"+type+"3").html(Length[2]);
      $("#R"+type).html(Length[3]);
    }else{      
      $("#L"+type).html(Length[0]);
      $("#M"+type+"1").html(Length[1]);
      $("#M"+type+"2").html(Length[2]);
      $("#M"+type+"3").html(Length[3]);
      $("#R"+type).html(Length[4]);
    }   
  }
  
  this.houseHoldList = function($scope,$rootScope,$timeout){
    var url = COUCHURL + '/opensrp/_design/HouseHold/_view/get_all_household';              
    $timeout(function () {
        $http.get(url, { 
          cache: true, 
          withCredentials: false,                  
          headers: {
                    'Authorization' : ''
          }
        })
        .success(function (data) {                         
          $rootScope.households = data.rows;          
          $rootScope.loading = false; 
        });
      }, 250); 
    }   
  
    this.dataCount = function($scope){      
      var date = new Date();
      var currentMonth = new Date(date.getFullYear(), date.getMonth(), 1);  
      var startMonth = moment(currentMonth).format('YYYY-MM-DD');
      var endMonth = moment(date).format('YYYY-MM-DD');    
  
      var Dates = new Date().getWeek();
      var endWeek = moment(Dates[1]).format('YYYY-MM-DD');
      var startWeek = moment(Dates[0]).format('YYYY-MM-DD');
      var url = OPENSRP_WEB_BASE_URL+"/registers/data-count?anm-id="+$rootScope.username+"&start-month="+startMonth+"&end-month="+endMonth+"&start-week="+startWeek+"&end-week="+endWeek+"&type=all";
      $rootScope.loading = true;
      $http.get(url, { cache: true}).success(function (data) {              
        window.userData = JSON.parse(JSON.stringify(data));
        window.getHHData = data[0].householdTotalCount;
        window.getEligibleCouplesData = data[0].elcoTotalCount
        window.getPregnantWomenData = data[0].pwTotalCount
        TotalCount('H');
        TotalCount('W');
        TotalCount('E');
        $("#thisMonthHH").html(data[0].householdThisMonthCount);
        $("#thisWeekHH").html(data[0].householdThisWeekCount);
        $("#todayHH").html(data[0].householdTodayCount);
        $("#thisMonthPW").html(data[0].pwThisMonthCount);
        $("#thisWeekPW").html(data[0].pwThisWeekCount);
        $("#todayPW").html(data[0].pwTodayCount);
        $("#thisMonthEC").html(data[0].elcoThisMonthCount);
        $("#thisWeekEC").html(data[0].elcoThisWeekCount);
        $("#todayEC").html(data[0].elcoTodayCount);         
         $rootScope.loading = false;
      });      
    }
});
