'use strict';

/**
 * @ngdoc service
 * @name opensrpSiteApp.Main
 * @description
 * # Main
 * Service in the opensrpSiteApp.
 */
angular.module('opensrpSiteApp')
  .service('Main', function ($http,$rootScope,$q,Base64,OPENSRP_WEB_BASE_URL,page) {
    // AngularJS will instantiate a singleton by calling "new" on this function
   
    var households = [];
    var apiURLs = OPENSRP_WEB_BASE_URL+"/registers/hh?anm-id="+$rootScope.username; 
   /* var mainData = $http.get(apiURLs, { cache: true},true).success(function (data) {      
            households.push({"data":data.hhRegisterEntries});
            var apiURLs = OPENSRP_WEB_BASE_URL+"/registers/ec?anm-id="+$rootScope.username;
            var elcoData = $http.get(apiURLs, { cache: true}).success(function (data) { 
             households.push({"data":data.ecRegisterEntries});
          });
    });
    */
   function thisMonth(getData,today,ngBind){
    var date = new Date();
    var currentMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    var start = moment(currentMonth).format('YYYY-MM-DD');
    var end = moment(date).format('YYYY-MM-DD');
    window.getData = JSON.parse(JSON.stringify(getData));       
    var queryResult= jsonsql.query("select * from getData where ("+today+" >='"+start+"' && "+today+" <='"+end+"' && PROVIDERID =='"+$rootScope.username+"' ) ",getData);                   
    $("#"+ngBind).html(queryResult.length);
  }
  function thisWeek(getData,today,ngBind){
    var date = new Date();
    var end = moment(date).format('YYYY-MM-DD');
    var start = moment(date.setDate(date.getDate()-7)).format('YYYY-MM-DD');    
    window.getData = JSON.parse(JSON.stringify(getData));
    var queryResult= jsonsql.query("select * from getData where ("+today+" >='"+start+"' && "+today+" <='"+end+"' && PROVIDERID =='"+$rootScope.username+"' ) ",getData);                   
    $("#"+ngBind).html(queryResult.length);
  }
  
  function toDay(getData,today,ngBind){
    var date = new Date();
    var currentDay = moment(date).format('YYYY-MM-DD');             
    window.getData = JSON.parse(JSON.stringify(getData));
    var queryResult= jsonsql.query("select * from getData where ("+today+" =='"+currentDay+"'  && PROVIDERID =='"+$rootScope.username+"' ) ",getData);                   
    
    $("#"+ngBind).html(queryResult.length);  
  }
  
  
  function thisMonthPW(getData,today,ngBind){
    var date = new Date();
    var currentMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    var start = moment(currentMonth).format('YYYY-MM-DD');
    var end = moment(date).format('YYYY-MM-DD');
    window.getData = JSON.parse(JSON.stringify(getData));       
    var queryResult= jsonsql.query("select * from getData where ("+today+" >='"+start+"' && "+today+" <='"+end+"' && PROVIDERID =='"+$rootScope.username+"' ) ",getData);                   
    $("#"+ngBind).html(queryResult.length);
  }
  
  
  function thisWeekPW(getData,today,ngBind){
    var date = new Date();
    var end = moment(date).format('YYYY-MM-DD');
    var start = moment(date.setDate(date.getDate()-7)).format('YYYY-MM-DD');       
    window.getData = JSON.parse(JSON.stringify(getData));
    var queryResult= jsonsql.query("select * from getData where ("+today+" >='"+start+"' && "+today+" <='"+end+"' && PROVIDERID =='"+$rootScope.username+"' ) ",getData);                   
    $("#"+ngBind).html(queryResult.length);
  }
  
  function toDayPW(getData,today,ngBind){
    var date = new Date();
    var currentDay = moment(date).format('YYYY-MM-DD');             
    window.getData = JSON.parse(JSON.stringify(getData));
    var queryResult= jsonsql.query("select * from getData where ("+today+" =='"+currentDay+"'  && PROVIDERID =='"+$rootScope.username+"' ) ",getData);                   
    $("#"+ngBind).html(queryResult.length);  
  }
  function TotalCount(total,type){
    var stringLength = total+"";
    var Lenght = stringLength.split("");
    if (Lenght.length == 1) {
      $("#L"+type).html(0);
      $("#M"+type+"1").html(0);
      $("#M"+type+"2").html(0);
      $("#M"+type+"3").html(0);
      $("#R"+type).html(Lenght[0]);
      
    }else if(Lenght.length == 2){
      $("#L"+type).html(0);
      $("#M"+type+"1").html(0);
      $("#M"+type+"2").html(0);
      $("#M"+type+"3").html(Lenght[0]);
      $("#R"+type).html(Lenght[1]);
    }else if(Lenght.length == 3){
      $("#L"+type).html(0);
      $("#M"+type+"1").html(0);
      $("#M"+type+"2").html(Lenght[0]);
      $("#M"+type+"3").html(Lenght[1]);
      $("#R"+type).html(Lenght[2]);
      
    }else if (Lenght.length == 4) {      
      $("#L"+type).html(0);
      $("#M"+type+"1").html(Lenght[0]);
      $("#M"+type+"2").html(Lenght[1]);
      $("#M"+type+"3").html(Lenght[2]);
      $("#R"+type).html(Lenght[3]);
    }else{
      
      $("#L"+type).html(Lenght[0]);
      $("#M"+type+"1").html(Lenght[1]);
      $("#M"+type+"2").html(Lenght[2]);
      $("#M"+type+"3").html(Lenght[3]);
      $("#R"+type).html(Lenght[4]);
    }
   
  }
  this.mainReportHH = function($scope,$rootScope,url,today,monthId,weekId,dayId){   
    $.ajax({
      async:false,		   
      dataType: "json",
      cache: true,
      beforeSend: function (xhr) {
          xhr.setRequestHeader ("Authorization", "Basic " + btoa($rootScope.username + ":" + $rootScope.password));
      },
      url:url,
        success:function (data) {
          
          TotalCount(data.hhRegisterEntries.length,'H');
          thisMonth(data.hhRegisterEntries,today,monthId);
          thisWeek(data.hhRegisterEntries,today,weekId);
          toDay(data.hhRegisterEntries,today,dayId);
      },
      type:"get"				
    });	   
  }
  
  
  this.mainReportEC = function($scope,$rootScope,url,today,monthId,weekId,dayId){   
    $.ajax({
      async:false,		   
      dataType: "json",
      cache: true,
      beforeSend: function (xhr) {
          xhr.setRequestHeader ("Authorization", "Basic " + btoa($rootScope.username + ":" + $rootScope.password));
      },
      url:url,
      success:function (data) {
        TotalCount(data.ecRegisterEntries.length,'E');
        thisMonth(data.ecRegisterEntries,today,monthId);
        thisWeek(data.ecRegisterEntries,today,weekId);
        toDay(data.ecRegisterEntries,today,dayId);
      },
      type:"get"				
    });			
   
  }
    
});
