'use strict';

/**
 * @ngdoc function
 * @name opensrpSiteApp.controller:PwCtrl
 * @description
 * # PwCtrl
 * Controller of the opensrpSiteApp
 */
angular.module('opensrpSiteApp')
  .controller('PwCtrl', function ($scope,$http,$rootScope,$timeout,PW,EC,ElcoRegisterService,Common,AclService,$filter) {
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
    
    window.getData = JSON.parse(JSON.stringify(ElcoRegisterService.Data()));       
    $scope.data= jsonsql.query("select * from getData where (PSRFDETAILS != '' && details.FWPSRPREGSTS == 1 ) ",getData);
    EC.reportThisMonth($scope, $scope.data,$rootScope,'PSRFDETAILS[0].today','thisMonth',$filter);
    EC.reportThisWeek($scope, $scope.data,$rootScope,'PSRFDETAILS[0].today','thisWeek',$filter);
    EC.reportToday($scope,$scope.data,$rootScope,'PSRFDETAILS[0].today','today',$filter);
    Common.locations($scope);
    Common.users($scope);
    var date = new Date();
    var monthLists = [];
    monthLists[3] = new Date(date.getFullYear(), date.getMonth(), 1);
    monthLists[2] = new Date(date.getFullYear(), date.getMonth()-1, 1);
    monthLists[1] = new Date(date.getFullYear(), date.getMonth()-2, 1);
    monthLists[0] = new Date(date.getFullYear(), date.getMonth()-3, 1);
    Common.chartDataCalForPw($scope,monthLists,$scope.data,'details.FWPSRDATE',$timeout);
  });
