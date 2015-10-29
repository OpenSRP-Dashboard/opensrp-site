'use strict';

describe('Service: ACCESSTOKENS', function () {

  // load the service's module
  beforeEach(module('opensrpSiteApp'));

  // instantiate service
  var ACCESSTOKENS;
  beforeEach(inject(function (_ACCESSTOKENS_) {
    ACCESSTOKENS = _ACCESSTOKENS_;
  }));

  it('should do something', function () {
    expect(!!ACCESSTOKENS).toBe(true);
  });

});
