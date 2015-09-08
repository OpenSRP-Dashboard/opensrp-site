'use strict';

describe('Service: FWAPerformanceService', function () {

  // load the service's module
  beforeEach(module('opensrpSiteApp'));

  // instantiate service
  var FWAPerformance;
  beforeEach(inject(function (_FWAPerformance_) {
    FWAPerformance = _FWAPerformance_;
  }));

  it('should do something', function () {
    expect(!!FWAPerformance).toBe(true);
  });

});
