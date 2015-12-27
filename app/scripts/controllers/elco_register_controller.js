'use strict';

/**
 * @ngdoc function
 * @name opensrpSiteApp.controller:ElcoRegisterControllerCtrl
 * @description
 * # ElcoRegisterControllerCtrl
 * Controller of the opensrpSiteApp
 */
angular.module('opensrpSiteApp')
  .controller('ElcoCtrl', function ($scope,$http,ElcoRegisterService,page,AclService) {    
    $scope.numberPattern = /^\d*$/;
    $scope.data = ElcoRegisterService.Data();
    console.log($scope.data);
    var dta = $scope.data;
    $scope.can = AclService.can;
    $scope.detailDataLink =
     ' <a href="#/elcos">'+
     '<i class="glyphicon glyphicon-list-alt"></i>'+
    ' <span>Data Details</span>'+
    '</a>';
     page.pagination($scope,$scope.data);
  });
