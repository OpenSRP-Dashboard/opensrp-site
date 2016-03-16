'use strict';

describe('Controller: ScheduleRuleCtrl', function () {

  // load the controller's module
  beforeEach(module('opensrpSiteApp'));

  var ScheduleRuleCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ScheduleRuleCtrl = $controller('ScheduleRuleCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ScheduleRuleCtrl.awesomeThings.length).toBe(3);
  });
});
