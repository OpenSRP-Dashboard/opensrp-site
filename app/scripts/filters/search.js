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
          return input.slice(start);
        }
        
      return [];
    };
  });
