'use strict';

describe('Controller: RoleCtrl', function () {

  // load the controller's module
  beforeEach(module('opensrpSiteApp'));

  var RoleCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RoleCtrl = $controller('RoleCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(RoleCtrl.awesomeThings.length).toBe(3);
  });
});
