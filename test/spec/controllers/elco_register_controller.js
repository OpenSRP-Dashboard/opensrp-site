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
  it('should have assigned right pattern to numberPattern', function(){
    expect(scope.numberPattern).toBeDefined();
    expect(scope.numberPattern.test("100")).toBe(true);
    expect(scope.numberPattern.test("100aa")).toBe(false);
  });
  
});
