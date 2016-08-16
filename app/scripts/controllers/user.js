'use strict';

/**
 * @ngdoc function
 * @name opensrpSiteApp.controller:AccesstokensCtrl
 * @description
 * # AccesstokensCtrl
 * Controller of the opensrpSiteApp
 */
angular.module('opensrpSiteApp')
  .controller('UserCtrl', function ($scope,$rootScope,Flash,$window,$timeout,$location,$routeParams,$http,User,AclService, OPENSRP_WEB_BASE_URL,$q,Base64) {   
    
    //$scope.disabled = true;
    $scope.can = AclService.can;
    var userName = $routeParams.name;
    console.log("found userName- " + userName);
    if ($location.path() == '/add-user') {
      $rootScope.loading = true;      
      $scope.formData = {};
      //console.log($scope.formData.password + " -ho");
      User.fetchRoles($scope, $rootScope, $timeout);
      User.fetchUsers($scope, $rootScope, $timeout);
      //console.log($scope.formData.password + " -ho");

      $scope.ifOneElementOfBooleanArrayIsTrue = function (object) {
        return Object.keys(object).some(function (key) {
          //console.log("called for key -" + key);
          return object[key];
        });
      }
      
      $scope.roleCheckboxClicked = function (toggleThis) {
        $scope.formData.selectedRoles[toggleThis] = ! $scope.formData.selectedRoles[toggleThis]
        console.log($scope.formData.selectedRoles);
        if($scope.ifOneElementOfBooleanArrayIsTrue($scope.formData.selectedRoles)){
          console.log("at least one role is selected");
          if(!$("#decoyCheckbox").is(':checked')){
            $("#decoyCheckbox").click();
          }
        }
        else{
          console.log("no role is selected");
          if($("#decoyCheckbox").is(':checked')){
            $("#decoyCheckbox").click();
          }
        }
      }

      $scope.save = function(){
        console.log("form submitted");
        console.log($scope.formData);
        $scope.formData.children = [];
        $scope.formData.roles = [];

        for(var i =0; i<$scope.users.length; i++){
          if($scope.formData.selectedChildren[$scope.users[i].name]){
            $scope.formData.children.push({"user_name" : $scope.users[i].name, "id" : $scope.users[i].id});
          }
        }

        for(var i =0; i<$scope.roles.length; i++){
          if($scope.formData.selectedRoles[$scope.roles[i].name]){
            $scope.formData.roles.push({"name" : $scope.roles[i].name, "id" : $scope.roles[i].id});
          }
        }
        $scope.formData.password = Base64.encode($scope.formData.password);
        console.log($scope.formData);
        User.createUser($scope.formData,$window,Flash);
      }     

      /*$("#user_name").blur(function(){        
        var url = OPENSRP_WEB_BASE_URL + "/valid-username?userName=" + $("#user_name").val(); //192.168.23.239:9979 
        console.log("inside blur- " + url);
        if($("#user_name").val().length >= 6 && $("#user_name").val().length <=20){
          $http.get(url).success(function (data) {
            console.log("received response- " + data);          
          });  
        }        
      });*/
     
      //User.users($scope,$rootScope,$timeout);
      //User.activeRolesAndAccessTokens($scope,$rootScope,$timeout);
    }else if(userName){
      $rootScope.loading = true;
      /*$scope.save = function(){
       User.editRole($scope.roleName,$scope.userName,roleId,$scope.statusModel,$window,Flash);
      }*/
      $scope.ifOneElementOfBooleanArrayIsTrue = function (object) {
        return Object.keys(object).some(function (key) {
          //console.log("called for key -" + key);
          return object[key];
        });
      }
      
      $scope.roleCheckboxClicked = function (toggleThis) {
        $scope.formData.selectedRoles[toggleThis] = ! $scope.formData.selectedRoles[toggleThis]
        console.log($scope.formData.selectedRoles);
        if($scope.ifOneElementOfBooleanArrayIsTrue($scope.formData.selectedRoles)){
          console.log("at least one role is selected");
          if(!$("#decoyCheckbox").is(':checked')){
            $("#decoyCheckbox").click();
          }
        }
        else{
          console.log("no role is selected");
          if($("#decoyCheckbox").is(':checked')){
            $("#decoyCheckbox").click();
          }
        }
      }

      $scope.save = function(){
        console.log("form submitted");
        console.log($scope.formData);
        $scope.formData.children = [];
        $scope.formData.roles = [];

        for(var i =0; i<$scope.users.length; i++){
          if($scope.formData.selectedChildren[$scope.users[i].name]){
            $scope.formData.children.push({"user_name" : $scope.users[i].name, "id" : $scope.users[i].id});
          }
        }

        for(var i =0; i<$scope.roles.length; i++){
          if($scope.formData.selectedRoles[$scope.roles[i].name]){
            $scope.formData.roles.push({"name" : $scope.roles[i].name, "id" : $scope.roles[i].id});
          }
        }
        
        console.log($scope.formData);
        User.editUser($scope.formData,$window,Flash);
      }

      $scope.formData = {};
      User.userByName($scope,$rootScope,$timeout,userName,$q);
    }else{
      $rootScope.loading = true;
      $scope.userAssign =
      ' <a href="#/add-user">'+
      '<i class="glyphicon glyphicon-list-alt"></i>'+
      ' <span>Add User</span>'+
      '</a>';
      User.allUsers($scope,$rootScope);
    }
     
  });

angular.module('opensrpSiteApp').directive("decoyForCheckboxGroup", function() {
    return {
        restrict: "A",         
        require: "ngModel",
         
        link: function(scope, element, attributes, ngModel) {
            ngModel.$validators.atLeastOneCheckboxIsChecked = function(modelValue) {  
                console.log("decoy validator is called");                
                console.log(modelValue);      
                if(modelValue){
                  return true;
                }
                return false;
            }
        }
    };
});
angular.module('opensrpSiteApp').directive('usernameAvailable', function($q, $http,OPENSRP_WEB_BASE_URL) {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, elm, attr, model) { 
      model.$asyncValidators.usernameExists = function(modelValue, viewValue) { 
        console.log("modelValue " + modelValue + " -- viewValue " + + viewValue)
        console.log(elm);
        console.log(attr);
        console.log("attr.ngDisabled " + attr.ngDisabled + " --- attr.disabled " + attr.disabled);
        console.log(model);
        console.log("inside asyncValidator directive with username- " + model.$viewValue);

        var url = OPENSRP_WEB_BASE_URL + "/valid-username?userName=" + model.$viewValue;
        scope.addUser.user_name.$setValidity("usernameAlreadyTaken", true);
        return $http.get(url).success(function (data) {          
          attr.$observe('disabled', function(value){
            console.log("if the elem with usernameAvailable is disabled " + value);
            if(value){
              model.$setValidity('usernameExists', true); 
            }
            else{
              console.log("received response- " + data);   
              if(data == "1"){
                model.$setValidity('usernameExists  ', true); 
                console.log("inside valid userName");  
              }
              else{
                console.log("inside username already taken section");
                scope.addUser.user_name.$setValidity("usernameAlreadyTaken", false);
              }      
            }
          });   
          
        });   
      };
    }
  } 
});

  