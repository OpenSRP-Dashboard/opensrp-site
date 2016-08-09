'use strict';

/**
 * @ngdoc function
 * @name opensrpSiteApp.controller:HhRegisterControllerCtrl
 * @description
 * # HhRegisterControllerCtrl
 * Controller of the opensrpSiteApp
 */
angular.module('opensrpSiteApp')
 .controller('csvexportCtrl', function ($scope,$rootScope,$http,page,csvexport,mapboxService,AclService,$filter,Common, OPENSRP_WEB_BASE_URL) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
 
    $scope.forms = ['NEW HOUSEHOLD FORM', 'CENSUS FORM', 'PSRF FORM', 'MIS CENSUS FORM', 'MIS ELCO FORM'];

    var today = new Date();

    var btimeMonth = today.getMonth();

      btimeMonth = btimeMonth + 1;

      btimeMonth =  btimeMonth < 10 ? '0' + btimeMonth : '' + btimeMonth;

      var btimeDay = today.getDate();

      btimeDay =  btimeDay < 10 ? '0' + btimeDay : '' + btimeDay;

      $scope.btime = today.getFullYear()+'-'+btimeMonth+'-'+btimeDay;

    $scope.dataexport = function (date, form) {
      console.log(date);
      console.log(form);

     var stratMonth = date.startDate._d.getMonth();
     stratMonth = stratMonth  + 1;

      stratMonth =  stratMonth < 10 ? '0' + stratMonth : '' + stratMonth;

      var startDay = date.startDate._d.getDate();

      startDay =  startDay < 10 ? '0' + startDay : '' + startDay;

      var endMonth = date.endDate._d.getMonth();
      endMonth = endMonth + 1;

      endMonth =  endMonth < 10 ? '0' + endMonth : '' + endMonth;

      $scope.start = date.startDate._d.getFullYear()+'-'+stratMonth+'-'+startDay;

      var endDay = date.endDate._d.getDate();

      endDay =  endDay < 10 ? '0' + endDay : '' + endDay;

      $scope.end = date.endDate._d.getFullYear()+'-'+endMonth+'-'+endDay;

      console.log($scope.start);
      console.log($scope.end);

      var maxMonth = today.getMonth();

      maxMonth = maxMonth + 1;

      maxMonth =  maxMonth < 10 ? '0' + maxMonth : '' + maxMonth;

      var maxDay = today.getDate();

      maxDay =  maxDay < 10 ? '0' + maxDay : '' + maxDay;

      $scope.max = today.getFullYear()+'-'+maxMonth+'-'+maxDay;
      console.log($scope.max);

      if(angular.equals($scope.start, $scope.max) && angular.equals($scope.end, $scope.max)){
        console.log("No date selected");

        var replaceMonth = today.getMonth();

        replaceMonth = replaceMonth - 2;

        replaceMonth =  replaceMonth < 10 ? '0' + replaceMonth : '' + replaceMonth;

        var replaceDay = today.getDate();

        replaceDay =  replaceDay < 10 ? '0' + replaceDay : '' + replaceDay;

        $scope.start = today.getFullYear()+'-'+replaceMonth+'-'+replaceDay;
        
        console.log($scope.start);
      }      

      if(form.localeCompare("NEW HOUSEHOLD FOR") == 0)
        csvexport.HHDATAEXPORT($scope);
      else if (form.localeCompare("CENSUS FOR") == 0) 
        csvexport.CENCUSDATAEXPORT($scope);
      else if (form.localeCompare("PSRF FOR") == 0)
        csvexport.PWDATAEXPORT($scope);
      else if (form.localeCompare("MIS CENSUS FOR") == 0)
        csvexport.MISCENSUSDATAEXPORT($scope);
      else if (form.localeCompare("MIS ELCO FOR") == 0) 
        csvexport.MISELCODATAEXPORT($scope);
      else ;

    }

});