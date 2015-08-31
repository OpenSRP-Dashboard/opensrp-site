'use strict';

describe('Filter: search', function () {

  // load the filter's module
  beforeEach(module('opensrpSiteApp'));

  // initialize a new instance of the filter before each test
  var search;
  beforeEach(inject(function ($filter) {
    search = $filter('search');
  }));

  it('should return the input prefixed with "search filter:"', function () {
    var text = 'angularjs';
    console.log(text);
    expect(search(text)).toBe('search filter: ' + text);
  });

});
