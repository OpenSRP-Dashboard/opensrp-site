'use strict';

/**
 * @ngdoc function
 * @name opensrpSiteApp.controller:ElcoRegisterControllerCtrl
 * @description
 * # ElcoRegisterControllerCtrl
 * Controller of the opensrpSiteApp
 */
angular.module('opensrpSiteApp')
  .controller('ElcoCtrl', function ($scope,$http,ElcoRegisterService,page) {    
      $scope.numberPattern = /^\d*$/;
      $scope.data = ElcoRegisterService.Data();
      page.pagination($scope,$scope.data);
  });
