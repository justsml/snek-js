# Snake Game Library

## MVP Goals

1. Simple state
1. ASCII output
1. Generator pattern

#### Simple state

Track the snake's direction and most recent coordinates. (`snake.direction` and `snake.head.x|y`)

Store nested arrays for game board `grid[x][y]`.

<!-- Q1: Do we fill up values in our `grid` cell-by-cell?
Q2: Store only the changes in direction (Redux store ish)? -->

#### ASCII output

The ASCII output makes the tests feel like this is the exact situation snapshot tests were made for!

#### Generator pattern

One key simplification with generators is a pull-based design.
Here the client requests each 'turn' as needed.

This eliminates the need for additional boilerplate associated with push-based designs (usually with events or timers coordinating state updates.)

