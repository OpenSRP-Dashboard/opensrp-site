'use strict';

describe('Controller: UnauthorizedCtrl', function () {

  // load the controller's module
  beforeEach(module('opensrpSiteApp'));

  var UnauthorizedCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UnauthorizedCtrl = $controller('UnauthorizedCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(UnauthorizedCtrl.awesomeThings.length).toBe(3);
  });
});
