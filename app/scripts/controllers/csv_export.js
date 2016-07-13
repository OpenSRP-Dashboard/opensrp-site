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
  $scope.detailDataLink =
     ' <a href="#/households">'+
     '<i class="glyphicon glyphicon-list-alt"></i>'+
    ' <span>Data Details</span>'+
    '</a>';
 
    $scope.forms = ['NEW HOUSEHOLD FORM', 'CENSUS FORM', 'PSRF FORM', 'MIS CENSUS FORM', 'MIS ELCO FORM'];

    $scope.selectedItem;

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

      var start = date.startDate._d.getFullYear()+'-'+stratMonth+'-'+startDay;

      var endDay = date.endDate._d.getDate();

      endDay =  endDay < 10 ? '0' + endDay : '' + endDay;

      var end = date.endDate._d.getFullYear()+'-'+endMonth+'-'+endDay;

      console.log(start);
      console.log(end);

      if(form.localeCompare("NEW HOUSEHOLD FORM") == 0)
        csvexport.HHDATAEXPORT();
      else if (form.localeCompare("CENSUS FORM") == 0) 
        csvexport.CENCUSDATAEXPORT();
      else if (form.localeCompare("PSRF FORM") == 0)
        csvexport.PWDATAEXPORT();
      else if (form.localeCompare("MIS CENSUS FORM") == 0)
        csvexport.MISCENSUSDATAEXPORT();
      else if (form.localeCompare("MIS ELCO FORM") == 0) 
        csvexport.MISELCODATAEXPORT();
      else ;

    }

});