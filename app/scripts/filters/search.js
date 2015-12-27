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
         
          return input.slice(start);
        }
        
      return [];
    };
  });
