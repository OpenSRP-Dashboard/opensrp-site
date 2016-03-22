'use strict';

/**
 * @ngdoc function
 * @name opensrpSiteApp.controller:ElcoRegisterControllerCtrl
 * @description
 * # ElcoRegisterControllerCtrl
 * Controller of the opensrpSiteApp
 */
angular.module('opensrpSiteApp')
  .controller('ElcoCtrl', function ($scope,$rootScope,$http,ElcoRegisterService,page,AclService,$filter,Common) {    
    console.log("inside ElcoCtrl");
    $scope.numberPattern = /^\d*$/;
    $scope.data = ElcoRegisterService.Data();
    
    var dta = $scope.data;
    $scope.can = AclService.can;
    $scope.detailDataLink =
     ' <a href="#/elcos">'+
     '<i class="glyphicon glyphicon-list-alt"></i>'+
    ' <span>Data Details</span>'+
    '</a>';
    Common.locations($scope);
    Common.users($scope);
    window.getData = JSON.parse(JSON.stringify(ElcoRegisterService.Data()));        
    $scope.data= jsonsql.query("select * from getData where (FWWOMAGE != 'NaN' && FWELIGIBLE == 1 ) ",getData);
    ElcoRegisterService.dataFilter($scope,$scope.data,$filter);
    $scope.baseURL = "http://192.168.21.86:1337/192.168.21.218:9979";
    
  });
