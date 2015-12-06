'use strict';

/**
 * @ngdoc service
 * @name opensrpSiteApp.Common
 * @description
 * # Common
 * Service in the opensrpSiteApp.
 */
angular.module('opensrpSiteApp')
  .service('Common', function (filterFilter,AclService,OPENSRP_WEB_BASE_URL) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    function daysInMonth(month,year) {
      return new Date(year, month, 0).getDate();
    }    
    function getWeeksInMonth(month, year,date){
      var weeks=[],firstDate=new Date(year, month, 1), lastDate=new Date(year, month+1, 0), numDays= daysInMonth(month,year);
      var thisDate = new Date(date);           
      var start=1;
      var end=7-firstDate.getDay();     
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
      if (weeks.length == 6) {        
        var firstWeek = weeks[0];
        var lastWeek = weeks[5];        
        var date1 = new Date(firstWeek.start);
        var date2 = new Date(firstWeek.end);
        var timeDiff = Math.abs(date2.getTime() - date1.getTime());
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        if (diffDays == 0) {
          weeks[1].start = firstWeek.end;
          delete weeks[0];
        }else{
          weeks[4].end = lastWeek.end;
          delete weeks[5];
        }
        
        
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
    this.chartDataCal = function($scope,monthLists,data,DATE,$timeout){
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
            var queryResult= jsonsql.query("select * from getHHData where ("+DATE+" >='"+ weeks[inner].start+"' && "+DATE+" <='"+ weeks[inner].end+"') ",getHHData);                   
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
    this.acl = function($timeout,$rootScope,$http,username,$window,Authentication,$location,$scope){
      $rootScope.aclAccess = "";
      var apiURLs = OPENSRP_WEB_BASE_URL+"/role-access-tokens?userName="+username;
      $http.get(apiURLs, { cache: true}).success(function (data) {
        $timeout(function () {
          $rootScope.aclAccess = data;          
          window.aclData = {
            member: ['login','logout']        
          }
          var member = 'member';
          AclService.setAbilities(window.aclData);
          if ($rootScope.aclAccess != '') {           
            for(var i=0; i< Object.keys($rootScope.aclAccess.accessTokens).length ; i++){
              AclService.addAbility(member, $rootScope.aclAccess.accessTokens[Object.keys($rootScope.aclAccess.accessTokens)[i]])
            }
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
   
  });
