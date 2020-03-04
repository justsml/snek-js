#!/usr/bin/env node
'use strict';
const meow = require('meow');
const cliOnKey = require('@derhuerst/cli-on-key')
const delay = require('delay')
const SnakeGame = require('..').default;

const Terminal = require('./terminal.js')

const cli = meow(`
    Usage
      $ snek [--dimensions 10]

    Options
      --dimensions <length>, -d  Specify a grid dimension, default 10, for 10x10 box.
      --speed <milliseconds>, -s  Time between moves. Default is 1500, or 1.5 sec.

    Examples
      $ snek --dimensions 15
      $ snek --d 15

      # Double the pace:
      $ snek --d 12 --speed 750

`, {
    flags: {
        dimensions: {
            type: 'number',
            alias: 'd',
            default: 10
        },
        speed: {
          type: 'number',
          alias: 's',
          default: 1500
        }
    }
})

const delayValue = (value, milliseconds) => delay(milliseconds).then(() => value)

function render(terminal, asciiText) {
  terminal.cursorTo(0, null)
}

(async () => {
  const terminal = new Terminal(process.stdout)
  const snakeGame = SnakeGame({size: cli.flags.dimensions})

  const unregisterListener = cliOnKey(process.stdin, key => {
    if (['up', 'down', 'left', 'right'].includes(key.name)) {
      snakeGame.next(key.name)
    }
  })
  let score = 0

  terminal.cursorSave();
  terminal.clearRight()
  while (true) {
    await delay(cli.flags.speed)
    const state = snakeGame.next()
    score++
    if (state.done) break
    // terminal.lineWrapping(true)
    // terminal.cursorTo(0, -10)
    // terminal.clearBottom()
    terminal.cursorTo(0, -10)
    terminal.clearLine()
    terminal.write(state.value.output.replace(/ /ig, '_'))
  }
  terminal.cursorRestore();
  unregisterListener(null)
  console.log('Game finished ✨')
  console.log({isTTY: terminal.isTTY(), dy: terminal.dy})
})()

