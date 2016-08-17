'use strict';

/**
 * @ngdoc service
 * @name opensrpSiteApp.ACCESSTOKENS
 * @description
 * # ACCESSTOKENS
 * Service in the opensrpSiteApp.
 */
angular.module('opensrpSiteApp')
  .service('User', function ($http,$rootScope,Base64,OPENSRP_WEB_BASE_URL, COUCHURL) {
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
            $scope.disabled = false;
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
           $scope.disabled = false;
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
      
      this.allUsers = function ($scope,$rootScope){
        //"http://192.168.21.86:1337/192.168.21.86:5984/opensrp/_design/Privilege/_view/privilege_by_name";
        var apiURLs = COUCHURL + "/opensrp/_design/User/_view/by_id"; //OPENSRP_WEB_BASE_URL+"/all-roles-with-user"; 
        $http.get(apiURLs, { 
          cache: false,
          withCredentials: false,
          headers: {
            'Authorization' : ''
          }
        })
        .success(function (data) {
          $rootScope.Users = data.rows;
          $rootScope.loading = false;
          $scope.disabled = false;
        });
      }

      this.fetchRoles = function($scope, $rootScope, $timeout){
        var roleUrl = COUCHURL + "/opensrp/_design/Role/_view/role_by_name";
        $http.get(roleUrl, { 
          cache: true,
          withCredentials: false,
          headers: {
            'Authorization' : ''
          }
        })
        .success(function (data) {          
          $scope.roles = [];
          $scope.formData.selectedRoles = [];
          for(var i = 0 ; i < data.rows.length; i++){
            $scope.roles.push({ "name" : data.rows[i].key, "id" : data.rows[i].id });
            $scope.formData.selectedRoles[data.rows[i].key] = false;
          }          
          console.log($scope.formData.selectedRoles );
          $scope.formData.password="";
          $scope.formData.email = "";
          $rootScope.loading = false;
          $scope.disabled = false;          
        });
      }

      this.fetchUsers = function($scope, $rootScope, $timeout){
        var userUrl = COUCHURL + "/opensrp/_design/User/_view/by_user_name";        
        $http.get(userUrl, { 
          cache: true,
          withCredentials: false,
          headers: {
            'Authorization' : ''
          }
        })
        .success(function (data) {          
          $scope.users = [];
          $scope.formData.parent = {};
          $scope.formData.selectedChildren = [];
          for(var i = 0 ; i < data.rows.length; i++){
            $scope.users.push({ "name" : data.rows[i].key, "id" : data.rows[i].id });
            $scope.formData.selectedChildren[data.rows[i].key] = false;
          }          
          console.log($scope.formData.selectedChildren );                   
          $rootScope.loading = false;
          $scope.disabled = false;          
        });
      }
      this.editUser = function(data,$window,Flash){
        $("#submit").attr('disabled','disabled');
        $("#submit").html("Please Wait");
        
        var apiURLs = OPENSRP_WEB_BASE_URL+"/edit-user";          
        delete data.selectedChildren;
        delete data.selectedRoles;
        delete data.decoyCheckbox;
        console.log(data);    
        $http.post(apiURLs, data).success(function (data) {
          $("#submit").html("Submit");
          $('#submit').prop('disabled', false);
          if (data == 1) {            
            var message = '<strong>Successfully edit user. </strong> ';
            Flash.create('success', message, 'custom-class');
            $window.location = '/#/users';
          }else{
             $("#message").html("<p class='lead'>Failed to edit user</p>");
            $( "#message" ).delay(3000).fadeOut( "slow" );
          }
          
        });  

      }
      this.createUser = function(data,$window,Flash){
        
        $("#submit").attr('disabled','disabled');
        $("#submit").html("Please Wait");
        
        var apiURLs = OPENSRP_WEB_BASE_URL+"/add-user";          
        delete data.selectedChildren;
        delete data.selectedRoles;
        delete data.decoyCheckbox;
        console.log(data);    
        $http.post(apiURLs, data).success(function (data) {
          $("#submit").html("Submit");
           $('#submit').prop('disabled', false);
          if (data == 1) {            
            var message = '<strong>Successfully created a user. </strong> ';
            Flash.create('success', message, 'custom-class');
            $window.location = '/#/users';
          }else{
             $("#message").html("<p class='lead'>Failed to create user</p>");
            $( "#message" ).delay(3000).fadeOut( "slow" );
          }
          
        });   
      };

      this.userByName =  function($scope,$rootScope,$timeout,id,$q){
        console.log("User.userByName called.");
        //http://localhost:5984/opensrp/_design/Privilege/_view/privilege_by_id?key=%225da9913d2e051554a772deae8b02aa0b%22
        var url = COUCHURL+'/opensrp/_design/User/_view/by_user_name?key="' + id + '"';  
        var roleUrl = COUCHURL + "/opensrp/_design/Role/_view/role_by_name";
        var userUrl = COUCHURL + "/opensrp/_design/User/_view/by_user_name";
        $rootScope.loading = true;
        var fetchedRoles = $http.get(roleUrl,{ 
          cache: true,
          withCredentials: false,
          headers: {
            'Authorization' : ''
          }
        }); 
        var fetchedUsers = $http.get(userUrl,{ 
          cache: true,
          withCredentials: false,
          headers: {
            'Authorization' : ''
          }
        });
        var fetchedCurrentUser = $http.get(url,{ 
          cache: true,
          withCredentials: false,
          headers: {
            'Authorization' : ''
          }
        } );

        $q.all([fetchedRoles, fetchedUsers, fetchedCurrentUser]).then(function(results){
          console.log(results[0].data);
          console.log(results[1].data);
          console.log(results[2].data.rows[0].value);

          $scope.roles = [];
          $scope.formData.selectedRoles = [];
          for(var i = 0 ; i < results[0].data.rows.length; i++){
            $scope.roles.push({ "name" : results[0].data.rows[i].key, "id" : results[0].data.rows[i].id });
            $scope.formData.selectedRoles[results[0].data.rows[i].key] = false;
          } 

          $scope.users = [];
          $scope.formData.parent = {};
          $scope.formData.selectedChildren = [];
          for(var i = 0 ; i < results[1].data.rows.length; i++){
            $scope.users.push({ "name" : results[1].data.rows[i].key, "id" : results[1].data.rows[i].id });
            $scope.formData.selectedChildren[results[1].data.rows[i].key] = false;
          }

          $scope.formData.given_name = results[2].data.rows[0].value.given_name;
          $scope.formData.middle_name = results[2].data.rows[0].value.middle_name;
          $scope.formData.family_name = results[2].data.rows[0].value.family_name;
          $scope.formData.contact_number = Number(results[2].data.rows[0].value.contact_number);
          $scope.formData.email = results[2].data.rows[0].value.email;
          $scope.formData.personal_address = results[2].data.rows[0].value.personal_address;
          $scope.formData.user_name = results[2].data.rows[0].value.user_name;
          $scope.formData.gender = results[2].data.rows[0].value.gender;
          $('select[name="gender"]').val(results[2].data.rows[0].value.gender);
          $('select[name="parent"]').val('demosrp');//results[2].data.rows[0].value.parent.user_name);
          $scope.formData.parent={'user_name': results[2].data.rows[0].value.parent.user_name, 
            'id':results[2].data.rows[0].value.parent.id};
          console.log("the parent is " + results[2].data.rows[0].value.parent.user_name);
          console.log("expected gender- " + results[2].data.rows[0].value.gender);
          $scope.role = results[2].data.rows[0].value;
          $scope.formData.id = $scope.role._id;  
          $scope.formData.password = "";

          for(var i = 0 ; i < results[2].data.rows[0].value.roles.length; i++){
            $scope.formData.selectedRoles[results[2].data.rows[0].value.roles[i].name] = true;
          }
          $("#decoyCheckbox").click();          
          console.log($scope.formData.selectedRoles);
          for(var i = 0 ; i < results[2].data.rows[0].value.children.length; i++){
            console.log("found children- " + results[2].data.rows[0].value.children[i].user_name);
            $scope.formData.selectedChildren[results[2].data.rows[0].value.children[i].user_name] = true;
          }
          $scope.ifEdit = true;
          $rootScope.loading = false;
        });           
        /*$timeout(function () {
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
              console.log("formData should be loaded on edit page." + data.rows[0].value.contact_number);
              //$scope.formData.name = $scope.role.name;
              $scope.formData.given_name = data.rows[0].value.given_name;
              $scope.formData.middle_name = data.rows[0].value.middle_name;
              $scope.formData.family_name = data.rows[0].value.family_name;
              $scope.formData.contact_number = Number(data.rows[0].value.contact_number);
              $scope.formData.email = data.rows[0].value.email;
              $scope.formData.personal_address = data.rows[0].value.personal_address;
              $scope.formData.user_name = data.rows[0].value.user_name;
              $scope.formData.gender = data.rows[0].value.gender;
              $('select[name="gender"]').val(data.rows[0].value.gender);
              
              $scope.formData.id = $scope.role._id;
              $scope.formData.privilegesOfCurrentRole = {};
              //while($rootScope.accessList == null){              }
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
        }, 250); */
      };     
  });
