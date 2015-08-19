'use strict';

describe('Controller: ElcoRegisterControllerCtrl', function () {

  // load the controller's module
  beforeEach(module('opensrpSiteApp'));

  var ElcoRegisterControllerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ElcoRegisterControllerCtrl = $controller('ElcoCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ElcoRegisterControllerCtrl.awesomeThings.length).toBe(3);
  });
});
