'use strict';

/**
 * @ngdoc service
 * @name opensrpSiteApp.hhRegisterService
 * @description
 * # hhRegisterService
 * Service in the opensrpSiteApp.
 */
angular.module('opensrpSiteApp')
  .service('csvexport', function ($http,$rootScope,$q,page,Base64,OPENSRP_WEB_BASE_URL,filterFilter,Common) {     
        

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


    this.export= function($scope,formName){
        $rootScope.loading=true;
        var allData = null;

        
        var exportUrl = OPENSRP_WEB_BASE_URL+"/export?formName="+formName+"&start_date="+$scope.start+"&end_date="+$scope.end+"&user="+$rootScope.username;
        var deferred = $q.defer();
        var exportSend = $http.get(exportUrl, { cache: false});
                     
          // search data
        $q.all([exportSend]).then(function(results){           
            
            var apiURLs = OPENSRP_WEB_BASE_URL+"/all-export?user="+$rootScope.username;
            var deferred = $q.defer();
            var campDateList = $http.get(apiURLs, { cache: false});  
            $q.all([campDateList]).then(function(results){           
                $scope.data = results[0].data;
                console.log("okkkkkkkkkk");
                console.log($scope.data);
            });
        });

        
    };

    
  });
