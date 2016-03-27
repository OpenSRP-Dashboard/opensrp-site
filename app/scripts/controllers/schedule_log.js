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

    var x = new Date($scope.schedules[0].value.scheduleGenerateDate);
    var y = moment(x).format('YYYY-MM-DD'); 
    console.log("scheduleGenerateDate before formatting - " + x + " -after formatting- " + y);
    //console.log("received format " + $scope.schedules[0].value.scheduleGenerateDate);
    $scope.startDate = new Date('March 23, 2016');    
    $scope.endDate = new Date('March 24, 2016');

    $scope.dateRange = {
      startDate: moment($scope.startDate).format('YYYY-MM-DD'),
      endDate: moment($scope.endDate).format('YYYY-MM-DD')
    };
    //dateRange.startDate = moment($scope.startDate).format('YYYY-MM-DD'); 
    //dateRange.endDate = moment($scope.endDate).format('YYYY-MM-DD'); 
    //startDate, endDate

    $scope.dateRangeFilter = function (startDate, endDate) {
      return function (item) {
          if (item.value.scheduleGenerateDate === null) return false;
   
          /*var itemDate = moment(item.value.scheduleGenerateDate).format('YYYY-MM-DD');
          var s = moment(startDate).format('YYYY-MM-DD'); 
          var e = moment(endDate).format('YYYY-MM-DD'); 
          console.log("datefilter - " + itemDate);
          if (itemDate >= s && itemDate <= e) return true;
          return false;*/
          var itemDate = moment(item.value.scheduleGenerateDate).format('YYYY-MM-DD');
          var s = moment(startDate).format('YYYY-MM-DD'); 
          var e = moment(endDate).format('YYYY-MM-DD'); 
          //console.log("datefilter - " + itemDate);
          if (itemDate >= s && itemDate <= e) //return true;{
          {
            return true;
          }
          console.log("is it triggerd? :/");
          //$scope.totalItems--;
          //$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
          return false;
      }
    }
  });
