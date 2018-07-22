'use strict';

// Transpile all code following this line with babel and use 'env' (aka ES6) preset.
require('babel-register')({
    presets: ['env']
});

const readline = require('readline-sync');

const Location = require('./location').default;
const Plateau = require('./plateau').default;
const Rover = require('./rover').default;

const plateauInputValidator = new RegExp('^\\d+\\s\\d+$');
let topRightPlateauCornerCoordinates = readline.question('Please enter the plateau\'s top right coordinates: ');

if (!plateauInputValidator.test(topRightPlateauCornerCoordinates)) {
    throw "Invalid input.";
}

topRightPlateauCornerCoordinates = topRightPlateauCornerCoordinates.split(' ');

const plateau = new Plateau(new Location(topRightPlateauCornerCoordinates[0], topRightPlateauCornerCoordinates[1]));

let rovers = [];

const roverDeploymentValidator = RegExp('^\\d+\\s\\d+\\s\\w$');

while (true) {
    let roverCoords = readline
        .question('Deploy rover (X coord, Y coord, orientation): ');

    if ("" === roverCoords) {
        break;
    }

    if (!roverDeploymentValidator.test(roverCoords)) {
        throw "Invalid input.";
    }

    roverCoords = roverCoords.split(' ');

    let roverCommands = readline
        .question('Rover commands string (M to move 1 block forward, L to turn left, R to turn right): ');

    rovers.push(new Rover(
        new Location(roverCoords[0], roverCoords[1]),
        roverCoords[2],
        roverCommands,
        plateau
    ));
}

rovers.forEach(rover => {
    rover.move();

    console.log(rover.xCoordinate() + " " + rover.yCoordinate() + " " + rover.orientation());
});

return 0;
