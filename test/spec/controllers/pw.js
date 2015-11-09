'use strict';

describe('Controller: PwCtrl', function () {

  // load the controller's module
  beforeEach(module('opensrpSiteApp'));

  var PwCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PwCtrl = $controller('PwCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PwCtrl.awesomeThings.length).toBe(3);
  });
});
