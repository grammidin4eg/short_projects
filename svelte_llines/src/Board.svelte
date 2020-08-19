<script>
    import {BLOCK_TYPE, BLOCKS_COUNT, BLOCKS_LINE_COUNT, BLOCK_COLOR, BLOCK_COLOR_ARRAY} from './consts'
    import {getRandomInt, getRandom} from './RandomUtils';
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    // your script goes here
    export let blocks;
    export let score;
    let toScore = 0;

    let curSelected = null;
    let blockInput = false;

    function getObj(event) {
        const key = parseInt(event.target.getAttribute('key'), 10);
        if (!isNaN(key)) {
            return blocks[key];
        }
        return null;
    }

    function ballClick(event) {
        let block = getObj(event);
        if (!blockInput && block && !block.selected && (block.type === BLOCK_TYPE.BALL )) {
            blocks.forEach(element => {
                element.selected = false;
                element.targetField = false;
            });
            block.selected = true;
            curSelected = block.id;
            blocks[block.id] = block;
            findPathAround(block);
        }                    
    }

    function fieldClick(event) {
        let field = getObj(event);
        if (!blockInput && field && field.targetField && ((field.type === BLOCK_TYPE.EMPTY) || (field.type === BLOCK_TYPE.SMALL_BALL)) && (curSelected !== null)) {
            let block = blocks[curSelected];
            block.selected = false;
            field.type = BLOCK_TYPE.BALL;
            block.type = BLOCK_TYPE.EMPTY;
            field.color = block.color;

            blocks[block.id] = block;
            field[field.id] = field;

            curSelected = null;
            blockInput = true;

            blocks.forEach(cur => cur.targetField = false);

            checkMatches(field);
        }        
    }

    function goTo(array, delimer, id, color, maxInLine) {
        const nextId = id + delimer;        
        if ((nextId < 0) || (nextId > maxInLine)) {            
            return array;
        }
        const nextBlock = blocks[nextId];
        if ( (nextBlock.type !== BLOCK_TYPE.BALL) || (nextBlock.color !== color )) {
            return array;
        }

        array.push(nextId);
        return goTo(array, delimer, nextId, color, maxInLine);
    }

    function checkMatches(block, skipGrow) {
        setTimeout(() => {
            let horLine = [];
            let verLine = [];
            let heedRemove = false;
            let removeArr = [];
            
            horLine.push(block.id);
            verLine.push(block.id);
            //block.id, color, type
            //по горизонтали
            let maxInLine = Math.floor(block.id/BLOCKS_LINE_COUNT)*BLOCKS_LINE_COUNT + (BLOCKS_COUNT/BLOCKS_LINE_COUNT);
            //идем влево
            horLine = goTo(horLine, -1, block.id, block.color, maxInLine);
            //идем вправо
            horLine = goTo(horLine, 1, block.id, block.color, maxInLine);
            //если больше трех - удаляем
            if (horLine.length >= 3) {
                heedRemove = true;
                removeArr = [...horLine];
            }
            
            //по вертикали
            maxInLine = (BLOCKS_COUNT - 1);
            //идем вверх
            verLine = goTo(verLine, -1 * BLOCKS_LINE_COUNT, block.id, block.color, maxInLine);
            //идем вниз
            verLine = goTo(verLine, BLOCKS_LINE_COUNT, block.id, block.color, maxInLine);
            //если больше трех - удаляем
            if (verLine.length >= 3) {
                heedRemove = true;
                removeArr = [...verLine];
            }

            if (heedRemove) {
                removeArr.forEach((remId) => {
                    blocks[remId].type = BLOCK_TYPE.EMPTY;
                    toScore++;
                });
            }

            if (toScore) {
                startIncInterval();
            }

            if (!skipGrow) {
                growBalls();
            }
            
        }, 300);
    }

    function growBalls() {
        let filled = [];
        blocks.forEach((block) => {
            if (block.type === BLOCK_TYPE.SMALL_BALL) {
                block.type = BLOCK_TYPE.BALL;
                checkMatches(block, true);//mark
            }

            if (block.type === BLOCK_TYPE.BALL) {
                filled.push(block.id);
            }
        });
        //проверка на заполнение
        if (filled.length >= (BLOCKS_COUNT - 1)) {
            onFinish();
        }

        //добавить новые шары
        addNewBalls(filled);
    }

    function addNewBalls(filled) {                
        setTimeout(() => {
            for (let i = 0; i < 3; i++) {
                let rndId = getRandom(filled);
                blocks[rndId].type = BLOCK_TYPE.SMALL_BALL;
                let newColorId = getRandomInt(0, BLOCK_COLOR_ARRAY.length);
                blocks[rndId].color = BLOCK_COLOR_ARRAY[newColorId];
            }
            blockInput = false;
        }, 300);
        
    }

    function onReplay() {
        score = 0;
        dispatch('replay');
    }

    function onFinish() {
        dispatch('finish', {score});
    }

    function checkPathPoindField(nextId, minInLine, maxInLine, array) {
        if ((nextId < 0) || (nextId < minInLine) || (nextId > maxInLine) || !blocks[nextId] || (blocks[nextId].type === BLOCK_TYPE.BALL) ) {
            return null;
        }
        if (array.indexOf(nextId) < 0) {
            array.push(nextId);
        }
        return nextId;
    }

    function checkPathPoindDelimer(curId, delimer, minInLine, maxInLine, array) {
       while(curId || (curId === 0)) {
            curId = checkPathPoindField(curId + delimer, minInLine, maxInLine, array);
        } 
    }

    function checkPathPoind(blockId, array) {
        //вверх и внизу
        let maxInLine = (BLOCKS_COUNT - 1);
        let minInLine = 0;
        checkPathPoindDelimer(blockId, -1 * BLOCKS_LINE_COUNT, minInLine, maxInLine, array);
        checkPathPoindDelimer(blockId, BLOCKS_LINE_COUNT, minInLine, maxInLine, array);

        maxInLine = Math.floor(blockId/BLOCKS_LINE_COUNT)*BLOCKS_LINE_COUNT + (BLOCKS_COUNT/BLOCKS_LINE_COUNT);
        minInLine = Math.floor(blockId/BLOCKS_LINE_COUNT)*BLOCKS_LINE_COUNT;
        checkPathPoindDelimer(blockId, -1, minInLine, maxInLine, array);
        checkPathPoindDelimer(blockId, 1, minInLine, maxInLine, array);
        
        //если вышли за сетку
        //проверка  
        return array;      
    }

    function findPathAround(block) {        
        let array = [];
        let checkedArray = [block.id];
        array = checkPathPoind(block.id, array);
        let needCheck = [...array];
        let fullCheck = false;
        while(!fullCheck) {
            const curCheckLen = checkedArray.length;
            needCheck.forEach(check => {
                if (checkedArray.indexOf(check) < 0) {
                    array = checkPathPoind(check, array);
                    checkedArray.push(check);
                }
            });
            fullCheck = (checkedArray.length === curCheckLen);
            needCheck = [...array];
        }
        blocks.forEach((cur) => {
            if (cur.type !== BLOCK_TYPE.BALL && (array.indexOf(cur.id) >=0) ) {
                cur.targetField = true;
            }
        });
    }

    let incInterval;

    function startIncInterval() {
        if (!incInterval) {
            incInterval =  setInterval(() => {
                if (toScore) {
                    toScore--;
                    score++;
                }
                if(!toScore) {
                    clearInterval(incInterval);
                    incInterval = null;
                }
            }, 200);
        }
    }

   
</script>

<style>
    .panel {
        display: flex;
        flex-wrap: wrap;        
        width: 731px;
        margin: auto;
    }
    .block {
        width: 68px;
        height: 68px;
        background-color: aliceblue;
        border-radius: 6px;
        margin: 1px;
        transition: 0.2s ease-in;
        cursor: pointer;
    }

    .block .ball {
        display: block;
        background: black;
        border-radius: 50%;
        height: 40px;
        width: 40px;        
    }

    .block .small-ball {
        display: block;
        background: black;
        border-radius: 50%;
        height: 20px;
        width: 20px;        
    }

    .block .blue {
        background: -webkit-radial-gradient(30% 30%, circle, #5cabff, #000);
        background: -moz-radial-gradient(30% 30%, circle, #5cabff, #000);
        background: radial-gradient(30% 30%, circle, #5cabff, #000);
    }

    .block .red {
        background: -webkit-radial-gradient(30% 30%, circle, red, #000);
        background: -moz-radial-gradient(30% 30%, circle, red, #000);
        background: radial-gradient(30% 30%, circle, red, #000);
    }

    .block .green {
        background: -webkit-radial-gradient(30% 30%, circle, #05f105, #000);
        background: -moz-radial-gradient(30% 30%, circle, #05f105, #000);
        background: radial-gradient(30% 30%, circle, #05f105, #000);
    }

    .block .cyan {
        background: -webkit-radial-gradient(30% 30%, circle, cyan, #000);
        background: -moz-radial-gradient(30% 30%, circle, cyan, #000);
        background: radial-gradient(30% 30%, circle, cyan, #000);
    }

    .block .purple {
        background: -webkit-radial-gradient(30% 30%, circle, #e508e5, #000);
        background: -moz-radial-gradient(30% 30%, circle, #e508e5, #000);
        background: radial-gradient(30% 30%, circle, #e508e5, #000);
    }

    .block .yellow {
        background: -webkit-radial-gradient(30% 30%, circle, yellow, #000);
        background: -moz-radial-gradient(30% 30%, circle, yellow, #000);
        background: radial-gradient(30% 30%, circle, yellow, #000);
    }

    .block.selected {
        background-color: #0069ff6e;
    }

    .block.target-field {
        background-color: white;
    }

    .block-inner {
        margin: 15px;
        transition: height 0.2s ease-in, width 0.2s ease-in, margin 0.2s ease-in, display 0.2s ease-in;
    }  

    .block-inner.small-ball {
        margin: 27px;        
    }

    .block-inner.empty {
        margin: 35px; 
        height: 0px;       
        width: 0px;
        border-radius: 50%;
    }

    .score-panel {
        display: flex;
        align-items: center;
    }

    .fill-block {
        flex-grow: 1;
    }

    .score-text {
        width: 100px;
        height: 50px;
        border: 1px dashed #e7dcdc;
        text-align: center;
        font-family: 'Orbitron', sans-serif;
        font-size: 33px;
        color: #2d39ce;
    }

    .score-text__value {
        line-height: 52px;
    }

    .board-button {
        border: 2px solid gray;
        border-radius: 14px;
        text-align: center;
        width: 100px;
        height: 26px;
        margin: 0 8px;
        transition: 0.2s ease-in;
        cursor: pointer;
        user-select: none;
    }

    .board-button:hover {
        border-color: blue;
    }

    .board-main {
        background: url('./bg.png');
        min-height: 100vh;
        padding-bottom: 40px;
    }
</style>
<div class="board-main">
    {#if blocks.length}
        <div class="score-panel">
            <div class="fill-block"></div>
            <div class="board-button" on:click={onReplay}>Replay</div>
            <div class="score-text"><div class="score-text__value">{score}</div></div>
            <div class="board-button" on:click={onFinish}>Finish game</div>
            <div class="fill-block"></div>
        </div>
    {/if}
    <div class="board">
        <div class="panel">
            {#each blocks as block (block.id)}
                <div class="block{block.selected ? ' selected' : ''}{block.targetField ? ' target-field' : ''}" on:click={fieldClick} key={block.id}>
                    <div class="block-inner {block.type} {block.color}" on:click={ballClick} key={block.id}></div>
                </div>
            {/each}
        </div>
    </div>
</div>