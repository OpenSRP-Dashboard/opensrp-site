'use strict';

/**
 * @ngdoc service
 * @name opensrpSiteApp.ROLE
 * @description
 * # ROLE
 * Service in the opensrpSiteApp.
 */
angular.module('opensrpSiteApp')
  .service('Role', function ($http,$rootScope,Base64,OPENSRP_WEB_BASE_URL) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    /*var role = {
      save: function(data) {        
        var postData = {"userName": data.userName.name,"roleName": data.roleName  };            
        var apiURLs = OPENSRP_WEB_BASE_URL+"/add-role";        
        $http.post(apiURLs, postData).success(function (da) {});      
        
      }
    };
    return role;
  */
  
  this.save = function(data){
        console.log(data);
        $("#submit").attr('disabled','disabled');
        $("#submit").html("Please Wait");
        var apiURLs = OPENSRP_WEB_BASE_URL+"/add-acl";       
        $http.post(apiURLs, data).success(function (data) {
          $("#submit").html("Submit");
           $('#submit').prop('disabled', false);
          if (data == 1) {
            $("#message").html("<p class='lead'>Successfully created a role</p>");
            $( "#message" ).delay(3000).fadeOut( "slow" );
          }else if (data == 2) {
            $("#message").html("<p class='lead'>This role already exists</p>");
            $( "#message" ).delay(3000).fadeOut( "slow" );
          }else{
             $("#message").html("<p class='lead'>Failed to create role</p>");
            $( "#message" ).delay(3000).fadeOut( "slow" );
          }
          
        });
      
      }
  });
