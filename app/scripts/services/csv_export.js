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
        

    this.HHDATAEXPORT= function($scope,$rootScope){
      $rootScope.loading=true;
        var allData = null;
        var apiURLs = OPENSRP_WEB_BASE_URL+"/registers/household?start-date="+$scope.start+"&end-date="+$scope.end;
        var getData = $http.get(apiURLs, { cache: true}).success(function (data) {            
            allData = data.hhRegisterEntries;         
            $("#wait").css("display","none");
            $("#export").css("display","block");
            page.downloadHH(allData,"New Household Registration Form");
            $rootScope.loading=false;  
        });  
    };
    
    this.PWDATAEXPORT= function($scope){
      $rootScope.loading=true;
        var allData = null;
        var apiURLs = OPENSRP_WEB_BASE_URL+"/registers/elco?start-date="+$scope.start+"&end-date="+$scope.end;
        var getData = $http.get(apiURLs, { cache: true}).success(function (data) {            
            allData = data.ecRegisterEntries;         
            $("#wait").css("display","none");
            $("#export").css("display","block");
            page.downloadpw(allData,"PSRF Form");
            $rootScope.loading=false;
        });  
    };
    //adding function in $rootscope makes it available everywhere
    this.CENCUSDATAEXPORT= function($scope){
      $rootScope.loading=true;
        var allData = null;
        var apiURLs = OPENSRP_WEB_BASE_URL+"/registers/household?start-date="+$scope.start+"&end-date="+$scope.end;
        var getData = $http.get(apiURLs, { cache: true}).success(function (data) {            
            allData = data.hhRegisterEntries;         
            $("#wait").css("display","none");
            $("#export").css("display","block");
            page.downloadCS(allData,"Census New Women Registration Form");
            $rootScope.loading=false;
        });  
    };

    this.MISCENSUSDATAEXPORT= function($scope){
      $rootScope.loading=true;
        var allData = null;
        var apiURLs = OPENSRP_WEB_BASE_URL+"/registers/elco?start-date="+$scope.start+"&end-date="+$scope.end;
        var getData = $http.get(apiURLs, { cache: true}).success(function (data) {            
            allData = data.ecRegisterEntries;         
            $("#wait").css("display","none");
            $("#export").css("display","block");
            page.downloadMC(allData,"MIS CENSUS FORM");
            $rootScope.loading=false;
        });       
    };

    this.MISELCODATAEXPORT= function($scope){
      $rootScope.loading=true;
        var allData = null;
        var apiURLs = OPENSRP_WEB_BASE_URL+"/registers/elco?start-date="+$scope.start+"&end-date="+$scope.end;
        var getData = $http.get(apiURLs, { cache: true}).success(function (data) {            
            allData = data.ecRegisterEntries;         
            $("#wait").css("display","none");
            $("#export").css("display","block");
            page.downloadME(allData,"MIS ELCO FORM");
            $rootScope.loading=false;
        });   
    };


    this.ANC1DATAEXPORT= function($scope){
      $rootScope.loading=true;
        var allData = null;
        var apiURLs = OPENSRP_WEB_BASE_URL+"/registers/anc?start-date="+$scope.start+"&end-date="+$scope.end;
        var getData = $http.get(apiURLs, { cache: true}).success(function (data) {            
            allData = data.ancRegisterEntries;         
            $("#wait").css("display","none");
            $("#export").css("display","block");
            page.downloadANC1(allData,"ANC1 FORM");
            $rootScope.loading=false;
        });   
    };

    this.ANC2DATAEXPORT= function($scope){
      $rootScope.loading=true;
        var allData = null;
        var apiURLs = OPENSRP_WEB_BASE_URL+"/registers/anc?start-date="+$scope.start+"&end-date="+$scope.end;
        var getData = $http.get(apiURLs, { cache: true}).success(function (data) {            
            allData = data.ancRegisterEntries;         
            $("#wait").css("display","none");
            $("#export").css("display","block");
            page.downloadANC2(allData,"ANC2 FORM");
            $rootScope.loading=false;
        });   
    };

    this.ANC3DATAEXPORT= function($scope){
      $rootScope.loading=true;
        var allData = null;
        var apiURLs = OPENSRP_WEB_BASE_URL+"/registers/anc?start-date="+$scope.start+"&end-date="+$scope.end;
        var getData = $http.get(apiURLs, { cache: true}).success(function (data) {            
            allData = data.ancRegisterEntries;         
            $("#wait").css("display","none");
            $("#export").css("display","block");
            page.downloadANC3(allData,"ANC3 FORM");
            $rootScope.loading=false;
        });   
    };

    this.ANC4DATAEXPORT= function($scope){
      $rootScope.loading=true;
        var allData = null;
        var apiURLs = OPENSRP_WEB_BASE_URL+"/registers/anc?start-date="+$scope.start+"&end-date="+$scope.end;
        var getData = $http.get(apiURLs, { cache: true}).success(function (data) {            
            allData = data.ancRegisterEntries;         
            $("#wait").css("display","none");
            $("#export").css("display","block");
            console.log("service");
            page.downloadANC4(allData,"ANC4 FORM");
            $rootScope.loading=false;
        });   
    };

    this.PNC1DATAEXPORT= function($scope){
      $rootScope.loading=true;
        var allData = null;
        var apiURLs = OPENSRP_WEB_BASE_URL+"/registers/elco?start-date="+$scope.start+"&end-date="+$scope.end;
        var getData = $http.get(apiURLs, { cache: true}).success(function (data) {            
            allData = data.ecRegisterEntries;         
            $("#wait").css("display","none");
            $("#export").css("display","block");
            page.downloadPNC1(allData,"PNC1 FORM");
            $rootScope.loading=false;
        });   
    };

    this.PNC2DATAEXPORT= function($scope){
      $rootScope.loading=true;
        var allData = null;
        var apiURLs = OPENSRP_WEB_BASE_URL+"/registers/elco?start-date="+$scope.start+"&end-date="+$scope.end;
        var getData = $http.get(apiURLs, { cache: true}).success(function (data) {            
            allData = data.ecRegisterEntries;         
            $("#wait").css("display","none");
            $("#export").css("display","block");
            page.downloadPNC2(allData,"PNC2 FORM");
            $rootScope.loading=false;
        });   
    };

    this.PNC3DATAEXPORT= function($scope){
      $rootScope.loading=true;
        var allData = null;
        var apiURLs = OPENSRP_WEB_BASE_URL+"/registers/elco?start-date="+$scope.start+"&end-date="+$scope.end;
        var getData = $http.get(apiURLs, { cache: true}).success(function (data) {            
            allData = data.ecRegisterEntries;         
            $("#wait").css("display","none");
            $("#export").css("display","block");
            page.downloadPNC3(allData,"PNC3 FORM");
            $rootScope.loading=false;
        });   
    };

    this.BNFDATAEXPORT= function($scope){
      $rootScope.loading=true;
        var allData = null;
        var apiURLs = OPENSRP_WEB_BASE_URL+"/registers/elco?start-date="+$scope.start+"&end-date="+$scope.end;
        var getData = $http.get(apiURLs, { cache: true}).success(function (data) {            
            allData = data.ecRegisterEntries;         
            $("#wait").css("display","none");
            $("#export").css("display","block");
            page.downloadBNF(allData,"BNF FORM");
            $rootScope.loading=false;
        });   
    };

    this.ENCC1DATAEXPORT= function($scope){
      $rootScope.loading=true;
        var allData = null;
        var apiURLs = OPENSRP_WEB_BASE_URL+"/registers/child?start-date="+$scope.start+"&end-date="+$scope.end;
        var getData = $http.get(apiURLs, { cache: true}).success(function (data) {            
            allData = data.ecRegisterEntries;         
            $("#wait").css("display","none");
            $("#export").css("display","block");
            page.downloadENCC1(allData,"ENCC1 FORM");
            $rootScope.loading=false;
        });   
    };

    this.ENCC2DATAEXPORT= function($scope){
      $rootScope.loading=true;
        var allData = null;
        var apiURLs = OPENSRP_WEB_BASE_URL+"/registers/child?start-date="+$scope.start+"&end-date="+$scope.end;
        var getData = $http.get(apiURLs, { cache: true}).success(function (data) {            
            allData = data.ecRegisterEntries;         
            $("#wait").css("display","none");
            $("#export").css("display","block");
            page.downloadENCC2(allData,"ENCC2 FORM");
            $rootScope.loading=false;
        });   
    };

    this.ENCC3DATAEXPORT= function($scope){
      $rootScope.loading=true;
        var allData = null;
        var apiURLs = OPENSRP_WEB_BASE_URL+"/registers/child?start-date="+$scope.start+"&end-date="+$scope.end;
        var getData = $http.get(apiURLs, { cache: true}).success(function (data) {            
            allData = data.ecRegisterEntries;         
            $("#wait").css("display","none");
            $("#export").css("display","block");
            page.downloadENCC3(allData,"ENCC3 FORM");
            $rootScope.loading=false;
        });   
    };

  });
