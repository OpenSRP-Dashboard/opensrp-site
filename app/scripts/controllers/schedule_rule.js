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
    function person(firstName,lastName,age,eyeColor) {
      this.firstName = firstName;
      for(var i =0;i<4;i++){
      this.rule = function (name) {
        this.startFormName = name;
        this.endFormName= name;
        this.defination = function(){
          this.name= "pro";
          this.value = 12;
        }
      }
      }
    }
    function defination(){
      this.name = "pro";
      this.value = 12;
    }
     $scope.save = function() {
      var myForm = document.forms.rule_def;
      
      var myControls = myForm.elements['name1[]'];
     var numOfEntry = $('.clonedInput').length;
     var json = [               
                 {firstName:"John", lastName:new defination(), age:50, eyeColor:"blue"}
                 
                 ];
     json.push({firstName:"John", lastName:new defination(), age:50, eyeColor:"blue"})
     var mainJson = {name:"Mamemem",rule:json}
     console.log(mainJson)
     /* for (var i = 0; i < myControls.length; i++) {
        console.log(i)
        var aControl = myControls[i].value;
        console.log(aControl);
    }*/
        ScheduleRule.save($scope.formData,$window,Flash);
      };
  });
