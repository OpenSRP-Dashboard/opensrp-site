'use strict';

describe('Controller: AccesstokensCtrl', function () {

  // load the controller's module
  beforeEach(module('opensrpSiteApp'));

  var AccesstokensCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AccesstokensCtrl = $controller('AccesstokensCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AccesstokensCtrl.awesomeThings.length).toBe(3);
  });
});
