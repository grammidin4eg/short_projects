<script>
import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();
    // your script goes here
</script>

<style>
    .background {
        background-color: rgba(0,0,0,0.2);
        width: 100%;
        height: 100%;
        position: absolute;
    }

    .window {
        margin: auto;
        display: block;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        max-width: 478px;
        height: 250px;
        background-color: #24a1e7;
        border-radius: 30px;
        text-align: center;
    }

    .title {
        font-family: 'Shojumaru', cursive;
        font-size: 8rem;
        color: yellow;
    }

    @media screen and (max-width: 768px) {
        .title {
            font-size: 6rem;
        }
    }

    .start {
        /* background-color: yellow; */
        width: 147px;
        height: 50px;
        border-radius: 20px;
        margin: auto;
        border: 2px solid white;
        font-size: 31px;
        font-family: 'Shojumaru', cursive;
        color: white;
        cursor: pointer;
        transition: 0.2s ease-in;
    }

    .start:hover {
        background-color: yellow; 
        color: #24a1e7;
    }
</style>

<div>
    <div class="background">
        <div class="window">
            <div class="title">Lines</div>
            <div class="start" on:click>Start!</div>
        </div>
    </div>
</div>