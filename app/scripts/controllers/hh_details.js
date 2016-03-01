'use strict';

/**
 * @ngdoc function
 * @name opensrpSiteApp.controller:HhRegisterControllerCtrl
 * @description
 * # HhRegisterControllerCtrl
 * Controller of the opensrpSiteApp
 */
angular.module('opensrpSiteApp')
 .controller('HouseholdCtrl', function ($scope,$rootScope,$http,HHRegisterService,page,mapboxService,AclService,$filter,Common) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  $scope.detailDataLink =
     ' <a href="#/households">'+
     '<i class="glyphicon glyphicon-list-alt"></i>'+
    ' <span>Data Details</span>'+
    '</a>';
  $scope.can = AclService.can;
  $scope.data = HHRegisterService.Data();
  HHRegisterService.dataFilter($scope,$scope.data,$filter);
  Common.locations($scope);
  Common.users($scope);
  $scope.download= function(){
      //JSONToCSVConvertor($scope.data, "Vehicle Report", true);
    page.download($scope, $scope.data,'Household Report');
  };
});