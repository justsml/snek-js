import SnakeGame, { getNextCell, isMoveValid } from './main'

describe('SnakeGame Functional Tests', () => {
  it('should handle moves correctly', () => {
    expect(getNextCell({x: 1, y: 1}, 'up')).toEqual({x: 1, y: 0})
    expect(getNextCell({x: 1, y: 1}, 'left')).toEqual({x: 0, y: 1})
    expect(getNextCell({x: 9, y: 9}, 'down')).toEqual({x: 9, y: 10})
  })
  it('should detect invalid moves', () => {
    const limit = 10
    expect(isMoveValid({move: {x: 0, y: 0}, limitX: limit, limitY: limit})).toBeTruthy()
    expect(isMoveValid({move: {x: 9, y: 9}, limitX: limit, limitY: limit})).toBeTruthy()
    expect(isMoveValid({move: {x: -1, y: 0}, limitX: limit, limitY: limit})).toBeFalsy()
    expect(isMoveValid({move: {x: 0, y: -1}, limitX: limit, limitY: limit})).toBeFalsy()
  })

})

describe('SnakeGame Snapshot Tests', () => {
  it('can start a 10x10 game', () => {
    const game = SnakeGame({ size: 10, output: 'ascii' })
    let state = game.next().value.output
    expect(state).toMatchSnapshot('initial')
  })
  it('can move down', () => {
    const game = SnakeGame({ size: 10, output: 'ascii' })
    let state = null
    state = game.next('down').value.output
    expect(state).toMatchSnapshot('initial')
    state = game.next('down').value.output
    expect(state).toMatchSnapshot('1-down')
  })
  it('can move left', () => {
    const game = SnakeGame({ size: 10, output: 'ascii' })
    let state = null
    state = game.next('down').value.output
    expect(state).toMatchSnapshot('initial')
    state = game.next('down').value.output
    expect(state).toMatchSnapshot('1-down')
  })
  it('can move down then left', () => {
    const game = SnakeGame({ size: 10, output: 'ascii' })
    let state = null
    state = game.next('down').value.output
    expect(state).toMatchSnapshot('initial')
    state = game.next('down').value.output
    expect(state).toMatchSnapshot('1-down')
    state = game.next('left').value.output
    expect(state).toMatchSnapshot('1-left')
  })
  it('handles multi-step navigation changes', () => {
    const game = SnakeGame({ size: 10, output: 'ascii' })
    // 3 moves up, 3 right, 2 down
    let state = null
    game.next('up')
    game.next()
    state = game.next().value.output
    expect(state).toMatchSnapshot('part-1')
    game.next('right')
    game.next()
    state = game.next().value.output
    expect(state).toMatchSnapshot('part-2')
    game.next('down')
    state = game.next().value.output
    expect(state).toMatchSnapshot('part-3')
  })
  it('throws error on invalid moves', () => {
    const game = SnakeGame({ size: 10, output: 'ascii' })
    game.next('up')
    game.next('up')
    game.next('up')
    game.next('up')
    game.next('up')
    game.next('up')
    expect(() => game.next('up')).toThrowError(/game over/mig)
  })
})
