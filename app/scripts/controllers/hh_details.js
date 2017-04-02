'use strict';

/**
 * @ngdoc function
 * @name opensrpSiteApp.controller:HhRegisterControllerCtrl
 * @description
 * # HhRegisterControllerCtrl
 * Controller of the opensrpSiteApp
 */
angular.module('opensrpSiteApp')
 .controller('HouseholdCtrl', function ($scope,$rootScope,$cookies, $routeParams,$q,$location, $http, $window,$timeout,AclService,$filter,Common, OPENSRP_WEB_BASE_URL,ngDialog) {
    $scope.can = AclService.can;     	
    var url = $location.path().split("/")[2];        
    $scope.total_count=0;
    Common.locations($scope);
    Common.users($scope);
    $scope.onSearch = function(){        	
        $rootScope.loading = true;	
		$scope.dataShowHide = false;
		var district ;
		var union ;
		var thana ;
		var union ;
		var provider;
    	var householdName ;
    	var type = "type=HouseHold"; 			
    	if(angular.isUndefined($scope.dis) || $scope.dis==""){
    		district ="";
    	}else{				
    		district = "&FWDISTRICT="+'"'+$scope.dis+'"';			
    	}
    	if(angular.isUndefined($scope.upa) || $scope.upa==""){
    		thana = "";
    	}else{			
    		thana = "&FWUPAZILLA="+'"'+$scope.upa+'"';
    	}
    	if(angular.isUndefined($scope.uni) || $scope.uni=="" ){
    		union = "";
    	}else{			  
    		union = "&FWUNION="+'"'+$scope.uni+'"';
    	}
    	if(angular.isUndefined($scope.uu) || $scope.uu=="" ){
    		provider = "";
    	}else{
    		provider = "&PROVIDERID="+'"'+$scope.uu+'"';
    	}
        if(angular.isUndefined($scope.name) || $scope.name=="" ){
            householdName = "";
        }else{
            householdName = "&FWHOHFNAME="+$scope.name;
        }
    	if(district=="" && thana == "" && union=="" && provider=="" && householdName==""){
    		$scope.data="";
    		$scope.total_count=0;
    	}else{
    		var countApiUrl = "get-household-count-by-keys?";
            var dataUrlApi = "household-search?";
            Common.onSearch($scope,type,district,thana,union,provider,householdName,countApiUrl,dataUrlApi);

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
      var url = OPENSRP_WEB_BASE_URL+"/get-household-details?id="+id;
        Common.getDetailsData(id,url,$scope,"household");
        ngDialog.open({ template: '../views/household_details.html', className: '',scope:$scope,showClose: true });
    };
		
});
