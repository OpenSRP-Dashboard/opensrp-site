'use strict';

/**
 * @ngdoc function
 * @name opensrpSiteApp.controller:EcCtrl
 * @description
 * # EcCtrl
 * Controller of the opensrpSiteApp
 */
angular.module('opensrpSiteApp')
  .controller('TestCtrl', function ($scope,$http,$rootScope,page,EC,Common,AclService, $filter) {
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
  });
