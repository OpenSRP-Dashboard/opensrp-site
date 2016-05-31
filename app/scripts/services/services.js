'use strict';

/**
 * @ngdoc service
 * @name opensrpSiteApp.services
 * @description
 * # services
 * Service in the opensrpSiteApp.
 */
angular.module('opensrpSiteApp')
  .service('Authentication', function ($rootScope,$http,$timeout, $cookies,AclService, BasicAuth, Base64,OPENSRP_WEB_BASE_URL,Common) {
    'use strict';

    this.authenticate = function (username, password) {
        BasicAuth.setCredentials(username, password);
    };
    this.clearCredentials = function() {
        BasicAuth.clearCredentials();
    };
    this.isAuthenticated = function () {
        var authdata = $cookies.get('authdata');
        if (!authdata) {
            return false;
        }
        $rootScope.username = Base64.decode(authdata).split(':')[0];
        $rootScope.password = Base64.decode(authdata).split(':')[1];
        
        //Common.acl($timeout,$rootScope,$http);               
        return true;
    };
  })
  .service('BasicAuth', function (Base64, $cookies, $http) {
    'use strict';
      // initialize to whatever is in the cookie, if anything
    $http.defaults.headers.common.Authorization = 'Basic ' + $cookies.get('authdata');
      
    this.setCredentials = function (username, password) {
        var encoded = Base64.encode(username + ':' + password);
        $http.defaults.headers.common.Authorization = 'Basic ' + encoded;
        $cookies.put('authdata', encoded);
    };
    this.clearCredentials = function () {
        document.execCommand('ClearAuthenticationCache');
        $cookies.remove('authdata');
        $http.defaults.headers.common.Authorization = 'Basic ';
    };
  })
  .service('Base64', function () {
    'use strict';

    var keyStr = 'ABCDEFGHIJKLMNOP' +
        'QRSTUVWXYZabcdef' +
        'ghijklmnopqrstuv' +
        'wxyz0123456789+/' +
        '=';

    this.encode = function (input) {
        var output = '';
        var chr1, chr2, chr3 = '';
        var enc1, enc2, enc3, enc4 = '';
        var i = 0;

        do {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output +
                keyStr.charAt(enc1) +
                keyStr.charAt(enc2) +
                keyStr.charAt(enc3) +
                keyStr.charAt(enc4);
            chr1 = chr2 = chr3 = '';
            enc1 = enc2 = enc3 = enc4 = '';
        } while (i < input.length);

        return output;
    };

    this.decode = function (input) {
        var output = '';
        var chr1, chr2, chr3 = '';
        var enc1, enc2, enc3, enc4 = '';
        var i = 0;

        // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
        var base64test = /[^A-Za-z0-9\+\/\=]/g;
        if (base64test.exec(input)) {
            alert('There were invalid base64 characters in the input text.\n' +
                'Valid base64 characters are A-Z, a-z, 0-9, \'+\', \'/\',and \'=\'\n' +
                'Expect errors in decoding.');
        }
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');

        do {
            enc1 = keyStr.indexOf(input.charAt(i++));
            enc2 = keyStr.indexOf(input.charAt(i++));
            enc3 = keyStr.indexOf(input.charAt(i++));
            enc4 = keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 !== 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 !== 64) {
                output = output + String.fromCharCode(chr3);
            }

            chr1 = chr2 = chr3 = '';
            enc1 = enc2 = enc3 = enc4 = '';

        } while (i < input.length);

        return output;
    };
  });