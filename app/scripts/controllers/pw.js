'use strict';

/**
 * @ngdoc function
 * @name opensrpSiteApp.controller:PwCtrl
 * @description
 * # PwCtrl
 * Controller of the opensrpSiteApp
 */
angular.module('opensrpSiteApp')
  .controller('PwCtrl', function ($scope,$http,$rootScope,$timeout,PW,EC,Common,AclService,$filter) {
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
    //PW.allReports($scope, $rootScope, $http);
    
    Common.locations($scope);
    Common.users($scope);
    Common.chartDataForHH($scope, $http, $timeout, 'pw-data-count');

    $scope.locationClick = function(){
      console.log('nothing');
    }  

    $scope.districtChanged = function(){
      $('#upazilla_dd').find('option:eq(0)').prop('selected', true);
      $scope.upa = '';    
      $('#union_dd').find('option:eq(0)').prop('selected', true);
      $scope.uni = '';  
      $scope.thanas = [];    
      $scope.unions = [];  
      if($scope.dis !== ''){
        console.log("thanaList getting created.");
        window.allLocation = window.locationList;            
        window.thanaList = jsonsql.query("select * from allLocation where ( tag =='Upazilla' && parent._value == '"+ $scope.dis +"'  ) ",allLocation);        
        $scope.thanas = thanaList;                   
      }      
    }   

    $scope.upazillaChanged = function(){
      $('#union_dd').find('option:eq(0)').prop('selected', true);
      $scope.uni = '';
      $scope.unions = [];
      if($scope.upa !== ''){
        console.log("unionsList getting created.");
        window.allLocation = window.locationList;
        window.unionsList = jsonsql.query("select * from allLocation where ( tag =='Union' && parent._value == '"+ $scope.upa +"'  ) ",allLocation);
        $scope.unions = unionsList;
      }      
    }

    $scope.changeChartData = function(){
      if(!angular.isUndefined($scope.dis) || !angular.isUndefined($scope.upa) 
          || !angular.isUndefined($scope.uni) || !angular.isUndefined($scope.uu)){
        Common.chartDataForHH($scope, $http, $timeout, 'pw-data-count');  
      }      
    }
  });
