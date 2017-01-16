'use strict';

/**
 * @ngdoc function
 * @name opensrpSiteApp.controller:HhRegisterControllerCtrl
 * @description
 * # HhRegisterControllerCtrl
 * Controller of the opensrpSiteApp
 */
angular.module('opensrpSiteApp')
 .controller('csvexportCtrl', function ($scope,$rootScope,$http,$q,page,csvexport,AclService,$filter, OPENSRP_WEB_BASE_URL,EXPORTURL) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.EXPORTURL = EXPORTURL;
    $scope.forms = ['NEW HOUSEHOLD FORM', 'CENSUS FORM', 'PSRF FORM', 'MIS CENSUS FORM', 'MIS ELCO FORM'];

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

        var dateFixed = new Date(new Date().setDate(date.endDate._d.getDate()-1));

        var enMonth = date.endDate._d.getMonth();
        enMonth = enMonth + 1;

        enMonth =  enMonth < 10 ? '0' + enMonth : '' + enMonth;

        var enDay = dateFixed.getDate();

        enDay =  enDay < 10 ? '0' + enDay : '' + enDay;

        $scope.en = date.endDate._d.getFullYear()+'-'+enMonth+'-'+enDay;

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
            console.log($scope.end);
        } 

        if($scope.end == $scope.btime) 
        {
            console.log("End date equal to today");
            console.log($scope.end);
        }

        else if($scope.end < $scope.start) 
        {
        $scope.end = $scope.start;
        console.log("End date less than start");
        console.log($scope.end);
        }

        /*else if(endDay === "01") 
        {
        console.log("End date not changed");
        console.log($scope.end);
        }*/

        else if(endDay === "01" && enMonth==="01")
        {
          var dateFi = new Date(new Date().setDate(date.endDate._d.getDate()-1));

          var en1Month = "12";

          var en1Day = dateFixed.getDate();

          en1Day =  en1Day < 10 ? '0' + en1Day : '' + en1Day;

          $scope.en1 = date.startDate._d.getFullYear()+'-'+en1Month+'-'+en1Day;

          console.log("01::01::"+$scope.en1);

          $scope.end = $scope.en1;
        }

        else if(endDay === "01")
        {
          var en2Month = date.endDate._d.getMonth();
          en2Month = en2Month;

          en2Month =  en2Month < 10 ? '0' + en2Month : '' + en2Month;

          var en2Day;

          if(en2Month === "01" || en2Month === "03" || en2Month === "05" || en2Month === "07"
           || en2Month === "08" || en2Month === "10" || en2Month === "12"){
              en2Day = "31";
          }
          else
              en2Day = "30";          

          $scope.en2 = date.endDate._d.getFullYear()+'-'+en2Month+'-'+en2Day;

          console.log("01:::"+$scope.en2);
          
          $scope.end = $scope.en2;
        }

        else 
        {
        $scope.end = $scope.en;
        console.log("End date lessened");
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
          csvexport.export($scope,"NEW HOUSEHOLD FORM");
          //csvexport.HHDATAEXPORT($scope,$rootScope);
 
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
        else ;

      }

   
    console.log($rootScope.username);
      var apiURLs = OPENSRP_WEB_BASE_URL+"/all-export?user="+$rootScope.username;
      var deferred = $q.defer();
      var campDateList = $http.get(apiURLs, { cache: false});               
      // search data
      $q.all([campDateList]).then(function(results){           
        $scope.data = results[0].data;
        console.log("okkkkkkkkkk");
             console.log($scope.data);  
        
      });
   

});
