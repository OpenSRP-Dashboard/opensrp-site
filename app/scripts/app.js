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
  .module('opensrpSiteApp', ['ngBootstrap','ngAnimate','ngCookies','ngResource','ngRoute','angular-momentjs','ngSanitize','ngTouch','ui.bootstrap','ngDialog','angular-mapbox','nvd3','chart.js','checklist-model','mm.acl','flash'])
  .constant('AUTH_URL', 'http://192.168.21.167:1337/27.147.129.50:9979/authenticate-user')
  //.constant('OPENSRP_WEB_BASE_URL', 'http://192.168.21.246:1234/192.168.21.246:9979')
  .constant('OPENSRP_WEB_BASE_URL', 'http://192.168.21.218:1234/192.168.21.218:9979')
  .constant("HH_REGISTER_ENTRY_URL_API",'27.147.129.50:9979/registers/hh?anm-id=')
  .constant("ELCO_REGISTER_ENTRY_URL_API",'27.147.129.50:9979/registers/ec?anm-id=')
  .constant("CORS_PROXY_URL",'http://hp:1337/')
  .config(['AclServiceProvider', function (AclServiceProvider) {
    var myConfig = {
      storage: 'localStorage',
      storageKey: 'AppAcl'
    };
    AclServiceProvider.config(myConfig);
  }])
  .config(['AclServiceProvider', function (AclServiceProvider) {
    AclServiceProvider.resume();
  }])
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
        resolve : {
          'acl' : ['$q', 'AclService', function($q, AclService){
            if(AclService.can('Acl')){
              // Has proper permissions
              return true;
            } else {
              // Does not have permission
              return $q.reject('Unauthorized');
            
            }
          }]
        }
        
      })
      .when('/hh', {
        templateUrl: 'views/hh.html',
        controller: 'HhCtrl',
        controllerAs: 'hh',
        resolve : {
          'HHServiceData':function(HHRegisterService){ return HHRegisterService.promise;},
          'acl' : ['$q', 'AclService', function($q, AclService){
            if(AclService.can('Household')){
              // Has proper permissions              
              return true;
            } else {
              // Does not have permission
              
              return $q.reject('Unauthorized');
            
            }
          }]
        }
        
        
      })
      .when('/ec', {
        templateUrl: 'views/ec.html',
        controller: 'EcCtrl',
        controllerAs: 'ec',
        resolve : {
          'ElcoServiceData':function(ElcoRegisterService){ return ElcoRegisterService.promise;},
          'acl' : ['$q', 'AclService', function($q, AclService){
            if(AclService.can('Elco')){
              // Has proper permissions
              return true;
            } else {
              // Does not have permission
              
              return $q.reject('Unauthorized');
            
            }
          }]
        }
        
        
      })
      .when('/pw', {
        templateUrl: 'views/pw.html',
        controller: 'PwCtrl',
        controllerAs: 'pw',
        resolve : {
          'ElcoServiceData':function(ElcoRegisterService){ return ElcoRegisterService.promise;},
          'acl' : ['$q', 'AclService', function($q, AclService){
            if(AclService.can('PW')){
              // Has proper permissions
              return true;
            } else {
              // Does not have permission
              return $q.reject('Unauthorized');
            
            }
          }]
        }
        
      })
      .when('/add-role', {
        templateUrl: 'views/role.html',
        controller: 'RoleCtrl',
        controllerAs: 'role',
        resolve : {
          'acl' : ['$q', 'AclService', function($q, AclService){
            if(AclService.can('Add Role')){
              // Has proper permissions
              return true;
            } else {
              // Does not have permission
              return $q.reject('Unauthorized');
            
            }
          }]
        }
      })
      .when('/role/:param', {
        templateUrl: 'views/role-edit.html',
        controller: 'RoleCtrl',
        controllerAs: 'role',
        resolve : {
          'acl' : ['$q', 'AclService', function($q, AclService){
            if(AclService.can('Role Edit')){
              // Has proper permissions
              return true;
            } else {
              // Does not have permission
              return $q.reject('Unauthorized');
            
            }
          }]
        }
      })
      .when('/add-user', {
        templateUrl: 'views/user-assign.html',
        controller: 'UserCtrl',
        controllerAs: 'user',
        resolve : {
          'acl' : ['$q', 'AclService', function($q, AclService){
            if(AclService.can('User Assign')){
              // Has proper permissions
              return true;
            } else {
              // Does not have permission
              return $q.reject('Unauthorized');
            
            }
          }]
        }
      })
      .when('/user', {
        templateUrl: 'views/user.html',
        controller: 'UserCtrl',
        controllerAs: 'user',
        resolve : {
          'acl' : ['$q', 'AclService', function($q, AclService){
            if(AclService.can('User List')){
              // Has proper permissions
              return true;
            } else {
              // Does not have permission
              return $q.reject('Unauthorized');
            
            }
          }]
        }
      })
      .when('/user/:param/:role/:user/:status', {
        templateUrl: 'views/user-assign-edit.html',
        controller: 'UserCtrl',
        controllerAs: 'user',
        resolve : {
          'acl' : ['$q', 'AclService', function($q, AclService){
            if(AclService.can('User Assign Edit')){
              // Has proper permissions
              return true;
            } else {
              // Does not have permission
              return $q.reject('Unauthorized');
            
            }
          }]
        }
      })
      .when('/schedule-log', {
        templateUrl: 'views/schedules.html',
        controller: 'ScheduleLogCtrl',
        controllerAs: 'scheduleLog',
        resolve : {
          'ElcoServiceData':function(scheduleLogService){ return scheduleLogService.promise;},
          'acl' : ['$q', 'AclService', function($q, AclService){
            if(AclService.can('Acl')){
              // Has proper permissions
              //console.log('is it true?');
              return true;
            } else {
              // Does not have permission
              return $q.reject('Unauthorized');
            
            }
          }]
        }        
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
        templateUrl: 'views/household_details.html',
        controller: 'HouseholdCtrl',
        controllerAs: 'household',
        resolve : {
           'HHServiceData':function(HHRegisterService){ return HHRegisterService.promise;},
          'acl' : ['$q', 'AclService', function($q, AclService){
            if(AclService.can('Household Details')){
              // Has proper permissions
              return true;
            } else {
              // Does not have permission
              return $q.reject('Unauthorized');
            
            }
          }]
        }
        
      })
      .when('/elcos', {
        templateUrl: 'views/elco_details.html',
        controller: 'ElcoCtrl',
        controllerAs: 'elco',
        resolve : {
          'ElcoServiceData':function(ElcoRegisterService){ 
            console.log("inside ElcoServiceData of resolve of /elcos");
            return ElcoRegisterService.promise;
          },
          'acl' : ['$q', 'AclService', function($q, AclService){
            if(AclService.can('Elco Details')){
              // Has proper permissions
              return true;
            } else {
              // Does not have permission
              return $q.reject('Unauthorized');
            
            }
          }]
        }
        
      })
      .when('/pregnant-womens', {
        templateUrl: 'views/pw_details.html',
        controller: 'PwdetailsCtrl',
        controllerAs: 'pw-details',
        resolve : {
          'ElcoServiceData':function(ElcoRegisterService){ return ElcoRegisterService.promise;},
          'acl' : ['$q', 'AclService', function($q, AclService){
            if(AclService.can('PW Details')){
              // Has proper permissions
              return true;
            } else {
              // Does not have permission
              return $q.reject('Unauthorized');
            
            }
          }]
        }
        
      })
      .when('/fwa-performance', {
        templateUrl: 'views/fwa-performance.html',
        controller: 'FwaPerformanceCtrl',
        controllerAs: 'fwaperformance',
        resolve : {
          'FWAPerformanceData':function(FWAPerformanceService){ return FWAPerformanceService.promise;},
          'acl' : ['$q', 'AclService', function($q, AclService){
            if(AclService.can('Household')){
              // Has proper permissions
              return true;
            } else {
              // Does not have permission
              return $q.reject('Unauthorized');
            
            }
          }]
        }
        
      })
       .when('/un-authorized', {
        templateUrl: 'views/unauthorized.html',
        controller: 'UnauthorizedCtrl',
        controllerAs: 'unauthorized',        
      })
      .otherwise({
        redirectTo: '/'
      });
      //$locationProvider.html5Mode(true);
  })  
  .run(function ($rootScope, $location, $window, $timeout,AclService, Authentication, $http,$q,Base64,OPENSRP_WEB_BASE_URL,page) {
      'use strict';

      $rootScope.$on('$locationChangeStart', function (current, previous, rejection) {
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
       $rootScope.$on('$routeChangeError', function (current, previous, rejection) {        
        $location.path('/un-authorized');    
       });
       var aclData = {
            member: ['login','logout']        
          }
      
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
               page.downloadHH(window.HhData,"New Household Registration form");
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
               page.downloadpw( window.ecData,"PSRF form");
            },
            type:"get"				
          });
        
      }
      //adding function in $rootscope makes it available everywhere
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
               page.downloadCS(window.HhData,"Census New Women Registration form");
            },
            type:"get"				
          });
        
      }
      
      $rootScope.checkFunction = function(){
        console.log("log from newly added checkFunction in app.js");
        
        //var url = "http://192.168.21.218:1234/192.168.21.218:9979/registers/hh?anm-id=sohel";
        var url = "http://192.168.21.218:1234/192.168.21.218:5984/opensrp/_design/ScheduleLog/_view/testViewForDashboard";

        /*$.ajax({
            async:false,       
            dataType: "json",
            url:url,
            //username:"sohel",
            //password:"Sohel@123",
            success:function (data) {
               //console.log(data.rows[0].value.actionType);
               console.log("data on success - " + data);
               console.log(typeof data);
            },
            error: function(a,b,c){
               console.log("jqXHR on error - " + a);
               console.log("textStatus on error - " + b);
               console.log("errorThrown on error - " + c);
            },
            complete:function(){
              console.log("call completed");
            },
            type:"get"        
        });
*/
        //$http.get(appSettings.db + '/_design/expenses/_view/byName')
        //$http.get("http://192.168.21.218:1234/192.168.21.218:5984/opensrp/_design/ScheduleLog/_view/testViewForDashboard")
        //     .success(function (data) {
        //        console.log("http get successful.");
        //      });
        //};

        var couchUrl = "http://192.168.21.218:1234/192.168.21.218:5984/opensrp/_design/ScheduleLog/_view/testViewForDashboard";
        console.log("now will issue a http get request.");
        $http({
            method: 'GET',
            url: couchUrl
        }).then(
            function successCallback(response) {
                console.log("success occurred ");
                console.log(response.statusText);
            },
            function errorCallback(response) {
                console.log("error occurred.");
                console.log(response.status + " -- " + response.statusText);
            }
          );
      }

    $rootScope.aclLing =
     ' <a href="#/acl">'+
     '<i class="glyphicon glyphicon-list-alt"></i>'+
    ' <span>Acl</span>'+
    '</a>';
    $rootScope.assingUserToRoll =
     ' <a href="#/user">'+
     '<i class="glyphicon glyphicon-list-alt"></i>'+
    ' <span>User</span>'+
    '</a>';
   
  });
/*_.mixin(_.str.exports());*/
