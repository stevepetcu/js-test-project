'use strict';

class Plateau {
    constructor(topRight) {
        const _topRight = topRight;

        this.topRightX = function () {
            return _topRight.xCoordinate();
        };

        this.topRightY = function () {
            return _topRight.yCoordinate();
        };
    }
}

export default Plateau;
