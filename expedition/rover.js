'use strict';

const Location = require('./location').default;

class Rover {
    constructor(initialLocation, orientation, commands, plateauMap) {
        const cardinalPoints = {
            0: 'N',
            1: 'E',
            2: 'S',
            3: 'W',
        };

        const cardinalPointsKeys = {
            'N': 0,
            'E': 1,
            'S': 2,
            'W': 3,
        };

        const _plateauMap = plateauMap;

        const validCommands = function (commands) {
            const roverCommandsValidator = new RegExp('^[MRL]*$', 'i');

            return roverCommandsValidator.test(commands);
        };

        if (!validCommands(commands)) {
            throw 'Invalid rover commands (must use M, R, L to specify commands).'
        }

        const _commands = commands.split('');

        /**
         * Validate that the orientation is one of North, East, South, or West.
         *
         * @param orientation
         * @returns {boolean}
         */
        const validOrientation = function (orientation) {
            const accepted = RegExp('^[NESW]$', 'i');

            return accepted.test(orientation);
        };

        if (!validOrientation(orientation)) {
            throw 'Invalid orientation (must be one of N, E, S, W).'
        }

        let _orientation = cardinalPointsKeys[orientation.toUpperCase()];

        /**
         * Assert that the rover won't drive off the plateau.
         *
         * @param newLocation
         * @returns {boolean}
         */
        const safeMove = function (newLocation) {
            return _plateauMap.topRightX() >= newLocation.xCoordinate()
                && _plateauMap.topRightY() >= newLocation.yCoordinate();
        };

        if (!safeMove(initialLocation)) {
            throw `Location out of bounds (X coordinate must be between 0 and ${_plateauMap.topRightX()}, `
            + `and Y coordinate must be between 0 and ${_plateauMap.topRightY()}.`;
        }

        let _currentLocation = initialLocation;

        const step = function () {
            let xCoordinate = _currentLocation.xCoordinate();
            let yCoordinate = _currentLocation.yCoordinate();

            switch (cardinalPoints[_orientation]) {
                case 'N':
                    yCoordinate += 1;
                    break;
                case 'E':
                    xCoordinate += 1;
                    break;
                case 'S':
                    yCoordinate -= 1;
                    break;
                case 'W':
                    xCoordinate -= 1;
                    break;
            }

            const newLocation = new Location(xCoordinate, yCoordinate);

            if (safeMove(newLocation)) {
                _currentLocation = newLocation;

                return true;
            } else {
                return false;
            }
        };

        const turn = function (command) {
            switch (command) {
                case 'L':
                    --_orientation;
                    break;
                case 'R':
                    ++_orientation;
                    break;
            }

            if (_orientation < 0) {
                _orientation = 3;
            }

            if (3 < _orientation) {
                _orientation = 0;
            }
        };

        // Public methods.
        this.xCoordinate = function () {
            return _currentLocation.xCoordinate();
        };

        this.yCoordinate = function () {
            return _currentLocation.yCoordinate();
        };

        this.orientation = function () {
            return cardinalPoints[_orientation];
        };

        this.move = function () {
            for (let i = 0, len = _commands.length; i < len; i++) {
                if ('M' === _commands[i]) {
                    if (!step()) {
                        console.log('Location ahead out of bounds, stopping rover.');
                        break;
                    }
                } else {
                    turn(_commands[i]);
                }
            }
        }
    }
}

export default Rover;
