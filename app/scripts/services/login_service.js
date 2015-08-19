'use strict';

/**
 * @ngdoc service
 * @name opensrpSiteApp.loginService
 * @description
 * # loginService
 * Service in the opensrpSiteApp.
 */
angular.module('opensrpSiteApp')
   .service('LoginService', function ($q, $http, Authentication, Base64, OPENSRP_WEB_BASE_URL) {
        'use strict';

        var login = function (username, password) {
            var authenticationURL = OPENSRP_WEB_BASE_URL + '/authenticate-user';
            var authorizationHeader = 'Basic ' + Base64.encode(username + ':' + password);
            Authentication.clearCredentials();
            return  $http({method: 'GET', url: authenticationURL, headers: {'Authorization': authorizationHeader}})
                .then(function () {
                    return true;
                }, function () {
                    delete  $http.defaults.headers.common.Authorization;
                    return false;
                });
        };

        return {
            login: function (username, password) {
                return login(username, password);
            }
        };
    });
