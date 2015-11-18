'use strict';

/**
 * @ngdoc service
 * @name opensrpSiteApp.Common
 * @description
 * # Common
 * Service in the opensrpSiteApp.
 */
angular.module('opensrpSiteApp')
  .service('Common', function (filterFilter) {
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
       return weeks;
    }   
    
    this.chartDataCal = function(monthLists,data,DATE){     
      window.columnChartData= [];
      window.getHHData = JSON.parse(JSON.stringify(data));
      for(var outer = 0;outer < monthLists.length;outer++){
        var weeks =  getWeeksInMonth(moment(monthLists[outer]).format('MM'),moment(monthLists[outer]).format('YYYY'),moment(monthLists[outer]).format('YYYY-MM-DD'));
        for(var inner=0;inner<weeks.length;inner++){
          var start = weeks[inner].start;         
          var queryResult= jsonsql.query("select * from getHHData where ("+DATE+" >='"+ weeks[inner].start+"' && "+DATE+" <='"+ weeks[inner].end+"') ",getHHData);                   
          columnChartData.push({init:queryResult.length});          
        }
      }
    }
  });
