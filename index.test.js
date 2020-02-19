const SnakeGame = require('./')

describe('can initialize game', () => {
  it('can start a 10x10 game', () => {
    const game = SnakeGame({ size: 10 })
    game.move
  })
})
