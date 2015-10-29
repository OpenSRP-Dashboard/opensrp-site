'use strict';

/**
 * @ngdoc service
 * @name opensrpSiteApp.ROLE
 * @description
 * # ROLE
 * Service in the opensrpSiteApp.
 */
angular.module('opensrpSiteApp')
  .service('Role', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var role = {
      save: function($data) {
        //your ajax call here
        console.log($data);
        
      }
    };
    return role;
  });
