'use strict';

describe('Service: ROLE', function () {

  // load the service's module
  beforeEach(module('opensrpSiteApp'));

  // instantiate service
  var ROLE;
  beforeEach(inject(function (_ROLE_) {
    ROLE = _ROLE_;
  }));

  it('should do something', function () {
    expect(!!ROLE).toBe(true);
  });

});
