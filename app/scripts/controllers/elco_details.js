'use strict';

/**
 * @ngdoc function
 * @name opensrpSiteApp.controller:ElcoRegisterControllerCtrl
 * @description
 * # ElcoRegisterControllerCtrl
 * Controller of the opensrpSiteApp
 */
angular.module('opensrpSiteApp')
  .controller('ElcoCtrl', function ($scope,$rootScope,$cookies, $routeParams,$q,$location, $http,$window,$timeout,AclService,$filter,Common,OPENSRP_WEB_BASE_URL,ngDialog) {    
   
    $scope.can = AclService.can;
    var url = $location.path().split("/")[2];
    Common.locations($scope);
    Common.users($scope);
    $scope.onSearch = function(){         
      $rootScope.loading = true;  
      $scope.dataShowHide = false;
      var district;
      var union;
      var thana;
      var union;
      var provider;
      var elcoName ;
      var type = "type=Elco";      
      if(angular.isUndefined($scope.dis) || $scope.dis == ""){
        district ="";
      }else{        
        district = "&FWWOMDISTRICT="+'"'+$scope.dis+'"';     
      }
      if(angular.isUndefined($scope.upa) || $scope.upa == "" ){
        thana = "";
      }else{      
        thana = "&FWWOMUPAZILLA="+'"'+$scope.upa+'"';
      }
      if(angular.isUndefined($scope.uni) || $scope.uni == "" ){
        union = "";
      }else{        
        union = "&FWWOMUNION="+'"'+$scope.uni+'"';
      }
      if(angular.isUndefined($scope.uu) || $scope.uu =="" ){
        provider = "";
      }else{
        provider = "&PROVIDERID="+'"'+$scope.uu+'"';
      }
      if(angular.isUndefined($scope.name) || $scope.name == "" ){
            elcoName = "";
          }else{
            elcoName = "&FWWOMFNAME="+$scope.name;
          }
      if(district=="" && thana == "" && union=="" && provider=="" && elcoName ==""){
        $scope.data="";
        $scope.total_count=0;
      }else{      
        var countApiUrl = "get-elco-count-by-keys?";
        var dataUrlApi = "elco-search?";
        Common.onSearch($scope,type,district,thana,union,provider,elcoName,countApiUrl,dataUrlApi);
      }

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
        //console.log($scope.unions);
      }         
    }
    $scope.onClickDialog = function (id) {      
      var url = OPENSRP_WEB_BASE_URL+"/get-elco-details?id="+id; 
      Common.getDetailsData(id,url,$scope,"elco");
      ngDialog.open({ template: '../views/elco_details.html', className: '',scope:$scope,showClose: true });
    };
    
  });
