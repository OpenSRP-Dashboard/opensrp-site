'use strict';

/**
 * @ngdoc function
 * @name opensrpSiteApp.controller:UnauthorizedCtrl
 * @description
 * # UnauthorizedCtrl
 * Controller of the opensrpSiteApp
 */
angular.module('opensrpSiteApp')
  .controller('UnauthorizedCtrl', function ( $scope,AclService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.can = AclService.can;
  });
