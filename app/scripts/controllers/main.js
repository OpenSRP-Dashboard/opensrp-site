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
    var elcoData = $http.get(apiURLs, { cache: true}).success(function (data) {            
        
    });
        
  
    var hhUrl = OPENSRP_WEB_BASE_URL+"/registers/hh?anm-id="+$rootScope.username;
    var ecUrl = OPENSRP_WEB_BASE_URL+"/registers/ec?anm-id="+$rootScope.username;
    Main.mainReportHH($scope,$rootScope,hhUrl,'FWNHREGDATE','thisMonthHH','thisWeekHH','todayHH');
    Main.mainReportEC($scope,$rootScope,ecUrl,'WomanREGDATE','thisMonthEC','thisWeekEC','todayEC');
     $scope.HHDATA = function(){     
      page.downloadHH(HhData,'Household Report');
    }
      
  });
