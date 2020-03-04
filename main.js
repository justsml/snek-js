const BODY_CELL = '#'

const renderAsciiGrid = grid => {
  return grid.map(row => row.join('')).join('\n')
}

// Make a pull-based renderer - i.e. generators
export const getHeadIcon = ({ direction }) => {
  if (direction === 'up') return `▲`
  if (direction === 'down') return `▼`
  if (direction === 'left') return `◀`
  if (direction === 'right') return `▶︎`
  throw Error('Invalid direction: ' + direction)
  // return '🐍'
}
export const getNextCell = (currentHead, direction) => {
  currentHead.x = parseInt(currentHead.x, 10)
  currentHead.y = parseInt(currentHead.y, 10)
  if (direction === 'up') return { x: currentHead.x, y: currentHead.y - 1 }
  if (direction === 'down') return { x: currentHead.x, y: currentHead.y + 1 }
  if (direction === 'left') return { x: currentHead.x - 1, y: currentHead.y }
  if (direction === 'right') return { x: currentHead.x + 1, y: currentHead.y }
  throw Error('Invalid direction: ' + direction)
}
export const isMoveValid = ({move, sizeX = 10, sizeY = 10}) => {
  return (move.x >= 0 && move.x < sizeX) && (move.y >= 0 && move.y < sizeY)
}


export default function* SnakeGame({ size = 11, output = 'ascii' }) {
  const centerStart = (size / 2.0).toFixed(0)
  const grid = Array.from({ length: size }, () => Array.from({ length: size }, () => ' '))
  // note: cells records the sequence of steps, might be overkill, let's get back to tests
  const snake = { direction: 'up', cells: [{ x: centerStart, y: centerStart }] }

  // set the start position
  grid[centerStart][centerStart] = getHeadIcon({ direction: snake.direction })

  // const getCellIcon = (coords, index) => index === 0 ? '🐍' : BODY_CELL //'＃'
  const getGameState = () => output === 'ascii'
    ? {output: renderAsciiGrid(grid)}
    : JSON.parse(JSON.stringify({ grid, snake }))

  while (true) {
    const nextDirection = yield getGameState()
    if (nextDirection) {
      getHeadIcon({ direction: nextDirection })
      snake.direction = nextDirection
      continue
    }

    const prevHead = snake.cells[0]
    const nextMove = getNextCell(prevHead, snake.direction)
    if (!isMoveValid({move: nextMove, sizeY: size, sizeX: size}))
      return getGameState() // throw new Error('Game over: ' + JSON.stringify(nextMove))
    snake.cells.unshift(nextMove)
    const currHead = snake.cells[0]
    grid[prevHead.y][prevHead.x] = BODY_CELL
    grid[currHead.y][currHead.x] = getHeadIcon({ direction: snake.direction })
  }
  // return {
  //   *move(newDirection = snake.direction) {

  //     const currentHead = snake.cells[0]

  //     snake.cells
  //   }
  // }
}

// Need a func to:
// get snake head icon (for now use ▲▼◀▶︎)
// get next cell, based on direction
// handle out-of-bounds, game-over.

