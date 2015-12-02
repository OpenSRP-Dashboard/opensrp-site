'use strict';

/**
 * @ngdoc function
 * @name opensrpSiteApp.controller:PwCtrl
 * @description
 * # PwCtrl
 * Controller of the opensrpSiteApp
 */
angular.module('opensrpSiteApp')
  .controller('PwCtrl', function ($scope,$http,$rootScope,$timeout,PW,ElcoRegisterService,Common) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
     $scope.detailDataLink =
     ' <a href="#/pregnant-womens">'+
     '<i class="glyphicon glyphicon-list-alt"></i>'+
    ' <span>Data Details</span>'+
    '</a>';
    $scope.data = ElcoRegisterService.Data();
    PW.reportThisMonth($scope, $scope.data,$rootScope,'details.WomanREGDATE','thisMonth');
    PW.reportThisWeek($scope, $scope.data,$rootScope,'details.WomanREGDATE','thisWeek');
    PW.reportToday($scope,$scope.data,$rootScope,'details.WomanREGDATE','today');
    
     var date = new Date();
    var monthLists = [];
    monthLists[0] = new Date(date.getFullYear(), date.getMonth(), 1);
    monthLists[1] = new Date(date.getFullYear(), date.getMonth()-1, 1);
    monthLists[2] = new Date(date.getFullYear(), date.getMonth()-2, 1);
    monthLists[3] = new Date(date.getFullYear(), date.getMonth()-3, 1);
    Common.chartDataCal($scope,monthLists,$scope.data,'details.FWPSRDATE',$timeout);
  });
