'use strict';

/**
 * @ngdoc function
 * @name opensrpSiteApp.controller:ElcoRegisterControllerCtrl
 * @description
 * # ElcoRegisterControllerCtrl
 * Controller of the opensrpSiteApp
 */
angular.module('opensrpSiteApp')
  .controller('ElcoCtrl', function ($scope,$http,ElcoRegisterService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
     ElcoRegisterService.elcos($scope);
  });
