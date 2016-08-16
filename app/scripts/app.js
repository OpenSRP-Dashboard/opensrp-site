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
  .module('opensrpSiteApp', ['ngBootstrap','ngAnimate','ngCookies','ngResource','ngRoute','angular-momentjs','ngSanitize','ngTouch','ui.bootstrap','ngDialog','angular-mapbox','nvd3','chart.js','checklist-model','mm.acl','flash', 'ngMessages'])
  .constant('AUTH_URL', 'http://192.168.21.167:1337/27.147.129.50:9979/authenticate-user')
  //.constant('OPENSRP_WEB_BASE_URL', 'http://192.168.21.246:1234/192.168.21.246:9979')
  //ip for jivita server - 192.168.19.90  
  //.constant('OPENSRP_WEB_BASE_URL', 'http://27.147.129.50:1234/192.168.19.55:9979')
  .constant('OPENSRP_WEB_BASE_URL', 'http://27.147.129.50:1234/192.168.19.55:9979')
  .constant("HH_REGISTER_ENTRY_URL_API",'27.147.129.50:9979/registers/hh?anm-id=')
  .constant("ELCO_REGISTER_ENTRY_URL_API",'27.147.129.50:9979/registers/ec?anm-id=')  
  .constant("COUCHURL",'http://27.147.129.50:1234/192.168.19.55:5984')
  .config(['AclServiceProvider', function (AclServiceProvider) {
    var myConfig = {
      storage: 'sessionStorage',  // localStorage
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
       .when('/csv_export', {
        templateUrl: 'views/csv_export.html',
        controller: 'csvexportCtrl',
        controllerAs: 'csv_export'
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
          'acl' : ['$q', 'AclService', function($q, AclService){
            if(AclService.can('PW')){
              // Has proper permissions
              return true;
            } else {
              // Does not have permission
              return $q.reject('Un/authorized');
            
            }
          }]
        }
        
      })
      .when('/add-role', {
        templateUrl: 'views/role.html',
        controller: 'RoleCtrl',
        controllerAs: 'role',
        resolve : {
          'userData':function(Role){ return Role.promise;},
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
      .when('/roles', {
        templateUrl: 'views/roles.html',
        controller: 'RoleCtrl',
        controllerAs: 'role',
        resolve : {
          'userData':function(Role){ return Role.promise;},
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
      .when('/role/:roleId', {
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
      .when('/users', {
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
      .when('/user/:name', {
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
          'scheduleLogServiceData':function(scheduleLogService){ return scheduleLogService.promise;},
          'acl' : ['$q', 'AclService', function($q, AclService){
            if(AclService.can('Acl')){
              // Has proper permissions
              console.log('is it true?' + AclService.can('Elco Details'));
              return true;
            } else {  
              // Does not have permission
              return $q.reject('Unauthorized');
            
            }
          }]
        }        
      })
      .when('/test', {
        templateUrl: 'views/testView.html',
        controller: 'TestCtrl',
        controllerAs: 'TestCtrl',
        resolve : {
          'userData':function(testService){ return testService.promise;},
          'acl' : ['$q', 'AclService', function($q, AclService){
            if(AclService.can('Acl')){
              // Has proper permissions
              //console.log('is it true?' + AclService.can('Elco Details'));
              return true;
            } else {
              // Does not have permission
              return $q.reject('Unauthorized');
            
            }
          }]
        }        
      })
      .when('/privileges', {
        templateUrl: 'views/privileges.html',
        controller: 'PrivilegeCtrl',
        controllerAs: 'PrivilegeCtrl',
        resolve : {
          'userData':function(privilegeService){ return privilegeService.promise;},
          'acl' : ['$q', 'AclService', function($q, AclService){
            if(AclService.can('Acl')){
              // Has proper permissions
              //console.log('is it true?' + AclService.can('Elco Details'));
              return true;
            } else {
              // Does not have permission
              return $q.reject('Unauthorized');
              //return true;
            
            }
          }]
        }        
      })
      .when('/privileges/add', {
        templateUrl: 'views/privilege_add.html',
        controller: 'PrivilegeCtrl',
        controllerAs: 'PrivilegeCtrl',
        resolve : {
          //'userData':function(testService){ return testService.promise;},
          'acl' : ['$q', 'AclService', function($q, AclService){
            if(AclService.can('Acl')){
              // Has proper permissions
              //console.log('is it true?' + AclService.can('Elco Details'));
              return true;
            } else {
              // Does not have permission
              return $q.reject('Unauthorized');
            
            }
          }]
        }        
      })
      .when('/privileges/:id', {
        templateUrl: 'views/privilege_edit.html',
        controller: 'PrivilegeCtrl',
        controllerAs: 'PrivilegeCtrl',
        resolve : {          
          'acl' : ['$q', 'AclService', function($q, AclService){
          if(AclService.can('Acl')){
            // Has proper permissions
            //console.log('is it true?' + AclService.can('Elco Details'));
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
            return ElcoRegisterService.promise; // promise returns a fucntion that returns a $q
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
      .when('/schedule-rule', {
        templateUrl: 'views/schedule_rule.html',
        controller: 'ScheduleRuleCtrl',
        controllerAs: 'rule',
        resolve : {
          'scheduleRuleServiceData':function(ScheduleRule){ return ScheduleRule.promise;},
          'acl' : ['$q', 'AclService', function($q, AclService){
            if(AclService.can('Rule List')){
              // Has proper permissions
              return true;
            } else {
              // Does not have permission
              return $q.reject('Unauthorized');
            
            }
          }]
        }
      })
      .when('/schedule-rule/edit/:id', {
        templateUrl: 'views/schedule_rule_edit.html',
        controller: 'ScheduleRuleCtrl',
        controllerAs: 'rule',
        resolve : {          
          'acl' : ['$q', 'AclService', function($q, AclService){
            if(AclService.can('Edit Rule')){
              // Has proper permissions
              return true;
            } else {
              // Does not have permission
              return $q.reject('Unauthorized');
            
            }
          }]
        }
      })
      .when('/schedule-rule/add', {
        templateUrl: 'views/schedule_rule_add.html',
        controller: 'ScheduleRuleCtrl',
        controllerAs: 'rule',
        resolve : {
          'acl' : ['$q', 'AclService', function($q, AclService){
            if(AclService.can('Add Rule')){
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

    $rootScope.$on('$routeChangeError', function (current, previous, rejection) {        
      $location.path('/un-authorized');    
    });

    $rootScope.$on('$locationChangeStart', function (current, previous, rejection) {
      if (!Authentication.isAuthenticated()) {
            //evt.preventDefault();           
        $location.path('/login');
        if (!$rootScope.$$phase) {
            //this will kickstart angular if to notice the change

            //$$phase is a flag set while angular is in a $digest cycle.
            //Sometimes (in rare cases), you want to check $$phase on the 
            //scope before doing an $apply. An error occurs if you try to $apply during a $digest:
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
        var allData = null;
        var apiURLs = OPENSRP_WEB_BASE_URL+"/registers/household?start-date=2016-05-15&end-date=2016-06-16";
        var getData = $http.get(apiURLs, { cache: true}).success(function (data) {            
            allData = data.hhRegisterEntries;         
            $("#wait").css("display","none");
            $("#export").css("display","block");
            page.downloadHH(allData,"New Household Registration form");
        });    
    };
    
    $rootScope.PWDATAEXPORT= function(){
        var allData = null;
        var apiURLs = OPENSRP_WEB_BASE_URL+"/registers/elco?start-date=2016-05-15&end-date=2016-06-16";
        var getData = $http.get(apiURLs, { cache: true}).success(function (data) {            
            allData = data.ecRegisterEntries;         
            $("#wait").css("display","none");
            $("#export").css("display","block");
            page.downloadpw(allData,"PSRF form");
        });  
    };
    //adding function in $rootscope makes it available everywhere
    $rootScope.CENCUSDATAEXPORT= function(){
        var allData = null;
        var apiURLs = OPENSRP_WEB_BASE_URL+"/registers/household?start-date=2016-05-15&end-date=2016-06-16";
        var getData = $http.get(apiURLs, { cache: true}).success(function (data) {            
            allData = data.hhRegisterEntries;         
            $("#wait").css("display","none");
            $("#export").css("display","block");
            page.downloadCS(allData,"Census New Women Registration form");
        });  
    };

    $rootScope.MISCENSUSDATAEXPORT= function(){
        var allData = null;
        var apiURLs = OPENSRP_WEB_BASE_URL+"/registers/elco?start-date=2016-05-15&end-date=2016-06-16";
        var getData = $http.get(apiURLs, { cache: true}).success(function (data) {            
            allData = data.ecRegisterEntries;         
            $("#wait").css("display","none");
            $("#export").css("display","block");
            page.downloadMC(allData,"MIS CENSUS FORM");
        });       
    };

    $rootScope.MISELCODATAEXPORT= function(){
        var allData = null;
        var apiURLs = OPENSRP_WEB_BASE_URL+"/registers/elco?start-date=2016-05-15&end-date=2016-06-16";
        var getData = $http.get(apiURLs, { cache: true}).success(function (data) {            
            allData = data.ecRegisterEntries;         
            $("#wait").css("display","none");
            $("#export").css("display","block");
            page.downloadME(allData,"MIS ELCO FORM");
        });   
    };
      
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
