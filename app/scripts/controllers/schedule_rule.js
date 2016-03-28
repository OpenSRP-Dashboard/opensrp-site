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
       /* When Schedule rule edit form shows*/
      $scope.id= id;
      $rootScope.loading = true;
      ScheduleRule.scheduleRuleById($scope,$rootScope,$timeout,id);      
      $scope.edit= function(){
        var formData = document.forms.rule_def;     
        var numOfRule = $('.clonedInput').length;
        var cloneInput = $('.clonedInput');      
         console.log(ScheduleRule.makeJson(formData,numOfRule,cloneInput,$scope,id));
         ScheduleRule.edit(ScheduleRule.makeJson(formData,numOfRule,cloneInput,$scope,id),$window,Flash,id);
      }
    }else if($location.path() =='/schedule-rule/add'){
      /* When Schedule rule add form shows*/
      $scope.save = function() {
        var formData = document.forms.rule_def;
        var numOfRule = $('.clonedInput').length;       
        var cloneInput = $('.clonedInput');      
        ScheduleRule.save(ScheduleRule.makeJson(formData,numOfRule,cloneInput,$scope,""),$window,Flash);
      };    
    }else{
      /* When Schedule rule list shows*/
      $scope.data = ScheduleRule.Data();     
      ElcoRegisterService.dataFilter($scope,$scope.data,$filter);
    }
    
    
  });
