'use strict';

/**
 * @ngdoc function
 * @name opensrpSiteApp.controller:HhRegisterControllerCtrl
 * @description
 * # HhRegisterControllerCtrl
 * Controller of the opensrpSiteApp
 */
angular.module('opensrpSiteApp')
 .controller('HouseholdCtrl', function ($scope,$rootScope,$http,HHRegisterService,page,mapboxService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  
  mapboxService.init({ accessToken: 'pk.eyJ1IjoicHJvYmlyMTIzIiwiYSI6IjhwRDJyZ0EifQ.KzOVb_vdS3CMYzUKMww59g' });
  $scope.latitude = function(location){      
      return location.split(" ")[0];
  }
  $scope.longitude = function(location){      
      return location.split(" ")[1];
  }
  $scope.data = HHRegisterService.Data();
  page.pagination($scope,$scope.data);
  
  $scope.download= function(){
      //JSONToCSVConvertor($scope.data, "Vehicle Report", true);
    page.download($scope, $scope.data);
  };
});