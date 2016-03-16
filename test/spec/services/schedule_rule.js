'use strict';

describe('Service: ScheduleRule', function () {

  // load the service's module
  beforeEach(module('opensrpSiteApp'));

  // instantiate service
  var ScheduleRule;
  beforeEach(inject(function (_ScheduleRule_) {
    ScheduleRule = _ScheduleRule_;
  }));

  it('should do something', function () {
    expect(!!ScheduleRule).toBe(true);
  });

});
