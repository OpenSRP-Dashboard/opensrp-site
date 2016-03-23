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
        var scheduleRules = null;
        var couchUrl = "http://192.168.21.246:1234/192.168.21.246:5984/schedule/_design/ScheduleRules/_view/all_rule";
        var scheduleRuleData = $http.get(couchUrl, { 
              cache: true, 
              withCredentials: false,
              headers: {
                'Authorization' : ''
              }
            })
            .success(function (data) {                         
              scheduleRules = data.rows;             
              
        }); 
        
        return {
            promise: scheduleRuleData,
            setData: function (data) {
                scheduleRules = data;
            },
            Data: function () {        
                return scheduleRules;
            }
        };
    
    /**
      this function communicate with server to save schedule rule.
    */
    this.save = function(data,$window,Flash){        
        $("#submit").attr('disabled','disabled');
        $("#submit").html("Please Wait");
        var apiURLs = OPENSRP_WEB_BASE_URL+"/add-schedule-rule";       
        $http.post(apiURLs, data).success(function (data) {
          $("#submit").html("Submit");
          $('#submit').prop('disabled', false);
          if (data == 1) {            
            var message = '<strong>Successfully created a schedule rule. </strong> ';
            Flash.create('success', message, 'custom-class');
            $window.location = '/#/schedule-rule';
          }else if (data == 2) {
            $("#message").html("<p class='lead'>This schedule rule already exists</p>");
            $( "#message" ).delay(3000).fadeOut( "slow" );
          }else{
             $("#message").html("<p class='lead'>Failed to create schedule rule</p>");
            $( "#message" ).delay(3000).fadeOut( "slow" );
          }
          
        });       
      }
  });
