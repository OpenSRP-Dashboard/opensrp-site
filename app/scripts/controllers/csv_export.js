'use strict';

/**
 * @ngdoc function
 * @name opensrpSiteApp.controller:HhRegisterControllerCtrl
 * @description
 * # HhRegisterControllerCtrl
 * Controller of the opensrpSiteApp
 */
angular.module('opensrpSiteApp')
 .controller('csvexportCtrl', function ($scope,$rootScope,$http,page,csvexport,AclService,$filter, OPENSRP_WEB_BASE_URL) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.forms = ['NEW HOUSEHOLD FORM', 'CENSUS FORM', 'PSRF FORM', 'MIS CENSUS FORM', 'MIS ELCO FORM', 'ANC1 FORM', 'ANC2 FORM', 'ANC3 FORM', 'ANC4 FORM', 'PNC1 FORM', 'PNC2 FORM', 'PNC3 FORM', 'BNF FORM', 'ENCC1 FORM', 'ENCC2 FORM', 'ENCC3 FORM'];

    $scope.IsVisible = false;

    $rootScope.loading = false;

    var today = new Date();

    var btimeMonth = today.getMonth();

      btimeMonth = btimeMonth + 1;

      btimeMonth =  btimeMonth < 10 ? '0' + btimeMonth : '' + btimeMonth;

      var btimeDay = today.getDate();

      btimeDay =  btimeDay < 10 ? '0' + btimeDay : '' + btimeDay;

      $scope.btime = today.getFullYear()+'-'+btimeMonth+'-'+btimeDay;

      $scope.dataex = function () {
        $scope.IsVisible = true;
      }

      $scope.dataexport = function (date, form) {

        console.log(date);

        var dateFixed = new Date(new Date().setDate(date.endDate._d.getDate() - 1));

        var enMonth = dateFixed.getMonth();
        enMonth = enMonth + 1;

        enMonth =  enMonth < 10 ? '0' + enMonth : '' + enMonth;

        var enDay = dateFixed.getDate();

        enDay =  enDay < 10 ? '0' + enDay : '' + enDay;

        $scope.en = dateFixed.getFullYear()+'-'+enMonth+'-'+enDay;

        console.log($scope.en);

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

        //endDay =  endDay - 1;

        endDay =  endDay < 10 ? '0' + endDay : '' + endDay;

        $scope.end = date.endDate._d.getFullYear()+'-'+endMonth+'-'+endDay;

        console.log($scope.start);
        console.log($scope.end);

        //console.log($scope.IsVisible);

        if(angular.equals($scope.IsVisible, false))
        {
          console.log("No date selected");
          alert(" Select Date ");
        } 

        else if(typeof form == 'undefined')
        {
          console.log("No FORM selected");
          alert(" Select FORM ");
        }

        if($scope.end > $scope.btime) 
        {
            console.log("End date greater than today");
            $scope.end = $scope.btime;
        } 

        else if($scope.end < $scope.btime) 
        {

        $scope.end = $scope.en;

        console.log("End date less than today");
        console.log($scope.end);

        }


          /* if(angular.equals($scope.start, $scope.max) && angular.equals($scope.end, $scope.max)){
            console.log("No date selected");

            var replaceMonth = today.getMonth();

            replaceMonth = replaceMonth - 2;

            replaceMonth =  replaceMonth < 10 ? '0' + replaceMonth : '' + replaceMonth;

            var replaceDay = today.getDate();

            replaceDay =  replaceDay < 10 ? '0' + replaceDay : '' + replaceDay;

            $scope.start = today.getFullYear()+'-'+replaceMonth+'-'+replaceDay;
            
            console.log($scope.start);
          } */

        if(form.localeCompare("NEW HOUSEHOLD FORM") == 0){

          csvexport.HHDATAEXPORT($scope,$rootScope);
 
        }        
        else if (form.localeCompare("CENSUS FORM") == 0){

          csvexport.CENCUSDATAEXPORT($scope);

        }
        else if (form.localeCompare("PSRF FORM") == 0){

          csvexport.PWDATAEXPORT($scope);

        }
        else if (form.localeCompare("MIS CENSUS FORM") == 0){

          csvexport.MISCENSUSDATAEXPORT($scope);

        }
        else if (form.localeCompare("MIS ELCO FORM") == 0){

          csvexport.MISELCODATAEXPORT($scope);

        }
        if(form.localeCompare("ANC1 FORM") == 0){

          csvexport.ANC1DATAEXPORT($scope,$rootScope);
 
        }        
        else if (form.localeCompare("ANC2 FORM") == 0){

          csvexport.ANC2DATAEXPORT($scope);

        }
        else if (form.localeCompare("ANC3 FORM") == 0){

          csvexport.ANC3DATAEXPORT($scope);

        }
        else if (form.localeCompare("ANC4 FORM") == 0){

          csvexport.ANC4DATAEXPORT($scope);

        }
        else if (form.localeCompare("PNC1 FORM") == 0){

          csvexport.PNC1DATAEXPORT($scope);

        }
        else if (form.localeCompare("PNC2 FORM") == 0){

          csvexport.PNC2DATAEXPORT($scope);

        }
        else if (form.localeCompare("PNC3 FORM") == 0){

          csvexport.PNC3DATAEXPORT($scope);

        }
        else if (form.localeCompare("BNF FORM") == 0){

          csvexport.BNFDATAEXPORT($scope);

        }
        if(form.localeCompare("ENCC1 FORM") == 0){

          csvexport.ENCC1DATAEXPORT($scope,$rootScope);
 
        }        
        else if (form.localeCompare("ENCC2 FORM") == 0){

          csvexport.ENCC2DATAEXPORT($scope);

        }
        else if (form.localeCompare("ENCC3 FORM") == 0){

          csvexport.ENCC3DATAEXPORT($scope);

        }
        else ;

      }

});
