'use strict';

/**
 * @ngdoc function
 * @name opensrpSiteApp.controller:EcCtrl
 * @description
 * # EcCtrl
 * Controller of the opensrpSiteApp
 */
angular.module('opensrpSiteApp')
  .controller('EcCtrl', function ($scope,$http,$rootScope,ElcoRegisterService,page) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
     $scope.detailDataLink =
     ' <a href="#/elcos">'+
     '<i class="glyphicon glyphicon-list-alt"></i>'+
    ' <span>Data Details</span>'+
    '</a>';
    
    $scope.data = ElcoRegisterService.Data();
   
    page.reportThisMonth($scope,$scope.data,$rootScope,'details.WomanREGDATE','thisMonth');
    page.reportThisWeek($scope,$scope.data,$rootScope,'details.WomanREGDATE','thisWeek');
    page.reportToday($scope,$scope.data,$rootScope,'details.WomanREGDATE','today'); 
  });
