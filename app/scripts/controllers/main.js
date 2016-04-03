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
    mapboxService.init({ accessToken: 'pk.eyJ1IjoicHJvYmlyMTIzIiwiYSI6IjhwRDJyZ0EifQ.KzOVb_vdS3CMYzUKMww59g' });
   var apiURLs = OPENSRP_WEB_BASE_URL+"/registers/anc?anm-id="+$rootScope.username; 
    /*var elcoData = $http.get(apiURLs, { cache: true}).success(function (data) {       
    });*/
        
  
    var hhUrl = OPENSRP_WEB_BASE_URL+"/registers/hh?anm-id="+$rootScope.username;
    var ecUrl = OPENSRP_WEB_BASE_URL+"/registers/ec?anm-id="+$rootScope.username;
    //Main.mainReportHH($scope,$rootScope,hhUrl,'TODAY',$timeout);
    //Main.mainReportECAndPW($scope,$rootScope,ecUrl,'TODAY');
    
    var elcoFromCouch = "http://192.168.21.86:1337/192.168.21.218:5984/opensrp/_design/Elco/_view/all";
    var hhFromCouch = "http://192.168.21.86:1337/192.168.21.218:5984/opensrp/_design/HouseHold/_view/all";
    //Main.testFetchFromCouch(elcoFromCouch);
    //Main.testFetchFromCouch(hhFromCouch);
    Main.houseHoldList($scope,$rootScope,$timeout);
    Main.elcoCount($scope,$rootScope,$timeout);
    $scope.HHDATA = function(){     
      page.downloadHH(HhData,'Household Report');
    }
    
    $scope.mySplit = function(string, nb) {
    var array = string.split(' ');
    return array[nb];
} 
  });
