'use strict';

/**
 * @ngdoc service
 * @name opensrpSiteApp.ScheduleRule
 * @description
 * # ScheduleRule
 * Service in the opensrpSiteApp.
 */
angular.module('opensrpSiteApp')
  .service('ScheduleRule', function ($http,$rootScope,Base64,OPENSRP_WEB_BASE_URL,COUCHURL) {   
        var scheduleRules = null;
        var couchUrl = COUCHURL+"/schedule/_design/ScheduleRules/_view/all_rule";
        
        
        return {
            promise: $http.get(couchUrl, { 
              cache: true, 
              withCredentials: false,
              headers: {
                'Authorization' : ''
              }
            })
            .success(function (data) {                         
              scheduleRules = data.rows;             
              
            }),
            setData: function (data) {
                scheduleRules = data;
            },
            Data: function () {        
                return scheduleRules;
            },
            scheduleRuleById: function($scope,$rootScope,$timeout,id){
              var url = COUCHURL+'/schedule/_design/ScheduleRules/_view/by_Id?key="' + id + '"';              
              $timeout(function () {
                var scheduleRuleData = $http.get(url, { 
                  cache: true, 
                  withCredentials: false,                  
                  headers: {
                    'Authorization' : ''
                  }
                })
                .success(function (data) {                         
                  $rootScope.rules = data.rows[0].value.rule;                  
                  $rootScope.name= data.rows[0].value.name;
                  console.log($rootScope.name);
                  console.log($rootScope.rules)
                  $rootScope.loading = false;               
                  
                });
              }, 250); 
            },
            save: function(data,$window,Flash){        
            $("#submit").attr('disabled','disabled');
            $("#submit").html("Please Wait");
            var apiURLs = OPENSRP_WEB_BASE_URL+"/add-schedule-rule";       
            $http.post(apiURLs, data).success(function (data) {
              $("#submit").html("Submit");
              $('#submit').prop('disabled', false);
              if (data == 1) {            
                var message = '<strong>Successfully you have created a schedule rule. </strong> ';
                Flash.create('success', message, 'custom-class');
                $window.location = '/#/schedule-rule';
              }else if (data == 2) {
                $("#message").html("<p class='lead'>Sorry this is already exists.</p>");
                $( "#message" ).delay(3000).fadeOut( "slow" );
              }else{
                 $("#message").html("<p class='lead'>An Error occured.Please try again.</p>");
                $( "#message" ).delay(3000).fadeOut( "slow" );
              }
              
            });       
          } ,
          edit: function(data,$window,Flash,id){        
            $("#submit").attr('disabled','disabled');
            $("#submit").html("Please Wait");
            var apiURLs = OPENSRP_WEB_BASE_URL+"/edit-schedule-rule";       
            $http.post(apiURLs, data).success(function (data) {
              $("#submit").html("Submit");
              $('#submit').prop('disabled', false);
              if (data == 1) {            
                var message = '<strong>Successfully you have edited this schedule rule. </strong> ';
                Flash.create('success', message, 'custom-class');
                $window.location = '/#/schedule-rule';
              }else{
                 $("#message").html("<p class='lead'>An Error occured.Please try again. </p>");
                $( "#message" ).delay(3000).fadeOut( "slow" );
              }
              
            });       
          },
          makeJson: function(formData,numOfRule,cloneInput,$scope,id){
            var rules = [];
            
            for(var i=0;i<numOfRule;i++){
              var ruleId = cloneInput[i].id;
              var ruleNumber = ruleId.split("rule");        
              var numOfDefination = $('.defination'+ruleNumber[1]).length;
              var definations = [];
              for(var j=1;j<=numOfDefination;j++){          
                var name = formData.elements['name'+ruleNumber[1]+'[]'];
                var value = formData.elements['value'+ruleNumber[1]+'[]'];
                if (numOfDefination ==1) {
                   var defination = {name:name.value,value:value.value}; 
                }else{            
                 var defination = {name:name[j-1].value,value:value[j-1].value}; 
                }
                definations.push(defination)
              }         
              rules.push({startFormName:formData.elements['startFormName'+ruleNumber[1]+'[]'].value,endFormName:formData.elements['endFormName'+ruleNumber[1]+'[]'].value, defination:definations});
            }
            if (id) {
              var scheduleRule = {name:$scope.name,rule:rules,createdBy:$rootScope.username,createdDate:new Date(),ruleID:id}
            }else{
              var scheduleRule = {name:$scope.name,rule:rules,createdBy:$rootScope.username,createdDate:new Date()}
            }
            return scheduleRule;
          }
        };  
    
  });
