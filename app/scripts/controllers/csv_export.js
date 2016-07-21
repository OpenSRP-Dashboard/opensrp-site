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

    $scope.maxDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

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

      var endDay = date.endDate._d.getDate() - 1;

      endDay =  endDay < 10 ? '0' + endDay : '' + endDay;

      $scope.end = date.endDate._d.getFullYear()+'-'+endMonth+'-'+endDay;

      console.log($scope.start);
      console.log($scope.end);

      if(form.localeCompare("NEW HOUSEHOLD") == 0)
        csvexport.HHDATAEXPORT($scope);
      else if (form.localeCompare("CENSUS") == 0) 
        csvexport.CENCUSDATAEXPORT($scope);
      else if (form.localeCompare("PSRF") == 0)
        csvexport.PWDATAEXPORT($scope);
      else if (form.localeCompare("MIS CENSUS") == 0)
        csvexport.MISCENSUSDATAEXPORT($scope);
      else if (form.localeCompare("MIS ELCO") == 0) 
        csvexport.MISELCODATAEXPORT($scope);
      else ;

    }

});