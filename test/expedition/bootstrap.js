'use strict';

// Transpile all code following this line with babel and use 'env' (aka ES6) preset.
require('babel-register')({
    presets: ['env']
});

const chai = require('chai');
const should = chai.should();
const expect = chai.expect;

module.exports = {chai, should, expect};
