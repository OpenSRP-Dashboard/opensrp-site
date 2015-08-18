'use strict';

describe('Service: elcoRegisterService', function () {

  // load the service's module
  beforeEach(module('opensrpSiteApp'));

  // instantiate service
  var elcoRegisterService;
  beforeEach(inject(function (_elcoRegisterService_) {
    elcoRegisterService = _elcoRegisterService_;
  }));

  it('should do something', function () {
    expect(!!elcoRegisterService).toBe(true);
  });

});
