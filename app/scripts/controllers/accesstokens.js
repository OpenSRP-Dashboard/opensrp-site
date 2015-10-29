'use strict';

/**
 * @ngdoc function
 * @name opensrpSiteApp.controller:AccesstokensCtrl
 * @description
 * # AccesstokensCtrl
 * Controller of the opensrpSiteApp
 */
angular.module('opensrpSiteApp')
  .controller('AccesstokensCtrl', function ($scope,$rootScope,$routeParams,$http,accessTokens) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
   $scope.formData = {};
   $scope.createAccessTokens = function(){
    accessTokens.createAccessTokens($scope.formData);
   }
   
  });
