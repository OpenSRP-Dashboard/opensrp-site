'use strict';

describe('Service: EC', function () {

  // load the service's module
  beforeEach(module('opensrpSiteApp'));

  // instantiate service
  var EC;
  beforeEach(inject(function (_EC_) {
    EC = _EC_;
  }));

  it('should do something', function () {
    expect(!!EC).toBe(true);
  });

});
