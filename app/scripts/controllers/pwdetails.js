'use strict';

/**
 * @ngdoc function
 * @name opensrpSiteApp.controller:PwdetailsCtrl
 * @description
 * # PwdetailsCtrl
 * Controller of the opensrpSiteApp
 */
angular.module('opensrpSiteApp')
  .controller('PwdetailsCtrl', function ($scope,$http,ElcoRegisterService,page) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];    
    $scope.detailDataLink =
     ' <a href="#/pregnant-womens">'+
     '<i class="glyphicon glyphicon-list-alt"></i>'+
    ' <span>Data Details</span>'+
    '</a>';
    window.getData = JSON.parse(JSON.stringify(ElcoRegisterService.Data()));       
    $scope.data= jsonsql.query("select * from getData where (details.FWPSRPREGSTS == 1 ) ",getData);   
    page.pagination($scope,$scope.data);
  });
