/**
 * Created by karachevtsev_yuyu on 24.07.2016.
 * Game MinesWeeper
 * Backbone.js sample
 */

$(function () {
    var BOMB_VALUE = 10; //value for bomb
    var CellModelClass = Backbone.Model.extend({
        defaults: function () {
            return {
                value: 0,
                opened: false
            };
        },
        open: function (dontCheckNull) {
        	if( this.collection.gameOver ) {
        		return;
        	}
            this.set('opened', true);
            if ( this.get('value') === BOMB_VALUE ) {
                //It's Bomb!
                this.collection.stopGame();
            } else {
            	var cur_index = this.collection.checkWin(this);
            	if( !dontCheckNull && this.get('value') === 0 ) {
            		this.collection.openNulls(cur_index);
            	}
            }
            
        },

        removeSelf: function() {
            this.destroy();
        }
    });

    var CellsCollection = Backbone.Collection.extend({
        model: CellModelClass,
        gameOver: false,
        generateArray: function () { //fill data model
            if( this.length > 0 ) {
                this.reset();
            }

            var
                cellArray = [],
                self = this,
                addNeighbor = function (value) {
                    return ( value === BOMB_VALUE ) ? 1 : 0;
                };

            //zero array
            for( var i = 0; i < 100; i++ ) {
                cellArray.push(0);
            }

            //put bombs
            for ( var i=0; i < 5; i++ ) {
                var pos = 0;
                do {
                    pos = _.random(99);
                } while( cellArray[pos] === BOMB_VALUE )
                cellArray[pos] = BOMB_VALUE;
            }

            //calc elements value
            for( var i = 0; i < 100; i++ ) {
                if( cellArray[i] !== BOMB_VALUE ) {
                    cellArray[i] = addNeighbor(cellArray[i - 1]) + addNeighbor(cellArray[i + 1]) + addNeighbor(cellArray[i - 10]) +
                        addNeighbor(cellArray[i + 10]) + addNeighbor(cellArray[i - 11]) + addNeighbor(cellArray[i - 9]) +
                        addNeighbor(cellArray[i + 9]) + addNeighbor(cellArray[i + 11]);
                }
            }
            
            //put to collection
            _.each(cellArray, function (elem) {
                var newElement = new CellModelClass({value: elem, collection: this});
                self.push(newElement);
            });
            this.gameOver = false;
        },

        checkWin: function(cellmodel) {
        	var 
        		openedCound = 0,
        		index = 0,
        		cur_index = 0;

        	this.forEach(function(curModel){
        		if( curModel.get('opened') ) {
        			openedCound+=1;
        		}
        		if( curModel.cid === cellmodel.cid ) {
        			cur_index = index;
        		}
        		index+=1;
        	});

        	if( openedCound >= 95 ) {
        		this.stopGame(true);
        	}
        	return cur_index;
        },

        openNulls: function(curIndex) {
        	
        	var 
        		self = this,
        		openNUll = function(_ind) {
        		if( _ind < 0 || _ind >= 100) {
        			return;
        		}
        		var mod = self.at(_ind);
        		if( mod.get('value') === 0 && !mod.get('opened') ) {
        			mod.open();
        		}
        	}

        	openNUll(curIndex - 1);
        	openNUll(curIndex + 1);
        	openNUll(curIndex - 10);
        	openNUll(curIndex + 10);
        	openNUll(curIndex - 11);
        	openNUll(curIndex - 9);
        	openNUll(curIndex + 9);
        	openNUll(curIndex + 11);
        },

        stopGame: function(isWin) {
        	this.forEach(function(curModel){
        		curModel.set('opened', true);
        	});
        	this.gameOver = true;
        	this.trigger('stop_game', isWin);        	
        }
    });

    var cellsList = new CellsCollection;

    var CellView = Backbone.View.extend({
        tagName: "div",
        className: "cell",
        events: {
            "click": "clickCell"
        },
        clickCell: function () {
            this.model.open();
        },

        initialize: function() {
            this.model.bind('change', this.render, this);
            this.model.bind('destroy', this.remove, this);
            this.render();
        },

        render: function () {
            var 
            	elem = $('<span></span>'),
            	value = this.model.get('value');
            
            elem.text(String(value));            
            elem.addClass('cell__value');

            if( value === 0 ) {
               elem.addClass('null__value');
			}

            if( value === BOMB_VALUE ) {
                this.$el.addClass('bomb');
                elem.html('&otimes;');
            }

            if( this.model.get('opened') === true ) {
                this.$el.addClass('opened');
            }
            this.$el.html(elem);
            return this;
        }
    });

    var AppView = Backbone.View.extend({
        el: $("#miner_app"),
        //tagName: 'div',
        initialize: function() {
            this.collection.bind('add', this.addElement, this);
            this.collection.bind('reset', this.resetElements, this);
            this.collection.bind('stop_game', this.showEndGameDialog, this)            
        },

        resetElements: function () {
            this.$el.empty();
        },

        addElement: function (cell ) {
            var cellView = new CellView({model: cell});
            this.$el.append(cellView.render().el);
        },

        showEndGameDialog: function(isWin) {
        	var 
        		dlgText = isWin ? 'You Win !!!' : 'You loose :(',
        		dlg = $('<div class="end-dialog"><span>'+dlgText+'</span></div>');

        	if( isWin ) {
        		dlg.addClass('win-dialog');
        	}
        	this.$el.append(dlg);
        }
    });

    var appView = new AppView({collection: cellsList});

    document.getElementById('start_button').addEventListener('click', function () {
        cellsList.generateArray();
    });
});
