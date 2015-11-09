'use strict';

/**
 * @ngdoc function
 * @name opensrpSiteApp.controller:HhCtrl
 * @description
 * # HhCtrl
 * Controller of the opensrpSiteApp
 */
angular.module('opensrpSiteApp')
  .controller('HhCtrl', function ($scope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
     $scope.detailData =
     ' <a href="#/households">'+
     '<i class="glyphicon glyphicon-list-alt"></i>'+
    ' <span>Data Details</span>'+
    '</a>';
  });
