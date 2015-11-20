'use strict';

/**
 * @ngdoc function
 * @name opensrpSiteApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the opensrpSiteApp
 */
angular.module('opensrpSiteApp')
  .controller('MainCtrl', function ($scope,$http,$rootScope,ngDialog,Main,page) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.clickToOpen = function () {
        ngDialog.open({
          template: '<p>my template</p>',
          plain: true
      });
    };
    
    console.log(Main);
    $scope.elco = Main.Data()[1].data;    
    page.reportThisMonth($scope,$scope.elco,$rootScope,'details.WomanREGDATE','thisMonthEC');
    page.reportThisWeek($scope,$scope.elco,$rootScope,'details.WomanREGDATE','thisWeekEC');
    page.reportToday($scope,$scope.elco,$rootScope,'details.WomanREGDATE','todayEC');
    console.log( Main.Data());
    $scope.hh = Main.Data()[0].data;    
    page.reportThisMonth($scope,$scope.hh,$rootScope,'FWNHREGDATE','thisMonthHH');
    page.reportThisWeek($scope,$scope.hh,$rootScope,'FWNHREGDATE','thisWeekHH');
    page.reportToday($scope,$scope.hh,$rootScope,'FWNHREGDATE','todayHH');
    
       
   /* var hhCount = $scope.hh.length;
    var hhLenght =hhCount.split("");
   console.log(hhCount);
    */
    
  });
