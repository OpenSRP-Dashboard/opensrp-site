'use strict';

/**
 * @ngdoc function
 * @name opensrpSiteApp.controller:PwdetailsCtrl
 * @description
 * # PwdetailsCtrl
 * Controller of the opensrpSiteApp
 */
angular.module('opensrpSiteApp')
  .controller('PwdetailsCtrl', function ($scope,$http,ElcoRegisterService,page,AclService,Common,$filter) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.can = AclService.can;
    $scope.detailDataLink =
     ' <a href="#/pregnant-womens">'+
     '<i class="glyphicon glyphicon-list-alt"></i>'+
    ' <span>Data Details</span>'+
    '</a>';
    Common.locations($scope);
    Common.users($scope);
    window.getData = JSON.parse(JSON.stringify(ElcoRegisterService.Data()));       
    $scope.data= jsonsql.query("select * from getData where (details.FWPSRPREGSTS == 1 ) ",getData);
    ElcoRegisterService.dataFilter($scope,$scope.data,$filter);
  });
