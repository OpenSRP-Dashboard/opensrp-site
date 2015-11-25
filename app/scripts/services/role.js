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
      this.edit = function(data){
        
        //console.log(data.accessTokens.length)
        var dd = [];
        var obj = {}
        for(var i=0;i<data.accessTokens.length;i++){
          obj[i] = data.accessTokens[i];
        }
        console.log(obj);
        data.accessTokens = obj;
        console.log(data);
        $("#submit").attr('disabled','disabled');
        $("#submit").html("Please Wait");
        var apiURLs = OPENSRP_WEB_BASE_URL+"/edit-acl";       
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
      this.accessTokens = function($rootScope){
        $rootScope.accessList = ['Household', 'Household Details', 'Elco', 'Elco Details','PW','PW Details','Data Export'];
      }
      
      this.roleAndAccesssByRoleName = function(roleName,$rootScope,$timeout,$scope){
        var apiURLs = OPENSRP_WEB_BASE_URL+"/role-access-tokens-by-name?roleName="+roleName;
        $http.get(apiURLs, { cache: true}).success(function (data) {
          $timeout(function () {
            $rootScope.roleAndAccess = data;            
            $rootScope.formData = {
              roleName : $rootScope.roleAndAccess.roleName ,
              roleId : $rootScope.roleAndAccess.roleId,
              accessTokens : []
            }
            for(var i=0; i< Object.keys(data.accessTokens).length ; i++){
              $rootScope.formData.accessTokens.push(data.accessTokens[Object.keys(data.accessTokens)[i]]);
            }
             
            //console.log(data);
            $rootScope.loading = false;
            //console.log($rootScope.roleList);
          }, 250);  
        }); 
        
      }
  });
