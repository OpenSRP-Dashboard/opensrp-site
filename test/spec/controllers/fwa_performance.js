'use strict';

describe('Controller: FwaPerformanceCtrl', function () {

  // load the controller's module
  beforeEach(module('opensrpSiteApp'));

  var FwaPerformanceCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FwaPerformanceCtrl = $controller('FwaPerformanceCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(FwaPerformanceCtrl.awesomeThings.length).toBe(3);
  });
});
