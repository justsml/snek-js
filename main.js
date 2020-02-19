
// Make a pull-based renderer - i.e. generators
export default function SnakeGame({size = 11}) {
  const middleish = parseInt(size / 2.0, 10)
  const grid = Array.from({length: size}, () => Array.from({length: size}, () => ' '))
  // note: cells records the sequence of steps, might be overkill, let's get back to tests
  const snake = { direction: 'up', cells: [{x: middleish, y: middleish}] }

  const getCellIcon = (coords, index) => index === 0 ? '🐍' : '#' //'＃'
  const getNextCell = (currentHead, direction) => {
    if (direction === 'up') return { x: currentHead.x, y: currentHead.y - 1 }
    if (direction === 'down') return { x: currentHead.x, y: currentHead.y + 1 }
    if (direction === 'left') return { x: currentHead.x - 1, y: currentHead.y }
    if (direction === 'right') return { x: currentHead.x + 1, y: currentHead.y }
    if (direction === 'up') return { x: currentHead.x, y: currentHead.y - 1 }
  }
  return {
    *move(newDirection = snake.direction) {
      const currentHead = snake.cells[0]

      snake.cells
    }
  }
}

// Need a func to:
// get snake head icon (for now use ▲▼◀▶︎)
// get next cell, based on direction
// handle out-of-bounds, game-over.

