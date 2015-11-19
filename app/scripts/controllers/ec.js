'use strict';

/**
 * @ngdoc function
 * @name opensrpSiteApp.controller:EcCtrl
 * @description
 * # EcCtrl
 * Controller of the opensrpSiteApp
 */
angular.module('opensrpSiteApp')
  .controller('EcCtrl', function ($scope,$http,$rootScope,$timeout,ElcoRegisterService,page,EC,Common) {
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
    var date = new Date();
    var monthLists = [];
    monthLists[0] = new Date(date.getFullYear(), date.getMonth(), 1);
    monthLists[1] = new Date(date.getFullYear(), date.getMonth()-1, 1);
    monthLists[2] = new Date(date.getFullYear(), date.getMonth()-2, 1);
    monthLists[3] = new Date(date.getFullYear(), date.getMonth()-3, 1);
    
    $scope.data = ElcoRegisterService.Data();
    console.log($scope.data)
    Common.chartDataCal($scope,monthLists,$scope.data,'WomanREGDATE',$timeout)
    page.reportThisMonth($scope,$scope.data,$rootScope,'WomanREGDATE','thisMonth');
    page.reportThisWeek($scope,$scope.data,$rootScope,'WomanREGDATE','thisWeek');
    page.reportToday($scope,$scope.data,$rootScope,'WomanREGDATE','today'); 
  });
