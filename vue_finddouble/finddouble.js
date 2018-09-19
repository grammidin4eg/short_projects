"use strict";
/**
 * Пример работы с vue. Поиск дубликатов.
 * @author Карачевцев Ю.Ю.
 */


Vue.component('list-item', {
    template: `        
        <div class="list-item" v-on:click="$emit('open')">
           <div v-if="card.isCenter() && timervalue > 0" class="center-card">{{timervalue}}</div>
           <img v-bind:src="card.getImg()" v-bind:alt="card.name">
        </div>
    `,
    props: ['card', 'timervalue']
});

var
   APP_STATE_CHOOSE_THEME = 0,
   APP_STATE_PREVIEW = 1,
   APP_STATE_GAME = 2,
   APP_STATE_WINNER = 5;

new Vue({
    el: '#app-finddouble',
    data: {
        distrlist: [],
        appState: APP_STATE_CHOOSE_THEME,
        curTheme: 'linux',
        timerValue: 5
    },
    computed: {
       winnerImgUrl: function () {
          return './img/' + this.$data.curTheme + '/win.png'
       }
    },
    mounted: function() {
        //console.log('mounted');
        //this.newGame();
    },
    opened: false,
    lastOpenedItem: null,
    methods: {
        openCard: function(item) {            
            if (item.isOpen() || (this.$data.appState < APP_STATE_GAME) || item.isCenter() ) {
                return;
            }
            //console.log('open card', item);
            item.open();
            if (this.opened) {
                this.opened = false;
                if (this.lastOpenedItem.img !== item.img) {
                    //не верно, закрыть через секунду
                    var last_1 = this.lastOpenedItem;
                    setTimeout(function () {
                        last_1.close();
                        item.close();
                    }, 700);
                }
                else {
                    //проверим победу
                    var hasClosed = false;
                    for (var i = 0; i < this.$data.distrlist.length; i++) {
                        var curItem = this.$data.distrlist[i];
                        if (!curItem.isOpen()) {
                            hasClosed = true;
                            break;
                        }
                    }
                    if (!hasClosed) {
                        //победа
                        this.$data.appState = APP_STATE_WINNER;
                    }
                }
            }
            else {
                this.opened = true;
                this.lastOpenedItem = item;
            }
        },

        newGame: function() {
            this.$data.appState = APP_STATE_PREVIEW;
            this.$data.distrlist = generateList(this.$data.curTheme);
            this.lastOpenedItem = null;
            this.opened = false;
            this.$data.timerValue = 5;

           var
              self = this,
              timerID = setInterval(function () {
               self.$data.timerValue = self.$data.timerValue - 1;
               if( self.$data.timerValue < 1 ) {
                  clearInterval(timerID);
                  self.hideCards();
               }
           }, 1000);
        },
        hideCards: function () {
           for (var i = 0; i < this.$data.distrlist.length; i++) {
              var curItem = this.$data.distrlist[i];
              if( !curItem.isCenter() ) {
                 curItem.close();
              }
           }
           this.$data.appState = APP_STATE_GAME;
        },
        chooseTheme: function (_name) {
            if( _name ) {
                this.$data.curTheme = _name;
                this.newGame();
            }
        },
        isWinner: function() {
           return (this.$data.appState === APP_STATE_WINNER);
        }
    }
});