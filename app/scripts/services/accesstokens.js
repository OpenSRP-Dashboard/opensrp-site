'use strict';

/**
 * @ngdoc service
 * @name opensrpSiteApp.ACCESSTOKENS
 * @description
 * # ACCESSTOKENS
 * Service in the opensrpSiteApp.
 */
angular.module('opensrpSiteApp')
  .service('accessTokens', function ($http,$rootScope,Base64,OPENSRP_WEB_BASE_URL) {
    // AngularJS will instantiate a singleton by calling "new" on this function    
    
      this.createAccessTokens=function(data){
        /*var url = "Controller/enq_postadmin.php";
        $http.post(url, $scope.formData).success(function (da) {
            alert(da);
            $scope.formData = "";
        });
         */
        console.log(data);
        
      }
    
  });
