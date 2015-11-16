'use strict';

/**
 * @ngdoc function
 * @name opensrpSiteApp.controller:PwCtrl
 * @description
 * # PwCtrl
 * Controller of the opensrpSiteApp
 */
angular.module('opensrpSiteApp')
  .controller('PwCtrl', function ($scope,$http,$rootScope,PW) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    console.log($rootScope.ECR);
    PW.reportThisMonth($scope, $rootScope.ECR,$rootScope,'details.WomanREGDATE','thisMonth');
    PW.reportThisWeek($scope, $rootScope.ECR,$rootScope,'details.WomanREGDATE','thisWeek');
    PW.reportToday($scope,$rootScope.ECR,$rootScope,'details.WomanREGDATE','today'); 
  });
