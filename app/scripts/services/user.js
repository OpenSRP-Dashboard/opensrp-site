'use strict';

/**
 * @ngdoc service
 * @name opensrpSiteApp.ACCESSTOKENS
 * @description
 * # ACCESSTOKENS
 * Service in the opensrpSiteApp.
 */
angular.module('opensrpSiteApp')
  .service('User', function ($http,$rootScope,Base64,OPENSRP_WEB_BASE_URL) {
    // AngularJS will instantiate a singleton by calling "new" on this function    
    
      this.editRole = function(role,user,roleId,status,$window,Flash){
        var statusValue = "";
        if (status != "") {
          statusValue = "Active";
        }else{
          statusValue = "InActive";
        }
        console.log(role);
         var postData = {"userName": user,"roleName": role.roleName,"roleId": roleId,"status": statusValue};
         console.log(postData);
          $("#submit").attr('disabled','disabled');
          $("#submit").html("Please Wait");
          var apiURLs = OPENSRP_WEB_BASE_URL+"/edit-user";        
          $http.post(apiURLs, postData).success(function (data) {
              $("#submit").html("Submit");
               $('#submit').prop('disabled', false);
              if (data == 1) {                
                var message = '<strong>Successfully Successfully edit user .</strong> ';
                Flash.create('success', message, 'custom-class');
                $window.location = '/#/user';
              }else{
                 $("#message").html("<p class='lead'>Failed to update. Please try again. </p>");
                $( "#message" ).delay(3000).fadeOut( "slow" );
              }
          
          });
        
       
      
      }
      
      this.role = function(data,$window,Flash){
        console.log(data);
         var postData = {"userName": data.userName,"roleName": data.roleName.roleName ,"status": data.status};
          $("#submit").attr('disabled','disabled');
          $("#submit").html("Please Wait");
          var apiURLs = OPENSRP_WEB_BASE_URL+"/add-user";        
         $http.post(apiURLs, postData).success(function (data) {
              $("#submit").html("Submit");
               $('#submit').prop('disabled', false);
              if (data == 1) {               
                var message = '<strong>Successfully you have creaetd a user. </strong> ';
                Flash.create('success', message, 'custom-class');
                $window.location = '/#/user';
              }else if (data == 2) {
                $("#message").html("<p class='lead'>This usern already assinged</p>");
                $( "#message" ).delay(3000).fadeOut( "slow" );
              }else{
                 $("#message").html("<p class='lead'>Failed to assing </p>");
                $( "#message" ).delay(3000).fadeOut( "slow" );
              }
          
          });
        
       
      
      }
      this.users = function ($scope,$rootScope,$timeout,user){
        var apiURLs = OPENSRP_WEB_BASE_URL+"/all-user-name"; 
        var householdData = $http.get(apiURLs, { cache: true}).success(function (data) {
          $timeout(function () {
            $rootScope.userList = data;
            console.log(data);
            for(var i =0;i<$scope.userList.length;i++){              
              if (user == $scope.userList[i] ) {                               
                break;
              }             
            }
             $rootScope.userName  = $scope.userList[i];
           
            //console.log($rootScope.userList);
          }, 250);  
        }); 
      }
      this.activeRolesAndAccessTokens = function ($scope,$rootScope,$timeout,role,status){
        var apiURLs = OPENSRP_WEB_BASE_URL+"/all-active-roles-access-tokens"; 
        $http.get(apiURLs, { cache: true}).success(function (data) {
          $timeout(function () {
            $rootScope.roleList = data;
            $rootScope.loading = false;
            $scope.roleList = data;           
            for(var i =0;i<$scope.roleList.length;i++){             
              if (role == $scope.roleList[i].roleName ) {                               
                break;
              }             
            }
            $scope.statusData = [
              'status'
            ];
            if (status == 'Active') {
               $rootScope.statusModel = ['status'];
            }
           
            $rootScope.roleName = $scope.roleList[i];
          }, 250);  
        }); 
      }
      
      this.rolesAndAccessTokens = function ($scope,$rootScope,$timeout,role,status){
        var apiURLs = OPENSRP_WEB_BASE_URL+"/all-roles-access-tokens"; 
        $http.get(apiURLs, { cache: true}).success(function (data) {
          $timeout(function () {
            $rootScope.roleList = data;
            $rootScope.loading = false;
            $scope.roleList = data;          
            
          }, 250);  
        }); 
      }
      
      this.rolesAndUser = function ($scope,$rootScope,$timeout){
        var apiURLs = OPENSRP_WEB_BASE_URL+"/all-roles-with-user"; 
         $http.get(apiURLs, { cache: true}).success(function (data) {
          $timeout(function () {
            $rootScope.roleAndUser = data;
            $rootScope.loading = false;
            
          }, 250);  
        }); 
      }
     
  });
