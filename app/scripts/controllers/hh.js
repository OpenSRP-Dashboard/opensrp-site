'use strict';

/**
 * @ngdoc function
 * @name opensrpSiteApp.controller:HhCtrl
 * @description
 * # HhCtrl
 * Controller of the opensrpSiteApp
 */
angular.module('opensrpSiteApp')
  .controller('HhCtrl', function ($scope,$http,$rootScope,HHRegisterService,page) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
     $scope.detailDataLink =
     ' <a href="#/households">'+
     '<i class="glyphicon glyphicon-list-alt"></i>'+
    ' <span>Data Details</span>'+
    '</a>';
    
    $scope.data = HHRegisterService.Data();    
    var date = new Date();
    var currentMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    var firstDay = moment(currentMonth).format('YYYY-MM-DD');
    var toDay = moment(date).format('YYYY-MM-DD');    
    var previousSevenDaysDate = moment(date.setDate(date.getDate()-7)).format('YYYY-MM-DD');
    
    function thisMonth(getData,start,end){
      var queryResult= jsonsql.query("select * from getData where (TODAY >='"+start+"' && TODAY <='"+end+"' && PROVIDERID =='"+$rootScope.username+"' ) ",getData);                   
      $scope.thisMonth = queryResult.length;
    }
     console.log($scope.data);
   
    page.reportThisMonth($scope,$scope.data,$rootScope,'FWNHREGDATE','thisMonth');
    page.reportThisWeek($scope,$scope.data,$rootScope,'FWNHREGDATE','thisWeek');
    page.reportToday($scope,$scope.data,$rootScope,'FWNHREGDATE','today'); 
    //thisMonth(getData,firstDay,toDay);
    
  });
