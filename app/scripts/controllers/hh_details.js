'use strict';

/**
 * @ngdoc function
 * @name opensrpSiteApp.controller:HhRegisterControllerCtrl
 * @description
 * # HhRegisterControllerCtrl
 * Controller of the opensrpSiteApp
 */
angular.module('opensrpSiteApp')
 .controller('HouseholdCtrl', function ($scope,$rootScope,$cookies, $routeParams,$q,$location, $http, $window,$timeout,AclService,$filter,Common, OPENSRP_WEB_BASE_URL) {
    $scope.can = AclService.can; 
     	
        var url = $location.path().split("/")[2]; 
        
        // default data based on user type
        // if user type is Admin then all data are showing
        // if user type is HI then data showing only within his/her area which is thana based
        // if user type is AHI then data showing only within his/her area which is Union based
        // if user is HA then only his/her data are showing.
        if(url =='list'){
        	

        }else if(url =='details'){
        	var householdDetailsApiURL = OPENSRP_WEB_BASE_URL+"/get-household-details?id="+$routeParams.id;
			var deferred = $q.defer();
			var householdDetails = $http.get(householdDetailsApiURL, { cache: false}); 
        	$q.all([householdDetails]).then(function(results){
        		$scope.data = results[0].data;
        		
        		$scope.ELCODETAILS = $scope.data["ELCODETAILS"];
        		delete $scope.data["ELCODETAILS"];
        		$scope.details = $scope.data["details"];
        		delete $scope.data["details"];
        		$scope.multimediaAttachments = $scope.data["multimediaAttachments"];
        		delete $scope.data["multimediaAttachments"];
        		delete $scope.data["revision"];
        		delete $scope.data["type"];

        	});

        }else{

        }

        $scope.search = function(){
        	console.log(3333333333333);
        	$rootScope.loading = true;	
			$scope.dataShowHide = false;
			var district;
			var union;
			var thana;
			var union;
			var provider;
			var HouseholdName;
			var type = "type=HouseHold"; 			
			if(angular.isUndefined($scope.dis)){
				district ="";
			}else{				
				district = "&FWDISTRICT="+'"'+$scope.dis+'"';			
			}
			if(angular.isUndefined($scope.upa) ){
				thana = "";
			}else{			
				thana = "&FWUPAZILLA="+'"'+$scope.upa+'"';
			}
			if(angular.isUndefined($scope.uni) ){
				union = "";
			}else{			  
				union = "&FWUNION="+'"'+$scope.uni+'"';
			}
			if(angular.isUndefined($scope.uu) ){
				provider = "";
			}else{
				provider = "&PROVIDERID="+'"'+$scope.uu+'"';
			}
			if(district=="" && thana == "" && union=="" && provider==""){
				$scope.data="";
				$scope.total_count=0;
			}else{		

				var countApiUrl = "get-household-count-by-keys?";
        		var dataUrlApi = "household-search?";
        		Common.registerSearch($scope,type,district,thana,union,provider,countApiUrl,dataUrlApi);

		}

		}
	Common.locations($scope);
	Common.users($scope);
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

   
		
});
