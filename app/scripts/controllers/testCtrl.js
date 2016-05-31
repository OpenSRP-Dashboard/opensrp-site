'use strict';

/**
 * @ngdoc function
 * @name opensrpSiteApp.controller:EcCtrl
 * @description
 * # EcCtrl
 * Controller of the opensrpSiteApp
 */
angular.module('opensrpSiteApp')
  .controller('TestCtrl', function ($scope,$http,$rootScope,page,EC,Common,AclService, $filter,testService,OPENSRP_WEB_BASE_URL) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
     $scope.detailDataLink =
     ' <a href="#/elcos">'+
     '<i class="glyphicon glyphicon-list-alt"></i>'+
    ' <span>Data Details</span>'+
    '</a>';
    $scope.can = AclService.can;
    
    $scope.friends = [
      {name:'John', age:25, gender:'boy'},
      {name:'Jessie', age:30, gender:'girl'},
      {name:'Johanna', age:28, gender:'girl'},
      {name:'Joy', age:15, gender:'girl'},
      {name:'Mary', age:28, gender:'girl'},
      {name:'Peter', age:95, gender:'boy'},
      {name:'Sebastian', age:50, gender:'boy'},
      {name:'Erika', age:27, gender:'girl'},
      {name:'Patrick', age:40, gender:'boy'},
      {name:'Samantha', age:60, gender:'girl'}
    ];
    
    $scope.users = testService.Data($scope);
    $scope.hashingDone = 0;
    /*var Users = $http.get(couchUrl, { 
          cache: true, 
          withCredentials: false,
          headers: {
            'Authorization' : ''
          }
        })
        .success(function (data) { 
          $scope.users = data.rows;
          console.log("users populated");
    });*/
    $scope.accessList = ['Household', 'Household Details', 'Elco', 'Elco Details','PW','PW Details','Data Export','User List','User Assign','User Assign Edit','Role Edit','Add Role','Acl','Add Rule','Edit Rule','Rule List'];
    $scope.save = function() {
      console.log($scope.formData);
      //Role.save($scope.formData,$window,Flash);
      var apiURLs = OPENSRP_WEB_BASE_URL+"/add-privilege";       
      $http.post(apiURLs, $scope.formData).success(function (data) {
        /*$("#submit").html("Submit");
         $('#submit').prop('disabled', false);*/
        if (data == 1) {            
          /*var message = '<strong>Successfully created a role. </strong> ';
          Flash.create('success', message, 'custom-class');
          $window.location = '/#/acl';*/
          console.log("returned 1");
        }else if (data == 2) {
          /*$("#message").html("<p class='lead'>This role already exists</p>");
          $( "#message" ).delay(3000).fadeOut( "slow" );*/
          console.log("returned 2");
        }else{
           /*$("#message").html("<p class='lead'>Failed to create role</p>");
          $( "#message" ).delay(3000).fadeOut( "slow" );*/
          console.log("returned 0");
        }
        
      });
    }

    $scope.getDescendants = function(userId){
      var descendants = [];      
      var hashedUsers = [];
      var queue = [];
      if($scope.hashingDone == 0){
        for(var i =0 ; i < $scope.users.length; i++){
          hashedUsers[$scope.users[i].id] = $scope.users[i].value;
        }
        $scope.hashedUsers = hashedUsers;  
        $scope.hashingDone = 1;
      }
      
      var selected = $scope.hashedUsers[userId];
      console.log(selected);
      if(selected.Hierarchy.users.length > 0){
        for(var i = 0; i< selected.Hierarchy.users.length; i++){
          descendants.push(selected.Hierarchy.users[i]);
          queue.push($scope.hashedUsers[selected.Hierarchy.users[i].id]);
        }
      }
      else{
        console.log("No descendants for given user - " + selected.name);
        return ;
      }

      while(queue.length > 0){
        var currentUser = queue.shift();
        for(var i = 0; i< currentUser.Hierarchy.users.length; i++){
          descendants.push(currentUser.Hierarchy.users[i]);
          queue.push($scope.hashedUsers[currentUser.Hierarchy.users[i].id]);
        }
      }
      console.log(descendants);
      return;
    }
  });
