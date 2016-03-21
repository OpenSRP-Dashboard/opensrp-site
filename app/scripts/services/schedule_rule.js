'use strict';

/**
 * @ngdoc service
 * @name opensrpSiteApp.ScheduleRule
 * @description
 * # ScheduleRule
 * Service in the opensrpSiteApp.
 */
angular.module('opensrpSiteApp')
  .service('ScheduleRule', function ($http,$rootScope,Base64,OPENSRP_WEB_BASE_URL) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    
    
    this.save = function(data,$window,Flash){
        
        $("#submit").attr('disabled','disabled');
        $("#submit").html("Please Wait");
        var apiURLs = OPENSRP_WEB_BASE_URL+"/add-schedule-rule";       
        $http.post(apiURLs, data).success(function (data) {
          $("#submit").html("Submit");
          $('#submit').prop('disabled', false);
          if (data == 1) {            
            var message = '<strong>Successfully created a role. </strong> ';
            Flash.create('success', message, 'custom-class');
            $window.location = '/#/schedule-rule/add';
          }else if (data == 2) {
            $("#message").html("<p class='lead'>This role already exists</p>");
            $( "#message" ).delay(3000).fadeOut( "slow" );
          }else{
             $("#message").html("<p class='lead'>Failed to create role</p>");
            $( "#message" ).delay(3000).fadeOut( "slow" );
          }
          
        });       
      }
  });
