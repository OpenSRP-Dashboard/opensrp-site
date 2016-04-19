'use strict';

/**
 * @ngdoc service
 * @name opensrpSiteApp.ROLE
 * @description
 * # ROLE
 * Service in the opensrpSiteApp.
 */
angular.module('opensrpSiteApp')
  .service('Role', function ($http,$rootScope,Base64,OPENSRP_WEB_BASE_URL, COUCHURL) {  
    var privileges = null;
    var couchUrl = COUCHURL + "/opensrp/_design/Privilege/_view/all";

    this.privileges = function(){
        return  $http.get(couchUrl, { 
            cache: true, 
            withCredentials: false,
            headers: {
              'Authorization' : ''
            }
          })
          .success(function (data) { 
            console.log("inside success function of privilege promise.");           
            privileges = data.rows;
      })
    } ;

    this.roleAndAccesssByRoleName = function(roleId,$rootScope,$timeout,$scope){
        console.log("call for a particular role is here.");
        var apiURLs = COUCHURL + '/opensrp/_design/Role/_view/role_by_id?key="' + roleId + '"';//OPENSRP_WEB_BASE_URL+"/role-access-tokens-by-name?roleName="+roleName;
        
        $timeout(function () {
          var roleData = $http.get(apiURLs, { 
            cache: true, 
            withCredentials: false,                  
            headers: {
              'Authorization' : ''
            }
          })
          .success(function (data) {                         
             console.log("data successfully fetched");
            // processing has to be done
            console.log(data);
            $timeout(function () {
              $rootScope.roleAndAccess = data;
              $scope.statusData = [
                'status'
              ];
              $rootScope.formData = {
                roleName : $rootScope.roleAndAccess.roleName ,
                roleId : $rootScope.roleAndAccess.roleId,
                accessTokens : [],
                status : []
              }

              /*for(var i=0; i< Object.keys(data.accessTokens).length ; i++){
                $rootScope.formData.accessTokens.push(data.accessTokens[Object.keys(data.accessTokens)[i]]);
              }*/
              $scope.disabled = false;
              if ($rootScope.roleAndAccess.status == 'Active') {
                 $rootScope.formData.status.push('status') ;
              }
              //console.log(data);
              $rootScope.loading = false;
              //console.log($rootScope.roleList);            
            
          });
        }, 250); 
        });         
      };     

      this.save = function(data,$window,Flash){
        
        $("#submit").attr('disabled','disabled');
        $("#submit").html("Please Wait");
        var apiURLs = OPENSRP_WEB_BASE_URL+"/add-acl";       
        $http.post(apiURLs, data).success(function (data) {
          $("#submit").html("Submit");
           $('#submit').prop('disabled', false);
          if (data == 1) {            
            var message = '<strong>Successfully created a role. </strong> ';
            Flash.create('success', message, 'custom-class');
            $window.location = '/#/acl';
          }else if (data == 2) {
            $("#message").html("<p class='lead'>This role already exists</p>");
            $( "#message" ).delay(3000).fadeOut( "slow" );
          }else{
             $("#message").html("<p class='lead'>Failed to create role</p>");
            $( "#message" ).delay(3000).fadeOut( "slow" );
          }
          
        });       
      };

      this.accessTokens = function($rootScope, $timeout){
        var url = COUCHURL + '/opensrp/_design/Privilege/_view/privilege_by_name';
        $timeout(function () {
          var roleData = $http.get(url, { 
            cache: true, 
            withCredentials: false,                  
            headers: {
              'Authorization' : ''
            }
          })
          .success(function (data) {  
            if(data.rows.length > 0){
              console.log("privileges are fetched successfully");
              console.log(data); 
              $rootScope.accessList = [];
              for(var i = 0; i < data.rows.length; i++){
                $rootScope.accessList.push(data.rows[i].key);
              }
              //$rootScope.accessList = ['Household', 'Household Details', 'Elco', 'Elco Details','PW','PW Details','Data Export','User List','User Assign','User Assign Edit','Role Edit','Add Role','Acl','Add Rule','Edit Rule','Rule List'];
            } 
          });
        }, 250); 
        
      };

      this.edit = function(data,$window,Flash){
        
        //console.log(data.accessTokens.length)
        var dd = [];
        var obj = {}
        for(var i=0;i<data.accessTokens.length;i++){
          obj[i] = data.accessTokens[i];
        }
        var statusValue = "";
        if (data.status != "") {
          statusValue = "Active";
        }else{
          statusValue = "InActive";
        }        
        data.accessTokens = obj;
        data.status = statusValue;       
        console.log(data);
        
        $("#submit").attr('disabled','disabled');
        $("#submit").html("Please Wait");
        var apiURLs = OPENSRP_WEB_BASE_URL+"/edit-acl";       
        $http.post(apiURLs, data).success(function (data) {
          $("#submit").html("Submit");
           $('#submit').prop('disabled', false);
          if (data == 1) {
            
            var message = '<strong>Successfully edit a role. </strong> ';
            Flash.create('success', message, 'custom-class');
            $window.location = '/#/acl';
          }else if (data == 2) {
            $("#message").html("<p class='lead'>This role already exists</p>");
            $( "#message" ).delay(3000).fadeOut( "slow" );
          }else{
             $("#message").html("<p class='lead'>Failed to create role</p>");
            $( "#message" ).delay(3000).fadeOut( "slow" );
          }
          
        });     
      };

      this.allRoles =  function($scope,$rootScope,$timeout){
        //http://localhost:5984/opensrp/_design/Privilege/_view/privilege_by_id?key=%225da9913d2e051554a772deae8b02aa0b%22
        var url = COUCHURL+'/opensrp/_design/Role/_view/role_by_id';              
        $timeout(function () {
          var privilegeData = $http.get(url, { 
            cache: true, 
            withCredentials: false,                  
            headers: {
              'Authorization' : ''
            }
          })
          .success(function (data) {                         
            console.log("all roles fetched.");
            console.log(data);       
            $scope.roles = data.rows;     
          });
        }, 250); 
      };

      this.roleById =  function($scope,$rootScope,$timeout,id){
        console.log("call for a particular role is here.");
        //http://localhost:5984/opensrp/_design/Privilege/_view/privilege_by_id?key=%225da9913d2e051554a772deae8b02aa0b%22
        var url = COUCHURL+'/opensrp/_design/Role/_view/role_by_id?key="' + id + '"';              
        $timeout(function () {
          var roleData = $http.get(url, { 
            cache: true, 
            withCredentials: false,                  
            headers: {
              'Authorization' : ''
            }
          })
          .success(function (data) {  
            $rootScope.loading = false;
            if(data.rows.length > 0){
              console.log("role data successfully fetched for id- " + id);
              console.log(data);  
              $scope.role = data.rows[0].value;

              $scope.formData = {};
              $scope.formData.roleName = $scope.role.name;
              $scope.formData.roleId = $scope.role._id;
              /*roleName roleId
              $scope.formData = {
                roleName : $scope.role.name,
                roleId : $scope.role._id,
                accessTokens : [],
                status : []
              }*/

              /*for(var i=0; i< Object.keys(data.accessTokens).length ; i++){
                $rootScope.formData.accessTokens.push(data.accessTokens[Object.keys(data.accessTokens)[i]]);
              }*/
              /*$scope.disabled = false;
              if ($rootScope.roleAndAccess.status == 'Active') {
                 $rootScope.formData.status.push('status') ;
              }
              //console.log(data);
              $rootScope.loading = false;*/
            } 
          });
        }, 250); 
      };
  });
