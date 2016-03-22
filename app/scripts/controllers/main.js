'use strict';

/**
 * @ngdoc function
 * @name opensrpSiteApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the opensrpSiteApp
 */
angular.module('opensrpSiteApp')
  .controller('MainCtrl', function ($scope,$http,$rootScope,$q,Base64,OPENSRP_WEB_BASE_URL,ngDialog,Main,page,AclService) {
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
    
   var apiURLs = OPENSRP_WEB_BASE_URL+"/registers/anc?anm-id="+$rootScope.username; 
    /*var elcoData = $http.get(apiURLs, { cache: true}).success(function (data) {       
    });*/
        
  
    var hhUrl = OPENSRP_WEB_BASE_URL+"/registers/hh?anm-id="+$rootScope.username;
    var ecUrl = OPENSRP_WEB_BASE_URL+"/registers/ec?anm-id="+$rootScope.username;
    Main.mainReportHH($scope,$rootScope,hhUrl,'TODAY');
    Main.mainReportECAndPW($scope,$rootScope,ecUrl,'TODAY');
    var elcoFromCouch = "http://192.168.21.86:1337/192.168.21.218:5984/opensrp/_design/Elco/_view/all";
    var hhFromCouch = "http://192.168.21.86:1337/192.168.21.218:5984/opensrp/_design/HouseHold/_view/all";
    Main.testFetchFromCouch(elcoFromCouch);
    Main.testFetchFromCouch(hhFromCouch);
    $scope.HHDATA = function(){     
      page.downloadHH(HhData,'Household Report');
    }
      
  });
