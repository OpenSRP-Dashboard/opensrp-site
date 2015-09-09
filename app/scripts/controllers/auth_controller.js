'use strict';

/**
 * @ngdoc function
 * @name opensrpSiteApp.controller:AuthControllerCtrl
 * @description
 * # AuthControllerCtrl
 * Controller of the opensrpSiteApp
 */
angular.module('opensrpSiteApp')
   .controller('LoginCtrl', function ($scope, $location, $http, $window, Authentication, LoginService) {
       $scope.loading = false;

        $scope.loginUser = function () {
          $scope.loading = true;
            LoginService.login($scope.username, $scope.password).then(function (result) {
		//result=true;
                
                if (result === true) {
                    $scope.loading = false;
                    Authentication.authenticate($scope.username, $scope.password);
                    $window.location = '#/';
                    if (!$scope.$$phase) {
                        //this will kickstart angular to notice the change
                        $scope.$apply();
                    }
                } else {
                    alert('Authentication failed for user: ' + $scope.username);
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
