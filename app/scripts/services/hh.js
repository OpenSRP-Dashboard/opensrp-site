'use strict';

/**
 * @ngdoc service
 * @name opensrpSiteApp.HH
 * @description
 * # HH
 * Service in the opensrpSiteApp.
 */
angular.module('opensrpSiteApp')
  .service('HH', function () {
    
    function daysInMonth(month,year) {
      return new Date(year, month, 0).getDate();
    }
    // AngularJS will instantiate a singleton by calling "new" on this function
     this.weekCalculation = function(monthLists){
      console.log("start");
       for(var outer = 0;outer < monthLists.length;outer++){     
        //console.log(moment(monthLists[i]).format('YYYY-MM-DD'));
        console.log(daysInMonth(moment(monthLists[outer]).format('MM'),moment(monthLists[outer]).format('YYYY')));
        for(var innner = 1;innner <= daysInMonth(moment(monthLists[outer]).format('MM'),moment(monthLists[outer]).format('YYYY'));innner++){
         console.log(innner)
         //console.log(moment(monthLists[i].setDate(monthLists[i].getDate()+j)).format('YYYY-MM-DD'));
         
        }
      // console.log( daysInMonth(moment(monthLists[i]).format('MM'),moment(monthLists[i]).format('YYYY')));
        //console.log(moment(monthLists[i].setDate(monthLists[i].getDate()+1)).format('YYYY-MM-DD'));
         
       }
      console.log("End");
    }
  });
