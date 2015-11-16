'use strict';

describe('Service: PWDetails', function () {

  // load the service's module
  beforeEach(module('opensrpSiteApp'));

  // instantiate service
  var PWDetails;
  beforeEach(inject(function (_PWDetails_) {
    PWDetails = _PWDetails_;
  }));

  it('should do something', function () {
    expect(!!PWDetails).toBe(true);
  });

});
