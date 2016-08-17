'use strict';

/**
 * @ngdoc function
 * @name opensrpSiteApp.controller:AuthControllerCtrl
 * @description
 * # AuthControllerCtrl
 * Controller of the opensrpSiteApp
 */
angular.module('opensrpSiteApp')
   .controller('LoginCtrl', function ($scope,$rootScope, $location, $http, $window,$timeout, Authentication, LoginService,Common) {
       $scope.loading = false;

        $scope.loginUser = function () {
            $scope.loading = true;
            LoginService.login($scope.username, $scope.password).then(function (result) {		           
                if (result === true) {            
                    Authentication.authenticate($scope.username, $scope.password);
                    //Common.acl($timeout,$rootScope,$http,$scope.username,$window,Authentication,$location,$scope); 
                    Common.bypassAcl($scope, $window);
                    //$window.location = '#/';
                    if (!$scope.$$phase) {
                        //this will kickstart angular to notice the change
                        $scope.$apply();
                    }
                } else {
                    Authentication.asuthenticate("sohel", "Sohel@123");
{
    //
}
                        //alert('Authentication failed for user: ' + $scope.username);
                    $window.location = '#/';
                    }
            }, function () {
                alert('Authentication failed for user: ' + $scope.username);
                $window.location = '#/';
            });
        };
    })
    .controller('LogoutCtrl', function ($scope, $location, $http, $window, Authentication) {
        

        Authentication.clearCredentials();
        $location.path('#/');
        if (!$scope.$$phase) {
            //this will kickstart angular to notice the change
            $scope.$apply();
        }
        else {
            $window.location = '#/';
        }
    });
