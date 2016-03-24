'use strict';

/**
 * @ngdoc function
 * @name opensrpSiteApp.controller:ScheduleRuleCtrl
 * @description
 * # ScheduleRuleCtrl
 * Controller of the opensrpSiteApp
 */
angular.module('opensrpSiteApp')
  .controller('ScheduleRuleCtrl', function ($scope,$rootScope,$window,$location,$timeout,$routeParams,$http,AclService,ScheduleRule,Flash,ElcoRegisterService,$filter) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var c = 1;
    var id = $routeParams.id;    
    $scope.can = AclService.can;     
    if (id) {
      console.log(id);
     $rootScope.loading = true;
      ScheduleRule.scheduleRuleById($scope,$rootScope,$timeout,id);
      
      
    }else if($location.path() =='/schedule-rule/add'){
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
    }else{
      console.log(2222222222222222222222222)
      $scope.data = ScheduleRule.Data();     
      ElcoRegisterService.dataFilter($scope,$scope.data,$filter);
    }
  });
