import { BLOCKS_COUNT } from './consts'
export const getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

export const getRandom = function (filledArray) {
    let fil = getRandomInt(0, BLOCKS_COUNT);
    if (filledArray && (filledArray.indexOf(fil) >= 0)) {
        fil = getRandom(filledArray);
    }
    return fil;
}