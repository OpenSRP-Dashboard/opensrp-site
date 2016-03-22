'use strict';

/**
 * @ngdoc function
 * @name opensrpSiteApp.controller:EcCtrl
 * @description
 * # EcCtrl
 * Controller of the opensrpSiteApp
 */
angular.module('opensrpSiteApp')
  .controller('ScheduleLogCtrl', function ($scope,$http,$rootScope,$timeout,scheduleLogService,page,EC,Common,AclService, $filter, ElcoRegisterService) {
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
    $scope.schedules = scheduleLogService.Data();
    console.log("inside ScheduleLogCtrl");
    //console.log(AclService);
    $scope.sortType = 'id';
    $scope.sortReverse  = false;
    
    /*$scope.totalItems = $scope.schedules.length;
    $scope.currentPage = 1;
    console.log*/

    $scope.pageChanged = function() {
      console.log('Page changed to: ' + $scope.currentPage);
    };

    scheduleLogService.dataFilter($scope,$scope.schedules,$filter);
    console.log($scope.sortType + " -current sortType");

    $scope.filterTest = [{"a":"p", "b":"q"},{"a":"p", "b":"q"},{"a":"r", "b":"s"},
                          {"a":"r", "b":"s"},{"a":"p", "b":"s"}];

    scheduleLogService.testFilterFunc($scope,$scope.filterTest,$filter);
    scheduleLogService.anmList($scope, $scope.schedules);

  });
