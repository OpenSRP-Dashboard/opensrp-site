'use strict';

/**
 * @ngdoc function
 * @name opensrpSiteApp.controller:EcCtrl
 * @description
 * # EcCtrl
 * Controller of the opensrpSiteApp
 */
angular.module('opensrpSiteApp')
  .controller('EcCtrl', function ($scope,$http,$rootScope,$timeout,page,EC,Common,AclService, $filter) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
     $scope.detailDataLink =
     ' <a href="#/elcos">'+
     '<i class="glyphicon glyphicon-list-alt"></i>'+
    ' <span>Data Details</span>'+
    '</a>';
    $scope.can = AclService.can;
    /*var date = new Date();
    var monthLists = [];
    monthLists[3] = new Date(date.getFullYear(), date.getMonth(), 1);
    monthLists[2] = new Date(date.getFullYear(), date.getMonth()-1, 1);
    monthLists[1] = new Date(date.getFullYear(), date.getMonth()-2, 1);
    monthLists[0] = new Date(date.getFullYear(), date.getMonth()-3, 1);
    console.log("inside controller");
    window.getData = ElcoRegisterService.Data();    
    $scope.data = jsonsql.query("select * from getData where (FWELIGIBLE == 1 )", getData);*/
    Common.locations($scope);
    Common.users($scope);
    Common.chartDataForHH($scope, $http, $timeout, 'elco-data-count');
    EC.allReports($scope, $rootScope, $http);
    /*Common.chartDataCal($scope,monthLists,$scope.data,'TODAY',$timeout)
    EC.reportThisMonth($scope,$scope.data,$rootScope,'TODAY','thisMonth', $filter,0);
    EC.reportThisWeek($scope,$scope.data,$rootScope,'TODAY','thisWeek', $filter,0);
    EC.reportToday($scope,$scope.data,$rootScope,'TODAY','today', $filter,0); */
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
        Common.chartDataForHH($scope, $http, $timeout, 'elco-data-count');  
      }      
    }
  });
