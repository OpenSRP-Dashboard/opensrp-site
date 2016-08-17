'use strict';

/**
 * @ngdoc function
 * @name opensrpSiteApp.controller:EcCtrl
 * @description
 * # EcCtrl
 * Controller of the opensrpSiteApp
 */
angular.module('opensrpSiteApp')
  .controller('PrivilegeCtrl', function ($scope,$http,$rootScope,page,EC,Common,$routeParams,$timeout,AclService,$location,$filter,privilegeService,OPENSRP_WEB_BASE_URL,$window,Flash) {
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

    var id = $routeParams.id;
    if (id) {
      $scope.id= id;
      $rootScope.loading = true;
      privilegeService.privilegeById($scope,$rootScope,$timeout,id);        
      
      $scope.edit= function(){
         console.log($scope.formData);
         privilegeService.edit($scope.formData,$window,Flash,id);           
      }         
    }else if( $location.path() =='/add-privilege' ){  
      $scope.save = function() {
        privilegeService.save($scope.formData,$window,Flash, $location);
      };
    }else{
      privilegeService.allPrivileges($scope, $rootScope);
    }    
  });
