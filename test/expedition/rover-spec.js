'use strict';

const {chai, should, expect} = require('./bootstrap');

const Rover = require('../../expedition/rover').default;

describe('Creating a rover instance', function () {
    let rover, initialLocationFake, plateauMapFake;

    before(function () {
        initialLocationFake = {};
        initialLocationFake.xCoordinate = function () {
            return 3;
        };
        initialLocationFake.yCoordinate = function () {
            return 7;
        };

        plateauMapFake = {};
        plateauMapFake.topRightX = function () {
            return 50;
        };
        plateauMapFake.topRightY = function () {
            return 100;
        };

        rover = new Rover(initialLocationFake, 'N', 'MMMRMM', plateauMapFake);
    });

    it('should return its X coordinate when xCoordinate() called, given valid constructor arguments', function () {
        rover.xCoordinate().should.equal(3);
    });

    it('should return its Y coordinate when yCoordinate() called, given valid constructor arguments', function () {
        rover.yCoordinate().should.equal(7);
    });

    it('should return its orientation when orientation() called, given valid constructor arguments', function () {
        rover.orientation().should.equal('N');
    });

    it('should throw an error when created, given initial location is out of the plateau\'s horizontal bounds', function () {
        let initialLocationFake = {};
        initialLocationFake.xCoordinate = function () {
            return 51;
        };
        initialLocationFake.yCoordinate = function () {
            return 50;
        };

        expect(function () {
            new Rover(initialLocationFake, 'N', 'MMMRMM', plateauMapFake);
        }).to.throw('Location out of bounds ' +
            '(X coordinate must be between 0 and 50, and Y coordinate must be between 0 and 100.');
    });

    it('should throw an error when created, given initial location is out of the plateau\'s vertical bounds', function () {
        let initialLocationFake = {};

        initialLocationFake.xCoordinate = function () {
            return 25;
        };
        initialLocationFake.yCoordinate = function () {
            return 101;
        };

        expect(function () {
            new Rover(initialLocationFake, 'N', 'MMMRMM', plateauMapFake);
        }).to.throw('Location out of bounds ' +
            '(X coordinate must be between 0 and 50, and Y coordinate must be between 0 and 100.');
    });

    it('should throw an error when created, given orientation is not in {N, E, S, W}', function () {
        expect(function () {
            new Rover(initialLocationFake, 'G', 'MMMRMM', plateauMapFake);
        }).to.throw('Invalid orientation (must be one of N, E, S, W).');
    });

    it('should throw an error when created, given a command that is not in {M, R, L}', function () {
        expect(function () {
            new Rover(initialLocationFake, 'N', 'KLM', plateauMapFake);
        }).to.throw('Invalid rover commands (must use M, R, L to specify commands).');
    });
});

describe('Moving the rover', function () {
    let rover, initialLocationFake, plateauMapFake;

    before(function () {
        initialLocationFake = {};
        initialLocationFake.xCoordinate = function () {
            return 3;
        };
        initialLocationFake.yCoordinate = function () {
            return 7;
        };

        plateauMapFake = {};
        plateauMapFake.topRightX = function () {
            return 50;
        };
        plateauMapFake.topRightY = function () {
            return 100;
        };

        rover = new Rover(initialLocationFake, 'N', 'MMMRMM', plateauMapFake);
    });

    it('should advance 1 block N when an M command is executed, given the orientation is N and the plateau\'s bounds allow it', function () {
        // Given
        rover = new Rover(initialLocationFake, 'N', 'M', plateauMapFake);

        // When
        rover.move();

        // Then
        rover.xCoordinate().should.equal(initialLocationFake.xCoordinate());
        rover.yCoordinate().should.equal(initialLocationFake.yCoordinate() + 1);
        rover.orientation().should.equal('N')
    });

    it('should advance 1 block E when an M command is executed, given the orientation is E and the plateau\'s bounds allow it', function () {
        // Given
        rover = new Rover(initialLocationFake, 'E', 'M', plateauMapFake);

        // When
        rover.move();

        // Then
        rover.xCoordinate().should.equal(initialLocationFake.xCoordinate() + 1);
        rover.yCoordinate().should.equal(initialLocationFake.yCoordinate());
        rover.orientation().should.equal('E')
    });

    it('should advance 1 block S when an M command is executed, given the orientation is S and the plateau\'s bounds allow it', function () {
        // Given
        rover = new Rover(initialLocationFake, 'S', 'M', plateauMapFake);

        // When
        rover.move();

        // Then
        rover.xCoordinate().should.equal(initialLocationFake.xCoordinate());
        rover.yCoordinate().should.equal(initialLocationFake.yCoordinate() - 1);
        rover.orientation().should.equal('S')
    });

    it('should advance 1 block W when an M command is executed, given the orientation is W and the plateau\'s bounds allow it', function () {
        // Given
        rover = new Rover(initialLocationFake, 'W', 'M', plateauMapFake);

        // When
        rover.move();

        // Then
        rover.xCoordinate().should.equal(initialLocationFake.xCoordinate() - 1);
        rover.yCoordinate().should.equal(initialLocationFake.yCoordinate());
        rover.orientation().should.equal('W')
    });

    it('should stop moving when an M command is executed, given any orientation and the plateau\'s bounds restrict it', function () {
        // Given
        let initialLocationFake = {};
        initialLocationFake.xCoordinate = function () {
            return 50;
        };
        initialLocationFake.yCoordinate = function () {
            return 50;
        };
        rover = new Rover(initialLocationFake, 'E', 'M', plateauMapFake);

        // When
        rover.move();

        // Then
        rover.xCoordinate().should.equal(initialLocationFake.xCoordinate());
        rover.yCoordinate().should.equal(initialLocationFake.yCoordinate());
        rover.orientation().should.equal('E')
    });

    it('should turn E when an R command is executed, given the initial orientation is N', function () {
        // Given
        rover = new Rover(initialLocationFake, 'N', 'R', plateauMapFake);

        // When
        rover.move();

        // Then
        rover.xCoordinate().should.equal(initialLocationFake.xCoordinate());
        rover.yCoordinate().should.equal(initialLocationFake.yCoordinate());
        rover.orientation().should.equal('E')
    });

    it('should turn S when an R command is executed, given the initial orientation is E', function () {
        // Given
        rover = new Rover(initialLocationFake, 'E', 'R', plateauMapFake);

        // When
        rover.move();

        // Then
        rover.xCoordinate().should.equal(initialLocationFake.xCoordinate());
        rover.yCoordinate().should.equal(initialLocationFake.yCoordinate());
        rover.orientation().should.equal('S')
    });

    it('should turn W when an R command is executed, given the initial orientation is S', function () {
        // Given
        rover = new Rover(initialLocationFake, 'S', 'R', plateauMapFake);

        // When
        rover.move();

        // Then
        rover.xCoordinate().should.equal(initialLocationFake.xCoordinate());
        rover.yCoordinate().should.equal(initialLocationFake.yCoordinate());
        rover.orientation().should.equal('W')
    });

    it('should turn N when an R command is executed, given the initial orientation is W', function () {
        // Given
        rover = new Rover(initialLocationFake, 'W', 'R', plateauMapFake);

        // When
        rover.move();

        // Then
        rover.xCoordinate().should.equal(initialLocationFake.xCoordinate());
        rover.yCoordinate().should.equal(initialLocationFake.yCoordinate());
        rover.orientation().should.equal('N')
    });

    it('should turn W when an L command is executed, given the initial orientation is N', function () {
        // Given
        rover = new Rover(initialLocationFake, 'N', 'L', plateauMapFake);

        // When
        rover.move();

        // Then
        rover.xCoordinate().should.equal(initialLocationFake.xCoordinate());
        rover.yCoordinate().should.equal(initialLocationFake.yCoordinate());
        rover.orientation().should.equal('W')
    });

    it('should turn S when an L command is executed, given the initial orientation is W', function () {
        // Given
        rover = new Rover(initialLocationFake, 'W', 'L', plateauMapFake);

        // When
        rover.move();

        // Then
        rover.xCoordinate().should.equal(initialLocationFake.xCoordinate());
        rover.yCoordinate().should.equal(initialLocationFake.yCoordinate());
        rover.orientation().should.equal('S')
    });

    it('should turn E when an L command is executed, given the initial orientation is S', function () {
        // Given
        rover = new Rover(initialLocationFake, 'S', 'L', plateauMapFake);

        // When
        rover.move();

        // Then
        rover.xCoordinate().should.equal(initialLocationFake.xCoordinate());
        rover.yCoordinate().should.equal(initialLocationFake.yCoordinate());
        rover.orientation().should.equal('E')
    });

    it('should turn N when an L command is executed, given the initial orientation is E', function () {
        // Given
        rover = new Rover(initialLocationFake, 'E', 'L', plateauMapFake);

        // When
        rover.move();

        // Then
        rover.xCoordinate().should.equal(initialLocationFake.xCoordinate());
        rover.yCoordinate().should.equal(initialLocationFake.yCoordinate());
        rover.orientation().should.equal('N')
    });
});
