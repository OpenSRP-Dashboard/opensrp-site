'use strict';

/**
 * @ngdoc filter
 * @name opensrpSiteApp.filter:search
 * @function
 * @description
 * # search
 * Filter in the opensrpSiteApp.
 */
angular.module('opensrpSiteApp')
  .filter('startFrom', function () {
    return function (input, start) {
      if (input) {
          start = +start;
          console.log("inside filter/search.js");
          //console.log(input);  // input carries the data on which filtering is being done.
          console.log(start);
          //console.log(input.slice(start, start+10))
          return input.slice(start);
        }
        
      return [];
    };
  });


angular.module('opensrpSiteApp')
  .filter('otherFilter', function () {
    return function (input) {
      if (input) {
          console.log("now processing");          
          console.log(input);
          return input;
      }      
    };
  });

  // a simple dateRange filter added but not used yet
  angular.module('opensrpSiteApp')
    .filter('dateRangeFilter', function () {
      return function (items, dateRange) {          
          var s = moment(dateRange.startDate).format('YYYY-MM-DD'); 
          var e = moment(dateRange.endDate).format('YYYY-MM-DD');          
          console.log("is it triggerd? :/" + s + "  " + e);// + " l- " + items[0]);
          //console.log(items); 
          var filtered = [];
          for (var i = 0; i < items.length; i++) {

            var itemDate = moment(items[i].value.scheduleGenerateDate).format('YYYY-MM-DD');
            if (itemDate >= s && itemDate <= e) //return true;{
            {
              //console.log(items[i].value.scheduleGenerateDate);
              filtered.push(items[i]);                            
            }
          }
          return filtered;
      }
    });