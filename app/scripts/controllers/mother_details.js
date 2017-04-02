'use strict';

/**
 * @ngdoc function
 * @name opensrpSiteApp.controller:PwdetailsCtrl
 * @description
 * # PwdetailsCtrl
 * Controller of the opensrpSiteApp
 */
angular.module('opensrpSiteApp')
  .controller('MotherCtrl', function ($scope,$rootScope,$cookies, $routeParams,$q,$location, $http,$window,$timeout,AclService,$filter,Common,OPENSRP_WEB_BASE_URL,ngDialog) {
    $scope.can = AclService.can;
    var url = $location.path().split("/")[2]; 
    $scope.total_count=0;
    Common.locations($scope);
    Common.users($scope);
    $scope.onSearch = function(){        
      $rootScope.loading = true;  
      $scope.dataShowHide = false;
      var district="";
      var union="";
      var thana="";      
      var provider;
      var name;
      var type = "type=Mother";      
      if(angular.isUndefined($scope.dis) || $scope.dis==""){
        district ="";
      }else{        
        district = "&FWWOMDISTRICT="+'"'+$scope.dis+'"';     
      }
      if(angular.isUndefined($scope.upa) || $scope.upa==""){
        thana = "";
      }else{      
        thana = "&FWWOMUPAZILLA="+'"'+$scope.upa+'"';
      }
      if(angular.isUndefined($scope.uni) || $scope.uni=="" ){
        union = "";
      }else{        
        union = "&FWWOMUNION="+'"'+$scope.uni+'"';
      }
      if(angular.isUndefined($scope.uu) || $scope.uu=="" ){
        provider = "";
      }else{
        provider = "&PROVIDERID="+'"'+$scope.uu+'"';
      }
      if(angular.isUndefined($scope.name) || $scope.name=="" ){
        name = "";
        }else{
        name = "&mother_first_name="+$scope.name;
      }
      if(district=="" && thana == "" && union=="" && provider=="" && name==""){
        $scope.data="";
        $scope.total_count=0;
      }else{
        var countApiUrl = "get-mother-count-by-keys?";
        var dataUrlApi = "mother-search?";
        Common.onSearch($scope,type,district,thana,union,provider,name,countApiUrl,dataUrlApi);
      }

    }
   
    $scope.onChangedDistrict = function(){
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

    $scope.onChangedUpazila = function(){
      $('#union_dd').find('option:eq(0)').prop('selected', true);
      $scope.uni = '';
      $scope.unions = [];
      if($scope.upa !== ''){       
        window.allLocation = window.locationList;
        window.unionsList = jsonsql.query("select * from allLocation where ( tag =='Union' && parent._value == '"+ $scope.upa +"'  ) ",allLocation);
        $scope.unions = unionsList;
      }         
    }

    $scope.onClickDialog = function (id) {      
      var url = OPENSRP_WEB_BASE_URL+"/get-mother-details?id="+id;
        Common.getDetailsData(id,url,$scope,"mother");
        ngDialog.open({ template: '../views/mother_details.html', className: '',scope:$scope,showClose: true });
    };

  
  });
