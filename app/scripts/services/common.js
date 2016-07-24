'use strict';

/**
 * @ngdoc service
 * @name opensrpSiteApp.Common
 * @description
 * # Common
 * Service in the opensrpSiteApp.
 */
angular.module('opensrpSiteApp')
  .service('Common', function ($q,$rootScope, $http,filterFilter,AclService,OPENSRP_WEB_BASE_URL) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    function daysInMonth(month,year) {
      return new Date(year, month, 0).getDate();
    }
    Date.prototype.getWeek = function(start)
    {
      //Calcing the starting point
      start = start || 0;      
      var todayDate = new Date(this.setHours(0, 0, 0, 0));      
      var today =  todayDate.getUTCDate();
      var month = todayDate.getUTCMonth()+1;
      var year = todayDate.getUTCFullYear();
      var numDays= daysInMonth(month,year);
     
     
       while(today >1){
        if (today%7 ==0) {
          today = today+1;
         break;
        }
        today=today-1;
       }
      console.log(today);
      var endDay ;
      if (numDays-today >7) {
        endDay = today+6;
      }else{
        endDay = numDays;
      }
      if (today<10) {          
          today = '0'+today;
      }else{
          today = today;
      }
      if (endDay<10) {          
          endDay = '0'+endDay;
      }else{
          endDay = endDay;
      }
      if (month<10) {          
          month = '0'+month;
      }else{
          month = month;
      }
        
      return [year+"-"+month+"-"+today, year+"-"+month+"-"+endDay];
      
    }    

    function getWeeksInMonth(month, year,date){
      var weeks=[],firstDate=new Date(year, month, 1), numDays= daysInMonth(month,year);
      var thisDate = new Date(date);           
      var start=1;
      var end=7;     
      while(start<=numDays){
        var startWeek = "";
         var endWeek = "";
        if (start<10) {          
          startWeek = '0'+start;
        }else{
          startWeek = start;
        }
        if (end<10) {          
          endWeek = '0'+end;
        }else{
          endWeek = end;
        }
          weeks.push({start:year+"-"+month+"-"+startWeek,end:year+"-"+month+"-"+endWeek});
          start = end + 1;
          end = end + 7;
          if(end>numDays)
              end=numDays;    
      }
      
       return weeks;
    }   
    function waitForElement($scope){
      if(typeof window.columnChartData !== "undefined"){
      }else{
            setTimeout(function(){
                waitForElement();
            },250);
        }
    }

    this.getWeekIndex = function(){
      var newDate = new Date();
      var dayOfMonth = newDate.getDate();
      return Math.floor(dayOfMonth/7) ;
    }

    this.chartDataForHH = function($scope,$http,$timeout,url){
      var district, upazilla, union, provider;
      if(angular.isUndefined($scope.dis)){
        district = 'Gaibandha';
      }
      else{
        district = 'Gaibandha';
      }
      if(angular.isUndefined($scope.upa) ){
        upazilla = '';
      }
      else{
        upazilla =  $scope.upa;
      }

      if(angular.isUndefined($scope.uni) ){
        union = '';
      }
      else{
        union = $scope.uni;
      }

      if(angular.isUndefined($scope.uu) ){
        provider = '';
      }
      else{
        provider = $scope.uu;
      }
      
      //var url = OPENSRP_WEB_BASE_URL+"/registers/hh-data-count?district=Gaibandha&upazilla=GAIBANDHA SADAR&union=LAXMIPUR&provider=";             
      var url = OPENSRP_WEB_BASE_URL+"/registers/" + url +"?district=" + district + 
                    "&upazilla=" + upazilla + "&union=" + union + "&provider=" + provider;
      
      var newDate = new Date();
      var dayOfMonth = newDate.getDate();
      var weekIndex = Math.floor(dayOfMonth/7) ;
      $rootScope.loading = true;
      $http.get(url, { cache: false}).success(function (data) {              
        //console.log("from new service");
        console.log(data[0].weeklyCountsForChart);
        var weekCounts = data[0].weeklyCountsForChart;  
        $scope['thisMonth'] = weekCounts[15] + weekCounts[16] + weekCounts[17] + weekCounts[18] + weekCounts[19];
        $scope['thisWeek'] = weekCounts[15 + weekIndex];
        $scope['today'] = weekCounts[20];
        $timeout(function () {
          var date = new Date();      
          var monthLists = [];
          monthLists[3] = new Date(date.getFullYear(), date.getMonth(), 1);
          monthLists[2] = new Date(date.getFullYear(), date.getMonth()-1, 1);
          monthLists[1] = new Date(date.getFullYear(), date.getMonth()-2, 1);
          monthLists[0] = new Date(date.getFullYear(), date.getMonth()-3, 1);
          var monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
          $scope.labels = [monthNames[monthLists[0].getMonth()], monthNames[monthLists[1].getMonth()], monthNames[monthLists[2].getMonth()], monthNames[monthLists[3].getMonth()]];
          $scope.series = ['1st Week ', '2nd Week ','3rd Week', '4th Week ','5th Week '];
            
          $scope.chartData = [
            [weekCounts[0],weekCounts[5],weekCounts[10],weekCounts[15]],
            [weekCounts[1],weekCounts[6],weekCounts[11],weekCounts[16]],
            [weekCounts[2],weekCounts[7],weekCounts[12],weekCounts[17]],
            [weekCounts[3],weekCounts[8],weekCounts[13],weekCounts[18]],
            [weekCounts[4],weekCounts[9],weekCounts[14],weekCounts[19]]
          ];
        }, 250); 
        $rootScope.loading = false;
      });
    }

    this.chartDataCal = function($scope,monthList,data,DATE,$timeout){
      $scope.search = {};
      $scope.resetFilters = function () {    
        $scope.search = {};
      };
      
       
      $scope.$watch('search', function (newVal, oldVal) { 
        window.columnChartData= [];
        $scope.filtered = filterFilter(data, newVal);       
        window.getHHData = JSON.parse(JSON.stringify($scope.filtered));
        var date = new Date();
        var monthLists = [];
        monthLists[3] = new Date(date.getFullYear(), date.getMonth(), 1);
        monthLists[2] = new Date(date.getFullYear(), date.getMonth()-1, 1);
        monthLists[1] = new Date(date.getFullYear(), date.getMonth()-2, 1);
        monthLists[0] = new Date(date.getFullYear(), date.getMonth()-3, 1);
        for(var outer = 0;outer < monthLists.length;outer++){
          var weeks =  getWeeksInMonth(moment(monthLists[outer]).format('MM'),moment(monthLists[outer]).format('YYYY'),moment(monthLists[outer]).format('YYYY-MM-DD'));
         //console.log(weeks)
          for(var inner=0;inner<weeks.length;inner++){
            if (!angular.isUndefined(weeks[inner])) {
            var start = weeks[inner].start;         
            var queryResult= jsonsql.query("select * from getHHData where ("+DATE+" >='"+ weeks[inner].start+"' && "+DATE+" <='"+ weeks[inner].end+"') ",getHHData);                   
            columnChartData.push({init:queryResult.length});
            }
          }
        }
       
        $timeout(function () {
          var monthNames = ["January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"];
          $scope.labels = [monthNames[monthLists[0].getMonth()], monthNames[monthLists[1].getMonth()], monthNames[monthLists[2].getMonth()], monthNames[monthLists[3].getMonth()]];
          $scope.series = ['1st Week ', '2nd Week ','3rd Week', '4th Week ','5th Week '];
          
          $scope.chartData = [
            [columnChartData[0].init, columnChartData[5].init, columnChartData[10].init, columnChartData[15].init],
            [columnChartData[1].init, columnChartData[6].init, columnChartData[11].init, columnChartData[16].init],
            [columnChartData[2].init, columnChartData[7].init, columnChartData[12].init, columnChartData[17].init],
            [columnChartData[3].init, columnChartData[8].init, columnChartData[13].init, columnChartData[18].init],
            [columnChartData[4].init, columnChartData[9].init, columnChartData[14].init, columnChartData[19].init]
          ];
        }, 250);        
      }, true);
      
    }    
    this.chartDataCalForPw = function($scope,monthLists,data,DATE,$timeout){
      $scope.search = {};
      $scope.resetFilters = function () {    
        $scope.search = {};
      };      
      $scope.$watch('search', function (newVal, oldVal) { 
        window.columnChartData= [];
        $scope.filtered = filterFilter(data, newVal);       
        window.getHHData = JSON.parse(JSON.stringify($scope.filtered));
        for(var outer = 0;outer < monthLists.length;outer++){
          var weeks =  getWeeksInMonth(moment(monthLists[outer]).format('MM'),moment(monthLists[outer]).format('YYYY'),moment(monthLists[outer]).format('YYYY-MM-DD'));         
          for(var inner=0;inner<weeks.length;inner++){
            if (!angular.isUndefined(weeks[inner])) {
              var start = weeks[inner].start;         
              var queryResult= jsonsql.query("select * from getHHData where ("+DATE+" >='"+ weeks[inner].start+"' && "+DATE+" <='"+ weeks[inner].end+"' && details.FWPSRPREGSTS == 1) ",getHHData);                   
              columnChartData.push({init:queryResult.length});      
            }
               
          }
        }
        //waitForElement($scope);
        $timeout(function () {
          var monthNames = ["January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"];
          $scope.labels = [monthNames[monthLists[0].getMonth()], monthNames[monthLists[1].getMonth()], monthNames[monthLists[2].getMonth()], monthNames[monthLists[3].getMonth()]];
          $scope.series = ['1st Week ', '2nd Week ','3rd Week', '4th Week ','5th Week '];
          
          $scope.chartData = [
            [columnChartData[0].init, columnChartData[5].init, columnChartData[10].init, columnChartData[15].init],
            [columnChartData[1].init, columnChartData[6].init, columnChartData[11].init, columnChartData[16].init],
            [columnChartData[2].init, columnChartData[7].init, columnChartData[12].init, columnChartData[17].init],
            [columnChartData[3].init, columnChartData[8].init, columnChartData[13].init, columnChartData[18].init],
            [columnChartData[4].init, columnChartData[9].init, columnChartData[14].init, columnChartData[19].init]
          ];
        }, 250);        
      }, true);      
    }
    
    this.checkboxChecked = function(access,role){
      
      for(var i=0; i< Object.keys(role.accessTokens).length ; i++){        
        if (access == role.accessTokens[Object.keys(role.accessTokens)[i]]) {
          return true;
        }
      }
      return false;
    }

    this.bypassAcl = function($scope, $window){     
      AclService.setAbilities({ member: ['login', 'logout', 'Acl', 'Add Role', 'Add Rule', 'Data Export',
                                      'Edit Rule', 'Elco', 'Elco Details', 'Household', 'Household Details',
                                      'PW', 'PW Details', 'Role Edit', 'Rule List', 'User Assign',
                                      'User Assign Edit', 'User List'] });     

      AclService.attachRole('member');   
      $scope.loading = false;
      $window.location = '/#/';
      console.log("acl bypassed.");       
    }

    this.acl = function($timeout,$rootScope,$http,username,$window,Authentication,$location,$scope){
      $rootScope.aclAccess = "";
      //var apiURLs = OPENSRP_WEB_BASE_URL+"/role-access-tokens?userName="+username;
      var apiURLs = OPENSRP_WEB_BASE_URL+"/role-access-token?userName="+username;
      $http.get(apiURLs, { cache: false}).success(function (data) {
        $timeout(function () {
          $rootScope.aclAccess = data;          
          window.aclData = {
            member: ['login','logout']        
          }
          var member = 'member';
          AclService.setAbilities(window.aclData);
          if ($rootScope.aclAccess != '') {           
            for(var i = 0; i < data.length; i++){
              console.log(data[i] + " -privilege name");
              AclService.addAbility(member, data[i]);
            }
            /*for(var i=0; i< Object.keys($rootScope.aclAccess.accessTokens).length ; i++){
              AclService.addAbility(member, $rootScope.aclAccess.accessTokens[Object.keys($rootScope.aclAccess.accessTokens)[i]])
            }*/
            $scope.loading = false;
            $window.location = '/#/';
            /*$rootScope.formdata = {a:'1', b:'2'};
             $location.path('/search').search($rootScope.formdata);
             */
          }else{
            //$("#message").html("<p class='lead'>Please contact with administrator</p>");
            //Authentication.clearCredentials();   
            $window.location = '/#/login';
          }
          AclService.attachRole('member');
          
        }, 250);  
      });
    }
    
    this.locations = function($scope){
      var url = OPENSRP_WEB_BASE_URL+"/dashboard-location/all-location-tree";
       $rootScope.loading = true;
      var householdData = $http.get(url, { cache: true}).success(function (data) {              
        window.locationList = JSON.parse(JSON.stringify(data.map.data.myArrayList));           
        window.districtList = jsonsql.query("select * from locationList where ( tag == 'District'  ) ",locationList);
        $scope.districts=districtList;
        $rootScope.loading = false;
      });
    }
    
    this.users = function($scope){
      var url = OPENSRP_WEB_BASE_URL+"/all-user-name";
      $rootScope.loading = true;
      $http.get(url, { cache: true}).success(function (data) {              
        window.userData = JSON.parse(JSON.stringify(data));           
       // window.userList = jsonsql.query("select * from userData where ( tag == 'District'  ) ",userData);
        userData.sort();
        $scope.users=userData;
        $rootScope.loading = false;
      });      
    }

    

    this.hh_location_tree = function(newVal,$scope){
      $scope.unions = "";
      $scope.thanas = "";                        
      if (newVal.details && newVal.details.existing_District ) {
        window.allLocation = window.locationList;            
        window.thanaList = jsonsql.query("select * from allLocation where ( tag =='Upazilla' && parent._value == '"+newVal.details.existing_District+"'  ) ",allLocation);
        $scope.thanas = thanaList;            
      }
      if (newVal.details && newVal.details.existing_Upazilla) {
        if ($scope.thanas.length == 0) {
          //if user selcet thana "please select thana "
          $scope.unions = "";
          delete newVal.details.existing_Union ;
          delete newVal.details.existing_Upazilla ;
        }else{
          // if user select a specific thana
          window.allData = window.householdList;            
          window.unionsList = jsonsql.query("select * from allLocation where ( tag =='Union' && parent._value == '"+newVal.details.existing_Upazilla+"'  ) ",allLocation);
          $scope.unions = unionsList;
          if (newVal.details.existing_Union) {
            // if user select union then select any thana 
            var union_thana  = jsonsql.query("select * from allLocation where (  parent._value == '"+newVal.details.existing_Upazilla+"' && tag =='Union' && name == '"+newVal.details.existing_Union+"'  ) ",allLocation);
            if (union_thana == "") {
              delete newVal.details.existing_Union ;
            }
          }
          
        }
        
      }
      
      
      if (newVal.details && newVal.details.existing_District == "") {
        delete newVal.details.existing_District;
      }
      if (newVal.details && newVal.details.existing_Upazilla == "") {
        delete newVal.details.existing_Upazilla;
      }      
      if (newVal.details && newVal.details.existing_Union == "") {        
        delete newVal.details.existing_Union;
      }
      if (newVal.PROVIDERID =="") {
       delete newVal.PROVIDERID;
      }
      console.log(newVal);
    }
    this.ec_location_tree = function(newVal,$scope){
      $scope.unions = "";
      $scope.thanas = "";                
      if (newVal && newVal.FWWOMDISTRICT ) {
        window.allLocation = window.locationList;            
        window.thanaList = jsonsql.query("select * from allLocation where ( tag =='Upazilla' && parent._value == '"+newVal.FWWOMDISTRICT+"'  ) ",allLocation);
        $scope.thanas = thanaList;            
      }
      if (newVal && newVal.FWWOMUPAZILLA) {
        if ($scope.thanas.length == 0) {
          $scope.unions = "";
          delete newVal.FWWOMUNION ;
          delete newVal.FWWOMUPAZILLA ;
        }else{                               
          window.unionsList = jsonsql.query("select * from allLocation where ( tag =='Union' && parent._value == '"+newVal.FWWOMUPAZILLA+"'  ) ",allLocation);
          $scope.unions = unionsList;
          if (newVal.FWWOMUNION) {
            // if user select union then select any thana 
            var union_thana  = jsonsql.query("select * from allLocation where ( parent._value == '"+ newVal.FWWOMUPAZILLA +"' && tag =='Union' && name == '"+newVal.FWWOMUNION+"'  ) ",allLocation);
            if (union_thana == "") {
              delete newVal.FWWOMUNION ;
            }
          }
        }            
      }
      if (newVal && newVal.FWWOMDISTRICT == "") {
        delete newVal.FWWOMDISTRICT;
      }
      if (newVal && newVal.FWWOMUPAZILLA == "") {
        delete newVal.FWWOMUPAZILLA;
      }
      if (newVal && newVal.FWWOMUNION == "") {
        delete newVal.FWWOMUNION;
      }
      if (newVal.PROVIDERID =="") {
       delete newVal.PROVIDERID;
      }
      
    }
    
   
  });
