import SnakeGame from './main'

describe('can initialize game', () => {
  it('can start a 10x10 game', () => {
    const game = SnakeGame({ size: 10, output: 'ascii' })
    let state = null
    state = game.next().value
    expect(state).toMatchSnapshot('initial')
    state = game.next('left').value
    expect(state).toMatchSnapshot('1-left')
    state = game.next().value
    expect(state).toMatchSnapshot('2-left-implicit')
  })
})
