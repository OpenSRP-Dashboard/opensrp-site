'use strict';

/**
 * @ngdoc function
 * @name opensrpSiteApp.controller:ScheduleRuleCtrl
 * @description
 * # ScheduleRuleCtrl
 * Controller of the opensrpSiteApp
 */
angular.module('opensrpSiteApp')
  .controller('ScheduleRuleCtrl', function ($scope,$rootScope,$window,$timeout,$routeParams,$http,AclService,ScheduleRule,Flash) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    
     $scope.save = function() {
      var formData = document.forms.rule_def;
      var numOfRule = $('.clonedInput').length;
      var rules = [];
      for(var i=1;i<=numOfRule;i++){
        var numOfDefination = $('.defination'+i).length;
        var definations = [];
        for(var j=1;j<=numOfDefination;j++){          
          var name = formData.elements['name'+i+'[]'];
          var value = formData.elements['value'+i+'[]'];
          if (numOfDefination ==1) {
             var defination = {name:name.value,value:value.value}; 
          }else{            
           var defination = {name:name[j-1].value,value:value[j-1].value}; 
          }
          definations.push(defination)
        }         
        rules.push({startFormName:formData.elements['startFormName'+i+'[]'].value,endFormName:formData.elements['endFormName'+i+'[]'].value, defination:definations});
      }
      var scheduleRule = {name:$scope.name,rule:rules,createdBy:"proshanto",createdDate:new Date()}     
      ScheduleRule.save(scheduleRule,$window,Flash);
    };
  });
