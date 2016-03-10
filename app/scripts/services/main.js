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
    /*var apiURLs = OPENSRP_WEB_BASE_URL+"/registers/hh?anm-id="+$rootScope.username; 
    var mainData = $http.get(apiURLs, { cache: true},true).success(function (data) {      
            households.push({"data":data.hhRegisterEntries});
            var apiURLs = OPENSRP_WEB_BASE_URL+"/registers/ec?anm-id="+$rootScope.username;
            var elcoData = $http.get(apiURLs, { cache: true}).success(function (data) { 
             households.push({"data":data.ecRegisterEntries});
          });
    });
    */
   function thisMonthHH(today,ngBind){
    var date = new Date();
    var currentMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    var start = moment(currentMonth).format('YYYY-MM-DD');
    var end = moment(date).format('YYYY-MM-DD');      
    var queryResult= jsonsql.query("select * from getHHData where ("+today+" >='"+start+"' && "+today+" <='"+end+"') ", getHHData);                   
    $("#"+ngBind).html(queryResult.length);
  }

  function thisMonthEC(today,ngBind){
    var date = new Date();
    var currentMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    var start = moment(currentMonth).format('YYYY-MM-DD');
    var end = moment(date).format('YYYY-MM-DD');
    //window.getData = JSON.parse(JSON.stringify(getData));       
    var queryResult= jsonsql.query("select * from getEligibleCouplesData where ("+today+" >='"+start+"' && "+today+" <='"+end+"') ", getEligibleCouplesData);                   
    $("#"+ngBind).html(queryResult.length);
  }

  function thisMonthPW(today,ngBind){
    var date = new Date();
    var currentMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    var start = moment(currentMonth).format('YYYY-MM-DD');
    var end = moment(date).format('YYYY-MM-DD');
    //window.getData = JSON.parse(JSON.stringify(getData));       
    //var queryResult= jsonsql.query("select * from getData where ("+today+" >='"+start+"' && "+today+" <='"+end+"' && PROVIDERID =='"+$rootScope.username+"' ) ",getData);                   
    var queryResult= jsonsql.query("select * from getPregnantWomenData where ( PSRFDETAILS[0].today  >='"+start+"' && PSRFDETAILS[0].today  <='"+end+"') ", getPregnantWomenData);                      
    $("#"+ngBind).html(queryResult.length);
  }

  function thisWeekHH(today,ngBind){
    var date = new Date();
    var Dates = new Date().getWeek();
    var end = moment(Dates[1]).format('YYYY-MM-DD');
    var start = moment(Dates[0]).format('YYYY-MM-DD');   
    
    console.log(end + " " + start);    
    //console.log(getData);

    var queryResult= jsonsql.query("select * from getHHData where ("+today+" >='"+start+"' && "+today+" <='"+end+"') ", getHHData);                   
    $("#"+ngBind).html(queryResult.length);
    console.log("length" + queryResult.length);
  }

  function thisWeekEC(today,ngBind){
    var date = new Date();
    var Dates = new Date().getWeek();
    var end = moment(Dates[1]).format('YYYY-MM-DD');
    var start = moment(Dates[0]).format('YYYY-MM-DD');   
    
    //console.log(end + " " + start);

    //window.getData = JSON.parse(JSON.stringify(getData));
    //console.log(getData);
    var queryResult= jsonsql.query("select * from getEligibleCouplesData where ("+today+" >='"+start+"' && "+today+" <='"+end+"') ", getEligibleCouplesData);                   
    $("#"+ngBind).html(queryResult.length);
    //console.log("length" + queryResult.length);
  }

  function thisWeekPW(today,ngBind){
    var date = new Date();
    var Dates = new Date().getWeek();
    var end = moment(Dates[1]).format('YYYY-MM-DD');
    var start = moment(Dates[0]).format('YYYY-MM-DD');      
    //window.getData = JSON.parse(JSON.stringify(getData));
    var queryResult= jsonsql.query("select * from getPregnantWomenData where (PSRFDETAILS[0].today  >='"+start+"' && PSRFDETAILS[0].today  <='"+end+"' ) ", getPregnantWomenData);                      
    
    $("#"+ngBind).html(queryResult.length);
  }
  
  function toDayHH(today,ngBind){
    var date = new Date();
    var currentDay = moment(date).format('YYYY-MM-DD');    
    var queryResult= jsonsql.query("select * from getHHData where ("+today+" =='"+currentDay+"') ",  getHHData);    
    $("#"+ngBind).html(queryResult.length );  
  }

  function toDayEC(today, ngBind){
    var date = new Date();
    var currentDay = moment(date).format('YYYY-MM-DD');             
    //window.getData = JSON.parse(JSON.stringify(getData));
    var queryResult= jsonsql.query("select * from getEligibleCouplesData where ("+today+" =='"+currentDay+"') ",getEligibleCouplesData);                   
    
    $("#"+ngBind).html(queryResult.length);  
  }

  function toDayPW(ngBind){
    var date = new Date();
    var currentDay = moment(date).format('YYYY-MM-DD');             
    //window.getData = JSON.parse(JSON.stringify(getData));
    //console.log("currentDay " + currentDay);
    //var queryResult= jsonsql.query("select * from getPregnantWomenData where PSRFDETAILS[0].today =='"+currentDay+"' ", getPregnantWomenData);
     var queryResult= jsonsql.query("select * from getPregnantWomenData where (PSRFDETAILS[0].today  =='"+currentDay+"' ) ",getPregnantWomenData);
     $("#"+ngBind).html(queryResult.length);  
  }

  function TotalCount(type){
    // getPregnantWomenData, getHHData, getEligibleCouplesData
    console.log("this is from TotalCount");
    if(type == 'H'){
      var stringLength = window.getHHData.length + ""; //total+"";
    }else if(type == 'E'){
      var stringLength = window.getEligibleCouplesData.length + "";
    }else if(type == 'W'){
      var stringLength = window.getPregnantWomenData.length + "";
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

  this.mainReportHH = function($scope,$rootScope,url,today){   
    $.ajax({
      async:false,		   
      dataType: "json",
      cache: true,
      beforeSend: function (xhr) {
          xhr.setRequestHeader ("Authorization", "Basic " + btoa($rootScope.username + ":" + $rootScope.password));
      },
      url:url,
        success:function (data) {
          window.getHHData = JSON.parse(JSON.stringify(data.hhRegisterEntries));
          console.log("total number of data from HH register " + window.getHHData.length);
          TotalCount('H');
          thisMonthHH(today,'thisMonthHH');
          thisWeekHH(today,'thisWeekHH');
          toDayHH(today,'todayHH');
      },
      type:"get"				
    });	   
  }
  
  
  this.mainReportECAndPW = function($scope,$rootScope,url,today){   
    $.ajax({
      async:false,		   
      dataType: "json",
      cache: true,
      beforeSend: function (xhr) {
          xhr.setRequestHeader ("Authorization", "Basic " + btoa($rootScope.username + ":" + $rootScope.password));
      },
      url:url,
      success:function (data) {
        $rootScope.ECR = data.ecRegisterEntries;
        //JSON.parse(JSON.stringify(getData));       
        window.getECAndPWData = JSON.parse(JSON.stringify(data.ecRegisterEntries));       
        console.log("total data from ec register " + window.getECAndPWData.length); 
        window.getPregnantWomenData = jsonsql.query("select * from getECAndPWData where (PSRFDETAILS != '' && details.FWPSRPREGSTS == 1 )", getECAndPWData);
        console.log("number of pw " + window.getPregnantWomenData.length);
        window.getEligibleCouplesData = jsonsql.query("select * from getECAndPWData where (FWELIGIBLE == 1 )", getECAndPWData);
        console.log("number of ec " + window.getEligibleCouplesData .length);

        TotalCount('E');
        thisMonthEC(today,'thisMonthEC');
        thisWeekEC(today,'thisWeekEC');
        toDayEC(today, 'todayEC');        
        //totalPW(data.ecRegisterEntries);
        TotalCount('W');
        thisMonthPW(today,'thisMonthPW');
        thisWeekPW(today,'thisWeekPW');
        toDayPW('todayPW');        
      },
      type:"get"				
    });			
   
  }
    
});
