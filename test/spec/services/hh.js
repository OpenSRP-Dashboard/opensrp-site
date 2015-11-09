'use strict';

describe('Service: HH', function () {

  // load the service's module
  beforeEach(module('opensrpSiteApp'));

  // instantiate service
  var HH;
  beforeEach(inject(function (_HH_) {
    HH = _HH_;
  }));

  it('should do something', function () {
    expect(!!HH).toBe(true);
  });

});
