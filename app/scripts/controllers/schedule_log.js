'use strict';

/**
 * @ngdoc function
 * @name opensrpSiteApp.controller:EcCtrl
 * @description
 * # EcCtrl
 * Controller of the opensrpSiteApp
 */
angular.module('opensrpSiteApp')
  .controller('ScheduleLogCtrl', function ($scope,$http,$rootScope,$timeout,scheduleLogService,page,EC,Common,AclService, $filter) {
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
    $scope.data = scheduleLogService.Data();
    console.log($scope.data);
    console.log("inside ScheduleLogCtrl");
  });
