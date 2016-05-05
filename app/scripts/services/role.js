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

      this.save = function(data,$window,Flash){
        
        $("#submit").attr('disabled','disabled');
        $("#submit").html("Please Wait");
        var apiURLs = OPENSRP_WEB_BASE_URL+"/add-role";   
        data.privileges = [];
        for(var i = 0; i < $rootScope.accessList.length; i++){
          if(data.privilegesOfCurrentRole[$rootScope.accessList[i].name]){
            data.privileges.push({ "name": $rootScope.accessList[i].name, 
                                    "id" : $rootScope.accessList[i].id});
          }
        }
        delete data.privilegesOfCurrentRole;
        console.log(data);    
        $http.post(apiURLs, data).success(function (data) {
          $("#submit").html("Submit");
           $('#submit').prop('disabled', false);
          if (data == 1) {            
            var message = '<strong>Successfully created a role. </strong> ';
            Flash.create('success', message, 'custom-class');
            $window.location = '/#/roles';
          }else{
             $("#message").html("<p class='lead'>Failed to create role</p>");
            $( "#message" ).delay(3000).fadeOut( "slow" );
          }
          
        });   
      };

      this.accessTokens = function($rootScope, $timeout, $scope, roleId){
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
                $rootScope.accessList.push({"name" : data.rows[i].key, "id" : data.rows[i].id});
              }
              console.log($rootScope.accessList);
              if($scope.addRole){
                $scope.formData.privilegesOfCurrentRole = {};
                for(var i = 0; i < $rootScope.accessList.length; i++){
                  $scope.formData.privilegesOfCurrentRole[$rootScope.accessList[i].name] = false;
                }
              }
              $rootScope.loading = true;
              //roleById($scope, $rootScope, $timeout, roleId);
              //$rootScope.accessList = ['Household', 'Household Details', 'Elco', 'Elco Details','PW','PW Details','Data Export','User List','User Assign','User Assign Edit','Role Edit','Add Role','Acl','Add Rule','Edit Rule','Rule List'];

              //this.roleById($scope,$rootScope,$timeout,$scope.id);

              $timeout(function () {
                var url = COUCHURL+'/opensrp/_design/Role/_view/role_by_id?key="' + roleId + '"';              
                var roleData = $http.get(url, { 
                  cache: false, 
                  withCredentials: false,                  
                  headers: {
                    'Authorization' : ''
                  }
                })
                .success(function (data) {  
                  $rootScope.loading = false;
                  if(data.rows.length > 0){
                    console.log("role data successfully fetched for id- " + roleId);
                    console.log(data);  
                    $scope.role = data.rows[0].value;

                    $scope.formData = {};
                    $scope.formData.name = $scope.role.name;
                    $scope.formData.id = $scope.role._id;
                    $scope.formData.privilegesOfCurrentRole = {};
                    while(angular.isUndefined($rootScope.accessList)){

                    }
                    for(var i = 0; i < $rootScope.accessList.length; i++){
                      $scope.formData.privilegesOfCurrentRole[$rootScope.accessList[i].name] = false;
                    }
                    for(var i =0; i < $scope.role.privileges.length; i++){
                      $scope.formData.privilegesOfCurrentRole[$scope.role.privileges[i].name] = true;
                    }
                    $scope.formData.status = $scope.role.status;
                    console.log($scope.formData);
                    $rootScope.loading = false;
                  } 
                });
              }, 250); 
            } 
          });
        }, 250); 
        
      };

      this.edit = function(data,$window,Flash){
              
        $("#submit").attr('disabled','disabled');
        $("#submit").html("Please Wait");
        var apiURLs = OPENSRP_WEB_BASE_URL+"/edit-role";     
        data.privileges = [];
        for(var i = 0; i < $rootScope.accessList.length; i++){
          if(data.privilegesOfCurrentRole[$rootScope.accessList[i].name]){
            data.privileges.push({ "name": $rootScope.accessList[i].name, 
                                    "id" : $rootScope.accessList[i].id});
          }
        }
        //console.log(data);
        delete data.privilegesOfCurrentRole;
        console.log("final object being sent- " + data);

        $http.post(apiURLs, data).success(function (data) {
          $("#submit").html("Submit");
           $('#submit').prop('disabled', false);
          if (data == 1) {
            
            var message = '<strong>Successfully edit a role. </strong> ';
            Flash.create('success', message, 'custom-class');
            $window.location = '/#/roles';
          }else{
             $("#message").html("<p class='lead'>Error while updating</p>");
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
              $scope.formData.name = $scope.role.name;
              $scope.formData.id = $scope.role._id;
              $scope.formData.privilegesOfCurrentRole = {};
              while(angular.isUndefined($rootScope.accessList)){

              }
              for(var i = 0; i < $rootScope.accessList.length; i++){
                $scope.formData.privilegesOfCurrentRole[$rootScope.accessList[i].name] = false;
              }
              for(var i =0; i < $scope.role.privileges.length; i++){
                $scope.formData.privilegesOfCurrentRole[$scope.role.privileges[i].name] = true;
              }
              $scope.formData.status = $scope.role.status;
              console.log($scope.formData);
              $rootScope.loading = false;
            } 
          });
        }, 250); 
      };
  });
