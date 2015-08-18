'use strict';

describe('Controller: HhRegisterControllerCtrl', function () {

  // load the controller's module
  beforeEach(module('opensrpSiteApp'));

  var HhRegisterControllerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HhRegisterControllerCtrl = $controller('HouseholdCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(HhRegisterControllerCtrl.awesomeThings.length).toBe(3);
  });
});
