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
    
      this.role = function(data){
        console.log(data);
         var postData = {"userName": data.userName,"roleName": data.roleName.roleName  };
          $("#submit").attr('disabled','disabled');
          $("#submit").html("Please Wait");
          var apiURLs = OPENSRP_WEB_BASE_URL+"/add-role";        
         $http.post(apiURLs, postData).success(function (data) {
              $("#submit").html("Submit");
               $('#submit').prop('disabled', false);
              if (data == 1) {
                $("#message").html("<p class='lead'>Successfully assigned  </p>");
                $( "#message" ).delay(3000).fadeOut( "slow" );
              }else if (data == 2) {
                $("#message").html("<p class='lead'>This usern already assinged</p>");
                $( "#message" ).delay(3000).fadeOut( "slow" );
              }else{
                 $("#message").html("<p class='lead'>Failed to assing </p>");
                $( "#message" ).delay(3000).fadeOut( "slow" );
              }
          
          });
        
       
      
      }
      
      this.users = function ($scope,$rootScope,$timeout){
        var apiURLs = OPENSRP_WEB_BASE_URL+"/all-user-name"; 
        var householdData = $http.get(apiURLs, { cache: true}).success(function (data) {
          $timeout(function () {
            $rootScope.userList = data;
            //console.log($rootScope.userList);
          }, 250);  
        }); 
      }
      this.roles = function ($scope,$rootScope,$timeout){
        var apiURLs = OPENSRP_WEB_BASE_URL+"/all-roles"; 
        var householdData = $http.get(apiURLs, { cache: true}).success(function (data) {
          $timeout(function () {
            $rootScope.roleList = data;
            $rootScope.loading = false;
            //console.log($rootScope.roleList);
          }, 250);  
        }); 
      }
     
  });
