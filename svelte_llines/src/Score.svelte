<script>
    import {setLadderPosition} from './ScoreLogic'
    import { afterUpdate } from 'svelte';
    import { createEventDispatcher } from 'svelte';
    
    const dispatch = createEventDispatcher();

    export let curScore;
    export let ladderArray;
    let userName = '';
    let saveButtonDisable = true;
    let showInputPanel = true;

    const MAX_NAME_SIZE = 20;

    function addScore() {
        if (!saveButtonDisable && showInputPanel) {
            setLadderPosition(userName, curScore);
            showInputPanel = false;
            saveButtonDisable = true;
            dispatch('saved');
        }
    }

    function addScoreKey(event) {
        console.log('key', arguments);
        if (event && event.code === "Enter") {
            addScore();
        }
    }

    afterUpdate(() => {
        if (userName.length > MAX_NAME_SIZE) {
            userName = userName.substr(0, MAX_NAME_SIZE);
        }

        saveButtonDisable = (!userName || !showInputPanel);
	});
</script>

<style>
    .board {
        padding: 11px;
        text-align: center;
    }

    .board-block {
       margin-bottom: 12px;
    }

    .value, .label {
        display: inline-block;
        font-family: 'Orbitron', sans-serif;
        font-size: 2rem;
    }

    /*.name .lavel {
        font-size: 2rem;
    }*/

    .name-input {
        display: block;
        margin: 20px auto;
        max-width: 100%;
        font-size: 30px;
    }

    .save-button {
        border: 2px solid gray;
        border-radius: 14px;
        text-align: center;
        width: 200px;
        height: 39px;
        transition: 0.4s ease-in;
        cursor: pointer;
        user-select: none;
        margin: auto;
        font-size: 27px;
        color: green;
        margin-bottom: 8px;
    }

    .save-button.reload {
        display: block;
        text-decoration: none;
    }

    .save-button.disabled {
        color: gray;
        border-color: gray;
        cursor: default;
    }
    .save-button:not(.disabled):hover {
        border-color: blue;
        color: blue;
    }

    .score-list table {
        margin: auto;
        /*text-align: center;*/
        font-size: larger;
    }

    .score-list td {
        border: 1px solid gray;
        border-radius: 14px;
        padding: 4px;
        text-align: center;
    }

    .score-list thead {
        color: #9b198a;
    }

    .cell-index {
        width: 25px;
    }

    .cell-name {
        width: 300px;
        white-space: nowrap;
        overflow: hidden;        
        text-overflow: ellipsis;
    }

    .cell-score {
        width: 100px;
        font-family: 'Orbitron', sans-serif;
    }

    .score-main {
        background: url(./bg.png);
        min-height: 100vh;
        padding-bottom: 40px;
    }

    .again {
        position: absolute;
        right: 12px;
        top: 12px;
    }

    .again__button {
        border-radius: 0px;
        border-color: transparent;
        text-decoration: none;
        color: black;
        font-family: 'Orbitron', sans-serif;
        padding: 8px;
    }
</style>

<dir class="score-main">
    <div class="board">
        <div class="score board-block">
            <div class="label">Score:</div>
            <div class="value">{curScore}</div>
        </div>
        {#if showInputPanel}
            <div class="name board-block">
                <div class="label">Enter your name</div>
                <input class="name-input" type="text" bind:value={userName} on:keypress ={addScoreKey} />
            </div>
            <div class="save-button" on:click={addScore} class:disabled={saveButtonDisable}>Save result</div>
            <a class="save-button reload" href="/">Reload</a>
        {:else}
            <div>
                <a class="save-button reload" href="/">Reload</a>
                <div class="label">Top 15 ladder</div>
            </div>
        {/if}
    </div>
    <div class="score-list">
    <table>
    <thead>
        <td>№</td>
        <td>Name</td>
        <td>Score</td>
    </thead>
    {#each ladderArray as ladder, i}
        <tr>
            <td class="cell-index">{i+1}</td>
            <td class="cell-name">{ladder.name}</td>
            <td class="cell-score">{ladder.value}</td>
        </tr>
    {/each}
    </table>
    </div>
</dir>