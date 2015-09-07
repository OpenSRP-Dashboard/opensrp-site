'use strict';

describe('Directive: resolveLoading', function () {

  // load the directive's module
  beforeEach(module('opensrpSiteApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<resolve-loading></resolve-loading>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the resolveLoading directive');
  }));
});
