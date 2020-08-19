<script>
	import Title from './Title.svelte';
	import Board from './Board.svelte';	
	import Score from './Score.svelte';

	import {STATES, BLOCK_TYPE, BLOCKS_COUNT, BLOCK_COLOR, BLOCK_COLOR_ARRAY} from './consts'
	import {getRandomInt, getRandom} from './RandomUtils';
	import {getLadderList} from './ScoreLogic';

	let curState = STATES.TITLE;
	let blocks = [];
	let curScore = 0;
	let ladderArray = [];
	
	function startProc() {
		// генерация блоков
		blocks = [];
		curScore = 0;
		let filled = [];
		for (let i = 0; i < 20; i++) {
			filled.push(getRandom(filled));
		}

		for (let index = 0; index < BLOCKS_COUNT; index++) {
			let newType = BLOCK_TYPE.EMPTY;
			let newColor = BLOCK_COLOR.BLUE;
			const filIndex = filled.indexOf(index);
			if (filIndex >= 0) {
				newType = (filIndex < 3) ? BLOCK_TYPE.SMALL_BALL : BLOCK_TYPE.BALL;				
				let newColorId = getRandomInt(0, BLOCK_COLOR_ARRAY.length);
				newColor = BLOCK_COLOR_ARRAY[newColorId];
			}
			blocks.push({
				id: index,
				type: newType,
				color: newColor,
				selected: false
			});
		}
		// смена статуса
		curState = STATES.PROC;
	}

	function setResult(event) {
		if (event.detail.score) {
			curScore = event.detail.score;
		}
		curState = STATES.RESULT;

		updateLadderList();
	}

	function updateLadderList() {
		getLadderList().then((newArray) => {
			ladderArray = newArray;
		});
	}

</script>

<style>
	footer {
		position: fixed;
    	left: 0px;
    	bottom: 0px;
    	width: 100%;
    	background-color: dimgray;
    	padding: 0.4rem;
	}

	footer a {
		text-decoration: none;
    	color: white;
    	font-family: 'Shojumaru', cursive;
    	font-size: 0.8rem;
	}

	footer a:hover {
		color: blue;
	}
</style>

<div>
	<header></header>
	<main>
		{#if curState === STATES.TITLE }
			 <Title on:click={startProc}></Title>
		{/if}
		{#if curState === STATES.PROC}
			 <Board blocks={blocks} score={curScore} on:replay={startProc} on:finish={setResult}></Board>
		{:else if curState === STATES.RESULT}
			 <Score curScore={curScore} ladderArray={ladderArray} on:saved={updateLadderList}></Score>
		{/if}
	</main>
	{#if curState !== STATES.TITLE }
	<footer>	
	<a href="http://karachevtsevuu.ru" target="_blank">© Karachevtsev Yu.Yu.</a>
	<a href="https://money.yandex.ru/to/41001512641224" target="_blank">* Donate project</a>
	</footer>
	{/if}
</div>
