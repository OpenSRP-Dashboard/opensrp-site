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
        

    this.HHDATAEXPORT= function(){
        var allData = null;
        var apiURLs = OPENSRP_WEB_BASE_URL+"/registers/househol?start-date=2016-05-15&end-date=2016-06-16";
        var getData = $http.get(apiURLs, { cache: true}).success(function (data) {            
            allData = data.hhRegisterEntries;         
            $("#wait").css("display","none");
            $("#export").css("display","block");
            page.downloadHH(allData,"New Household Registration form");
        });    
    };
    
    this.PWDATAEXPORT= function(){
        var allData = null;
        var apiURLs = OPENSRP_WEB_BASE_URL+"/registers/elc?start-date=2016-05-15&end-date=2016-06-16";
        var getData = $http.get(apiURLs, { cache: true}).success(function (data) {            
            allData = data.ecRegisterEntries;         
            $("#wait").css("display","none");
            $("#export").css("display","block");
            page.downloadpw(allData,"PSRF form");
        });  
    };
    //adding function in $rootscope makes it available everywhere
    this.CENCUSDATAEXPORT= function(){
        var allData = null;
        var apiURLs = OPENSRP_WEB_BASE_URL+"/registers/househol?start-date=2016-05-15&end-date=2016-06-16";
        var getData = $http.get(apiURLs, { cache: true}).success(function (data) {            
            allData = data.hhRegisterEntries;         
            $("#wait").css("display","none");
            $("#export").css("display","block");
            page.downloadCS(allData,"Census New Women Registration form");
        });  
    };

    this.MISCENSUSDATAEXPORT= function(){
        var allData = null;
        var apiURLs = OPENSRP_WEB_BASE_URL+"/registers/elc?start-date=2016-05-15&end-date=2016-06-16";
        var getData = $http.get(apiURLs, { cache: true}).success(function (data) {            
            allData = data.ecRegisterEntries;         
            $("#wait").css("display","none");
            $("#export").css("display","block");
            page.downloadMC(allData,"MIS CENSUS FORM");
        });       
    };

    this.MISELCODATAEXPORT= function(){
        var allData = null;
        var apiURLs = OPENSRP_WEB_BASE_URL+"/registers/elc?start-date=2016-05-15&end-date=2016-06-16";
        var getData = $http.get(apiURLs, { cache: true}).success(function (data) {            
            allData = data.ecRegisterEntries;         
            $("#wait").css("display","none");
            $("#export").css("display","block");
            page.downloadME(allData,"MIS ELCO FORM");
        });   
    };

  });
