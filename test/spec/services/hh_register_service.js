'use strict';

describe('Service: hhRegisterService', function () {

  // load the service's module
  beforeEach(module('opensrpSiteApp'));

  // instantiate service
  var hhRegisterService;
  beforeEach(inject(function (_hhRegisterService_) {
    hhRegisterService = _hhRegisterService_;
  }));

  it('should do something', function () {
    expect(!!hhRegisterService).toBe(true);
  });

});
