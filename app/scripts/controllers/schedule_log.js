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
    $scope.schedules = scheduleLogService.Data();
    console.log("inside ScheduleLogCtrl");
    //console.log(AclService);
    $scope.sortType = 'value.caseID';
    $scope.sortReverse  = false;
    
    /*$scope.totalItems = $scope.schedules.length;
    $scope.currentPage = 1;
    console.log*/

    $scope.pageChanged = function() {
      console.log('Page changed to: ' + $scope.currentPage);
    };

    scheduleLogService.dataFilter($scope);
    console.log($scope.sortType + " -current sortType");

    scheduleLogService.anmList($scope, $scope.schedules);

    var x = new Date($scope.schedules[0].value.scheduleGenerateDate);
    var y = moment(x).format('YYYY-MM-DD'); 

    $scope.dateRange = {
      startDate: moment(new Date('January 1, 2016')).format('YYYY-MM-DD'),
      endDate: moment(new Date()).format('YYYY-MM-DD')
    };

    $scope.combinedFilter = function(){
      console.log("inside combinedFilter.");
      
      $scope.filtered = $filter('filter')($scope.schedules,$scope.search, true);   
      console.log("number of items after filtering against search " + $scope.filtered.length);

      var s = moment($scope.dateRange.startDate).format('YYYY-MM-DD'); 
      var e = moment($scope.dateRange.endDate).format('YYYY-MM-DD');          
      
      var filteredNew = [];
      for (var i = 0; i < $scope.filtered.length; i++) {
        var itemDate = moment($scope.filtered[i].value.scheduleGenerateDate).format('YYYY-MM-DD');
        if (itemDate >= s && itemDate <= e) 
        {
          //console.log($scope.filtered[i].value.scheduleGenerateDate);
          filteredNew.push($scope.filtered[i]);                            
        }
      }
      $scope.filtered = filteredNew;
      console.log("number of items after filtering against dateRange " + $scope.filtered.length); 
      
      $scope.totalItems = $scope.filtered.length;          
      $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
      $scope.currentPage = 1;
    }

    $scope.removePropertyFromFilter = function(propertyName){
      console.log("it reached here - " + propertyName);
      delete $scope.search.value[propertyName];
    }
    
  });
