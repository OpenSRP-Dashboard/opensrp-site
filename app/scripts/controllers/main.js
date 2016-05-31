'use strict';

/**
 * @ngdoc function
 * @name opensrpSiteApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the opensrpSiteApp
 */
angular.module('opensrpSiteApp')
  .controller('MainCtrl', function ($scope,$http,$rootScope,$q,Base64,OPENSRP_WEB_BASE_URL,mapboxService,ngDialog,Main,page,AclService,$timeout) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.can = AclService.can;
    $scope.clickToOpen = function () {
        ngDialog.open({
          template: '<p>my template</p>',
          plain: true
      });
    };
    //mapboxService.init({ accessToken: 'pk.eyJ1IjoicHJvYmlyMTIzIiwiYSI6IjhwRDJyZ0EifQ.KzOVb_vdS3CMYzUKMww59g' });
   
    /**
    Houshold list for map data
    */
    //Main.houseHoldList($scope,$rootScope,$timeout);
    
    /*$scope.HHDATA = function(){     
      page.downloadHH(HhData,'Household Report');
    }*/
    Main.dataCount($scope);
    $scope.mySplit = function(string, nb) {
      var array = string.split(' ');
      return array[nb];
    } 
  });
