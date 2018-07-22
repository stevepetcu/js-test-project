Mars rovers expedition
======================

To install the required modules:

```bash
$ yarn install
```

To run the tests:

```bash
$ yarn test
```

To run the app:

```bash
node expedition/console.js
```

Example input:
```bash
Please enter the plateau's top right coordinates: 5 5
Deploy rover (X coord, Y coord, orientation): 1 2 N
Rover commands string (M to move 1 block forward, L to turn left, R to turn right): LMLMLMLMM
Deploy rover (X coord, Y coord, orientation): 3 3 E
Rover commands string (M to move 1 block forward, L to turn left, R to turn right): MMRMMRMRRM
Deploy rover (X coord, Y coord, orientation):
1 3 N
5 1 E
```
Input will end and output will be presented when an empty new line is inserted.
