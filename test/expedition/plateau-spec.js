'use strict';

const {chai, should, expect} = require('./bootstrap');

const Plateau = require('../../expedition/plateau').default;

describe('Creating a plateau instance', function () {
    let plateau, locationFake;

    before(function() {
        // sinonjs apparently cannot mock "private" methods of ES6 classes.
        locationFake = {};
        locationFake.xCoordinate = function () {
            return 50;
        };
        locationFake.yCoordinate = function () {
            return 10;
        };

        plateau = new Plateau(locationFake);
    });

    it('should return its X coordinate when xCoordinate() called, given constructor arguments are >= 0', function () {
        plateau.topRightX().should.equal(50);
    });

    it('should return its Y coordinate when yCoordinate() called, given constructor arguments are >= 0', function () {
        plateau.topRightY().should.equal(10);
    });
});
