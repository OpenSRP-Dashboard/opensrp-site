'use strict';

describe('Controller: PwdetailsCtrl', function () {

  // load the controller's module
  beforeEach(module('opensrpSiteApp'));

  var PwdetailsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PwdetailsCtrl = $controller('PwdetailsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PwdetailsCtrl.awesomeThings.length).toBe(3);
  });
});
