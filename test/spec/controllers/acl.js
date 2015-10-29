'use strict';

describe('Controller: AclCtrl', function () {

  // load the controller's module
  beforeEach(module('opensrpSiteApp'));

  var AclCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AclCtrl = $controller('AclCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AclCtrl.awesomeThings.length).toBe(3);
  });
});
