/**
 * Карточка игрока
 * @class
 */
var Card = (function () {
    /**
     * @constructor
     * @param {string} name
     * @param {string} theme
     * @param {boolean} opened      
     */
    function Card(name, theme, opened) {
        if (opened === void 0) { opened = true; }
       if (theme === void 0) { theme = 'linux'; }
        this.name = name;
        this.opened = opened;
        this.theme = theme;
        this.img = "./img/" + theme + "/" + this.name + ".png";
    }

    /**
     * @return {string} путь к изображению
     */
    Card.prototype.getImg = function () {
        return this.opened ? this.img : ('./img/' + this.theme + '/' + Card.hover);
    };

    /**
     * Открыть карточку
     */
    Card.prototype.open = function () {
        this.opened = true;
    };

    /**
     * Закрыть карточку
     */
    Card.prototype.close = function () {
        this.opened = false;
    };

    /**
     * @return {boolean} открыта ли карточка
     */    
    Card.prototype.isOpen = function () {
        return this.opened;
    };

    Card.prototype.isCenter = function () {
       return (this.name === 'center');
    };

    //рубашка
    Card.hover = 'hover.png';
    return Card;
}());

/**
 * сгенерировать массив карточек
 * @return { Card[] } массив карточек
 */
function generateList(theme) {
    //генерируем основной массив данных
        var           
            distrlist = [],
            shuffle = function(array) {
                var
                    currentIndex = array.length,
                    temporaryValue,
                    randomIndex;

                // While there remain elements to shuffle...
                while (0 !== currentIndex) {

                    // Pick a remaining element...
                    randomIndex = Math.floor(Math.random() * currentIndex);
                    currentIndex -= 1;

                    // And swap it with the current element.
                    temporaryValue = array[currentIndex];
                    array[currentIndex] = array[randomIndex];
                    array[randomIndex] = temporaryValue;
                }

                return array;
            };

        for (var i = 0; i < 2; i++) {
            for(var j = 1;j < 11; j++ ) {
               var curName = j+'';
               if( curName.length < 2 ) {
                  curName = '0' + curName;
               }
               distrlist.push(new Card(curName, theme));
            }
        }

        distrlist = shuffle(distrlist);
        //in center
        distrlist.push(distrlist[10]);
        distrlist[10] = new Card('center', theme, true);

        console.log('gen data', distrlist);
        return distrlist;
}