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
  .module('opensrpSiteApp', ['ngAnimate','ngCookies','ngResource','ngRoute','angular-momentjs','ngSanitize','ngTouch'])
  .constant('AUTH_URL', 'http://192.168.21.167:1337/27.147.129.50:9979/authenticate-user')
  .constant('OPENSRP_WEB_BASE_URL', 'http://nain:1337/27.147.129.50:9979')
  .config(function ($routeProvider) {
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
        controllerAs: 'household'
      })
       .when('/elcos', {
        templateUrl: 'views/elcos.html',
        controller: 'ElcoCtrl',
        controllerAs: 'elco'
      })
      .otherwise({
        redirectTo: '/'
      });
  })  
  .run(function ($rootScope, $location, $window, Authentication, $http) {
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
                  $window.location = '#/login';
              }
              delete $http.defaults.headers.common['X-Requested-With'];
              delete $http.defaults.headers.common.Authorization;
          }
      });
  });
/*_.mixin(_.str.exports());*/
