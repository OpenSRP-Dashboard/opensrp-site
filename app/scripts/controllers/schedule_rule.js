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
      var cloneInput = $('.clonedInput');
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
      var scheduleRule = {name:$scope.name,rule:rules,createdBy:$rootScope.username,createdDate:new Date()}
      console.log(scheduleRule);
      ScheduleRule.save(scheduleRule,$window,Flash);
    };
  });
