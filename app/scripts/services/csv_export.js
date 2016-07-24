'use strict';

/**
 * @ngdoc service
 * @name opensrpSiteApp.hhRegisterService
 * @description
 * # hhRegisterService
 * Service in the opensrpSiteApp.
 */
angular.module('opensrpSiteApp')
  .service('csvexport', function ($http,$rootScope,page,Base64,OPENSRP_WEB_BASE_URL,filterFilter,Common) {     
        

    this.HHDATAEXPORT= function($scope){
        var allData = null;
        var apiURLs = OPENSRP_WEB_BASE_URL+"/registers/household?start-date="+$scope.start+"&end-date="+$scope.end;
        var getData = $http.get(apiURLs, { cache: true}).success(function (data) {            
            allData = data.hhRegisterEntries;         
            $("#wait").css("display","none");
            $("#export").css("display","block");
            page.downloadHH(allData,"New Household Registration Form");
        });    
    };
    
    this.PWDATAEXPORT= function($scope){
        var allData = null;
        var apiURLs = OPENSRP_WEB_BASE_URL+"/registers/elco?start-date="+$scope.start+"&end-date="+$scope.end;
        var getData = $http.get(apiURLs, { cache: true}).success(function (data) {            
            allData = data.ecRegisterEntries;         
            $("#wait").css("display","none");
            $("#export").css("display","block");
            page.downloadpw(allData,"PSRF Form");
        });  
    };
    //adding function in $rootscope makes it available everywhere
    this.CENCUSDATAEXPORT= function($scope){
        var allData = null;
        var apiURLs = OPENSRP_WEB_BASE_URL+"/registers/household?start-date="+$scope.start+"&end-date="+$scope.end;
        var getData = $http.get(apiURLs, { cache: true}).success(function (data) {            
            allData = data.hhRegisterEntries;         
            $("#wait").css("display","none");
            $("#export").css("display","block");
            page.downloadCS(allData,"Census New Women Registration Form");
        });  
    };

    this.MISCENSUSDATAEXPORT= function($scope){
        var allData = null;
        var apiURLs = OPENSRP_WEB_BASE_URL+"/registers/elco?start-date="+$scope.start+"&end-date="+$scope.end;
        var getData = $http.get(apiURLs, { cache: true}).success(function (data) {            
            allData = data.ecRegisterEntries;         
            $("#wait").css("display","none");
            $("#export").css("display","block");
            page.downloadMC(allData,"MIS CENSUS FORM");
        });       
    };

    this.MISELCODATAEXPORT= function($scope){
        var allData = null;
        var apiURLs = OPENSRP_WEB_BASE_URL+"/registers/elco?start-date="+$scope.start+"&end-date="+$scope.end;
        var getData = $http.get(apiURLs, { cache: true}).success(function (data) {            
            allData = data.ecRegisterEntries;         
            $("#wait").css("display","none");
            $("#export").css("display","block");
            page.downloadME(allData,"MIS ELCO FORM");
        });   
    };

  });
