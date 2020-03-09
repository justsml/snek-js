'use strict';
const React = require('react');
const { useState, useEffect, useRef, useContext } = React;
const PropTypes = require('prop-types');
const { Box, Text, Color, useInput, useApp, AppContext } = require('ink');
const SnakeGame = require('../').default;

const App = ({ size = 12, speed = 2 }) => {
	const { exit } = useApp();
	// const { exit } = useContext(AppContext)
	const [direction, setDirection] = useState('right');
	const [gameState, setGameState] = useState();
	const [isGameOver, setIsGameOver] = useState(false);
	const $game = useRef(SnakeGame({ size, output: 'ascii' }))
	const $isExiting = useRef(false);

	useEffect(() => $isExiting.current && exit(), [$isExiting.current])

	useInput((input, key) => {
		if (input === 'q') {
			$isExiting.current = true;
		}
		if (key.leftArrow) setDirection('left') || $game.current.next('left');
		if (key.rightArrow) setDirection('right') || $game.current.next('right');
		if (key.upArrow) setDirection('up') || $game.current.next('up');
		if (key.downArrow) setDirection('down') || $game.current.next('down');
	});

	useEffect(() => {
		if ($isExiting.current) return;
		const game = $game.current
		const timer = setInterval(() => {
			if ($isExiting.current) return;
			if (direction) {
				game.next(direction)
				setDirection(null)
			}
			let nextState = game.next()
			setGameState(nextState.value)
			if (nextState.done) {
				$isExiting.current = true
				clearInterval(timer)
				setIsGameOver(true)
				exit()
			}
		}, speed * 1000);

		return () => {
			game.throw(new Error('Game Closed: Cleanup'))

			clearInterval(timer);
		};
	}, []);

	let finalMessage = null;
	if (isGameOver) {
		finalMessage = <Box justifyContent="center" alignItems="center" width={parseInt(size * 1.25, 10)} height={parseInt(size * 1.25, 10)}>
			<Text>Game over!</Text>
			<Box padding={2} margin={2}>
				<Text>Completed in {gameState.moves && gameState.moves.length} moves!</Text>
			</Box>
		</Box>;
	}
	return (
		<>
			<Box width={size} height={size}>
				{gameState && gameState.output || 'Starting...'}
			</Box>
			{`\n============ ${direction} ============\n`}
			{finalMessage}
		</>
	)
};

App.propTypes = {
	name: PropTypes.string
};

App.defaultProps = {
	name: 'Stranger'
};

module.exports = App;
