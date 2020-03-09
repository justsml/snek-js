#!/usr/bin/env node
'use strict';
const React = require('react');
const importJsx = require('import-jsx');
const {render} = require('ink');
const meow = require('meow');

const ui = importJsx('./ui');

const cli = meow(`
	Usage
	  $ cli

	Options
		--speed=2, -s  Speed in seconds

	Examples
		$ cli --speed=2.5

		# Faster
		$ cli --speed=0.5

`);

globalThis.flags = cli.flags

render(React.createElement(ui, cli.flags), { experimental: true });
