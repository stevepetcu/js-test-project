'use strict';

class Location {
    constructor(xCoordinate, yCoordinate) {
        /**
         * Validate that coordinates are positive numbers.
         *
         * @param xCoordinate
         * @param yCoordinate
         * @returns {boolean}
         */
        const validCoordinates = function (xCoordinate, yCoordinate) {
            return 0 <= parseInt(xCoordinate) && 0 <= parseInt(yCoordinate);
        };

        if (!validCoordinates(xCoordinate, yCoordinate)) {
            throw 'Coordinate values must be greater than, or at least equal to 0.'
        }

        const _xCoordinate = parseInt(xCoordinate);
        const _yCoordinate = parseInt(yCoordinate);

        this.xCoordinate = function () {
            return _xCoordinate;
        };

        this.yCoordinate = function () {
            return _yCoordinate;
        };
    }
}

export default Location;
