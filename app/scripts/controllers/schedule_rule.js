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
    $scope.startFormName = []
    $scope.endFormName = []
    $scope.name = []
    $scope.value = []
     $scope.save = function() {
      var myForm = document.forms.rule_def;
      var myControls = myForm.elements['startFormName[]'];
      console.log(document.forms.rule_def)
      for (var i = 0; i < myControls.length; i++) {
        var aControl = myControls[i].value;
        console.log(aControl);
    }
        ScheduleRule.save($scope.formData,$window,Flash);
      };
  });
