'use strict';

describe('Controller: EcCtrl', function () {

  // load the controller's module
  beforeEach(module('opensrpSiteApp'));

  var EcCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EcCtrl = $controller('EcCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(EcCtrl.awesomeThings.length).toBe(3);
  });
});
