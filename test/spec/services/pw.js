'use strict';

describe('Service: PW', function () {

  // load the service's module
  beforeEach(module('opensrpSiteApp'));

  // instantiate service
  var PW;
  beforeEach(inject(function (_PW_) {
    PW = _PW_;
  }));

  it('should do something', function () {
    expect(!!PW).toBe(true);
  });

});
