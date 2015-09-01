'use strict';

/**
 * @ngdoc function
 * @name opensrpSiteApp.controller:HhRegisterControllerCtrl
 * @description
 * # HhRegisterControllerCtrl
 * Controller of the opensrpSiteApp
 */
angular.module('opensrpSiteApp')
 .controller('HouseholdCtrl', function ($scope,$rootScope,$http,HHRegisterService,page) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
   
  $scope.data = HHRegisterService.Data();
  page.pagination($scope,$scope.data);
  
  $scope.download= function(){
      //JSONToCSVConvertor($scope.data, "Vehicle Report", true);
      page.download($scope, $scope.data);
  };
});