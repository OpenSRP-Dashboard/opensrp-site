'use strict';

/**
 * @ngdoc function
 * @name opensrpSiteApp.controller:PwCtrl
 * @description
 * # PwCtrl
 * Controller of the opensrpSiteApp
 */
angular.module('opensrpSiteApp')
  .controller('PwCtrl', function ($scope,$http,$rootScope,PW,ElcoRegisterService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    $scope.data = ElcoRegisterService.Data();
    PW.reportThisMonth($scope, $scope.data,$rootScope,'details.WomanREGDATE','thisMonth');
    PW.reportThisWeek($scope, $scope.data,$rootScope,'details.WomanREGDATE','thisWeek');
    PW.reportToday($scope,$scope.data,$rootScope,'details.WomanREGDATE','today'); 
  });
