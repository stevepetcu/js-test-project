'use strict';

const {chai, should, expect} = require('./bootstrap');

const Location = require('../../expedition/location').default;

describe('Creating a location instance', function () {
    let location;

    before(function() {
        // Location is immutable, so we can just create one instance, "before" the test suite.
        location = new Location(50, 0);
    });

    it('should return its X coordinate when xCoordinate() called, given constructor arguments are >= 0', function () {
        location.xCoordinate().should.equal(50);
    });

    it('should return its Y coordinate when yCoordinate() called, given constructor arguments are >= 0', function () {
        location.yCoordinate().should.equal(0);
    });

    it('throw an error given any constructor argument it < 0', function () {
        expect(function () {
            new Location(-10, 0);
        }).to.throw('Coordinate values must be greater than, or at least equal to 0.');
    });
});
