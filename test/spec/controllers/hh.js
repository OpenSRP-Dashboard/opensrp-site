'use strict';

describe('Controller: HhCtrl', function () {

  // load the controller's module
  beforeEach(module('opensrpSiteApp'));

  var HhCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HhCtrl = $controller('HhCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(HhCtrl.awesomeThings.length).toBe(3);
  });
});
