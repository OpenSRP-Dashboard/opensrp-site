'use strict';

/**
 * @ngdoc function
 * @name opensrpSiteApp.controller:EcCtrl
 * @description
 * # EcCtrl
 * Controller of the opensrpSiteApp
 */
angular.module('opensrpSiteApp')
  .controller('EcCtrl', function ($scope,$http,$rootScope,$timeout,ElcoRegisterService,page,EC,Common,AclService, $filter) {
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
    $scope.can = AclService.can;
    var date = new Date();
    var monthLists = [];
    monthLists[3] = new Date(date.getFullYear(), date.getMonth(), 1);
    monthLists[2] = new Date(date.getFullYear(), date.getMonth()-1, 1);
    monthLists[1] = new Date(date.getFullYear(), date.getMonth()-2, 1);
    monthLists[0] = new Date(date.getFullYear(), date.getMonth()-3, 1);
    
    $scope.data = ElcoRegisterService.Data();
    Common.locations($scope);
    Common.users($scope);
    Common.chartDataCal($scope,monthLists,$scope.data,'WomanREGDATE',$timeout)
    EC.reportThisMonth($scope,$scope.data,$rootScope,'WomanREGDATE','thisMonth', $filter);
    EC.reportThisWeek($scope,$scope.data,$rootScope,'WomanREGDATE','thisWeek', $filter);
    EC.reportToday($scope,$scope.data,$rootScope,'WomanREGDATE','today', $filter); 
  });
