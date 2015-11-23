'use strict';

/**
 * @ngdoc overview
 * @name expressAngularAppApp
 * @description
 * # expressAngularAppApp
 *
 * Main module of the application.
 */
angular
  .module('opensrpSiteApp', ['ngBootstrap','ngAnimate','ngCookies','ngResource','ngRoute','angular-momentjs','ngSanitize','ngTouch','ui.bootstrap','ngDialog','angular-mapbox','nvd3','chart.js'])
  .constant('AUTH_URL', 'http://192.168.21.167:1337/27.147.129.50:9979/authenticate-user')
  .constant('OPENSRP_WEB_BASE_URL', 'http://192.168.21.246:1234/192.168.21.246:9979')
  .constant("HH_REGISTER_ENTRY_URL_API",'27.147.129.50:9979/registers/hh?anm-id=')
  .constant("ELCO_REGISTER_ENTRY_URL_API",'27.147.129.50:9979/registers/ec?anm-id=')
  .constant("CORS_PROXY_URL",'http://hp:1337/')
  
  .config(['$httpProvider', function ($httpProvider) {           
      $httpProvider.defaults.cache = true;
  }])
  .config(function ($routeProvider,$locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
        
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/acl', {
        templateUrl: 'views/acl.html',
        controller: 'AclCtrl',
        controllerAs: 'acl',       
        
      })
      .when('/hh', {
        templateUrl: 'views/hh.html',
        controller: 'HhCtrl',
        controllerAs: 'hh',
        resolve:{ 'HHServiceData':function(HHRegisterService){ return HHRegisterService.promise;}
        }
        
      })
      .when('/ec', {
        templateUrl: 'views/ec.html',
        controller: 'EcCtrl',
        controllerAs: 'ec',
        resolve:{ 'ElcoServiceData':function(ElcoRegisterService){ return ElcoRegisterService.promise;}
        }
        
      })
      .when('/pw', {
        templateUrl: 'views/pw.html',
        controller: 'PwCtrl',
        controllerAs: 'pw',       
        
      })
      .when('/role', {
        templateUrl: 'views/role.html',
        controller: 'RoleCtrl',
        controllerAs: 'role'
      })
      .when('/role/:param', {
        templateUrl: 'views/role.html',
        controller: 'RoleCtrl',
        controllerAs: 'role'
      })
      .when('/user-assign', {
        templateUrl: 'views/user.html',
        controller: 'UserCtrl',
        controllerAs: 'addacl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/logout', {
        templateUrl: 'views/login.html',
        controller: 'LogoutCtrl',
        controllerAs: 'logout'
      })
       .when('/households', {
        templateUrl: 'views/households.html',
        controller: 'HouseholdCtrl',
        controllerAs: 'household',
        resolve:{ 'HHServiceData':function(HHRegisterService){ return HHRegisterService.promise;}
        }
      })
       .when('/elcos', {
        templateUrl: 'views/elcos.html',
        controller: 'ElcoCtrl',
        controllerAs: 'elco',
        resolve:{ 'ElcoServiceData':function(ElcoRegisterService){ return ElcoRegisterService.promise;}
        }
      }).when('/fwa-performance', {
        templateUrl: 'views/fwa-performance.html',
        controller: 'FwaPerformanceCtrl',
        controllerAs: 'fwaperformance',
        resolve:{ 'FWAPerformanceData':function(FWAPerformanceService){ return FWAPerformanceService.promise;}
        }
      })
      .otherwise({
        redirectTo: '/'
      });
      //$locationProvider.html5Mode(true);
  })  
  .run(function ($rootScope, $location, $window, Authentication, $http,$q,Base64,OPENSRP_WEB_BASE_URL,page) {
      'use strict';

      $rootScope.$on('$locationChangeStart', function () {
          if (!Authentication.isAuthenticated()) {
              //evt.preventDefault();
              $location.path('/login');
              if (!$rootScope.$$phase) {
                  //this will kickstart angular if to notice the change
                  $rootScope.$apply();
              }
              else {
                  $window.location = '/#/login';
              }
              delete $http.defaults.headers.common['X-Requested-With'];
              delete $http.defaults.headers.common.Authorization;
          }
         
      });
      
      $rootScope.HHDATAEXPORT= function(){
        $("#export").css("display","none");
        $("#wait").css("display","block");       
        var url = OPENSRP_WEB_BASE_URL+"/registers/hh?anm-id="+$rootScope.username;
          $rootScope.Data = '';
          $.ajax({
            async:false,		   
            dataType: "json",
            cache:true,
            beforeSend: function (xhr) {
                xhr.setRequestHeader ("Authorization", "Basic " + btoa($rootScope.username + ":" + $rootScope.password));
            },
            url:url,
              success:function (data) {
                window.HhData = data.hhRegisterEntries;
                $("#wait").css("display","none");
                $("#export").css("display","block");
               page.downloadHH(window.HhData,"Household form");
            },
            type:"get"				
          });
        
      }
      $rootScope.PWDATAEXPORT= function(){
        $("#wait").css("display","block");
        $("#export").css("display","none");
        var url = OPENSRP_WEB_BASE_URL+"/registers/ec?anm-id="+$rootScope.username;
          $rootScope.Data = '';
          $.ajax({
            async:false,		   
            dataType: "json",
            cache:true,
            beforeSend: function (xhr) {
                xhr.setRequestHeader ("Authorization", "Basic " + btoa($rootScope.username + ":" + $rootScope.password));
            },
            url:url,
              success:function (data) {
                window.ecData = data.ecRegisterEntries;                
                $("#wait").css("display","none");
                $("#export").css("display","block");
               page.downloadpw( window.ecData,"Psfr form");
            },
            type:"get"				
          });
        
      }
      $rootScope.CENCUSDATAEXPORT= function(){
       $("#export").css("display","none");
        $("#wait").css("display","block");       
        var url = OPENSRP_WEB_BASE_URL+"/registers/hh?anm-id="+$rootScope.username;
          $rootScope.Data = '';
          $.ajax({
            async:false,		   
            dataType: "json",
            cache:true,
            beforeSend: function (xhr) {
                xhr.setRequestHeader ("Authorization", "Basic " + btoa($rootScope.username + ":" + $rootScope.password));
            },
            url:url,
              success:function (data) {
                window.HhData = data.hhRegisterEntries;
                $("#wait").css("display","none");
                $("#export").css("display","block");
               page.downloadCS(window.HhData,"Census form");
            },
            type:"get"				
          });
        
      }
      
  
   
  });
/*_.mixin(_.str.exports());*/
