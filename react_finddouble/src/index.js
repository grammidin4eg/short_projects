import React from "react";
import ReactDOM from "react-dom";

import ThemeChooser from "./components/theme-chooser";
import Card from "./components/card";
import Counter from "./components/counter";
import ResultDlg from "./components/result-dlg";

import "./styles.css";

const STATES = {
  CHOOSE_THEME: 1,
  WAIT_COUNTER: 2,
  GAME: 3,
  CLOSE_DOUBLE: 4,
  GAME_RESULT: 5
};

class App extends React.Component {
  state = {
    state: STATES.CHOOSE_THEME,
    theme: "linux",
    cards: [],
    firstOpenCard: null
  };

  onChangeTheme(theme) {
    this.setState({
      theme,
      state: STATES.WAIT_COUNTER,
      cards: this.cardGeneration()
    });
  }

  onCounterFinish() {
    //закроем все карты и начнем
    const newCards = this.state.cards.map(card => {
      card.open = false;
      return card;
    });
    this.setState({
      state: STATES.GAME,
      cards: newCards
    });
  }

  getCard(id) {
    return this.state.cards.find((card) => {
      if (card.cardkey === id) {
        return true;
      }
    });
  }

  changeCard(changedCard, saveFirst, newState) {
    //firstOpenCard
    const newArray = this.getChangedArray(changedCard);
    this.setState({
      cards: newArray,
      firstOpenCard: saveFirst ? changedCard.cardkey : null,
      state: newState
    });
  }

  getChangedArray(...cards) {
    const newArray = this.state.cards.map((card) => {
      for (let i=0, len = cards.length; i < len; i++) {
        if (card.cardkey === cards[i].cardkey) {
          return cards[i];
        }
      }
      return card;
    });

    return newArray;
  }

  checkWinConditions() {    
    const isWin = this.state.cards.every((card) => {
      return card.open || (card.cardkey === 100);
    });    
    
    
    if (isWin) {
      console.log('WIN!');
      /*this.setState({
        state: STATES.GAME_RESULT
      });*/
    }

    return isWin;
  }

  closeDouble(firstCardId, secondCardId) {    
    setTimeout(() => {
      const card1 = this.getCard(firstCardId);
      const card2 = this.getCard(secondCardId);
      card1.open = false;
      card2.open = false;
      const newArray = this.getChangedArray(card1, card2);      

      this.setState({
        cards: newArray,
        state: STATES.GAME,
        firstOpenCard: null
      });
    }, 1000);
  }

  onCardClick(cardkey) {    
    //обрабатываем нажатие только в режиме игры
    if (this.state.state !== STATES.GAME) {
      return;
    }

    let card = this.getCard(cardkey);
    let saveFirst = true;
    let newState = STATES.GAME;
    //кликнули уже открытую    
    if (card.open) {
      return;
    }
    card.open = true;

    if (this.state.firstOpenCard) {
      const firstCard = this.getCard(this.state.firstOpenCard);
      //открыли вторую карту
      //если совпадает - оставляем открытую (и проверяем на победу)
      if (firstCard.img === card.img) {
        if (this.checkWinConditions()) {
          newState = STATES.GAME_RESULT;
        }
      } else {
        //если не совпадает - закрываем обе через какое-то время
        //на это время клик по карте блокируется        
        newState = STATES.CLOSE_DOUBLE;
        this.closeDouble(this.state.firstOpenCard, card.cardkey);
      }

      saveFirst = false;
      
    }    
    this.changeCard(card, saveFirst, newState);
  }

  shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  cardGeneration() {
    let cards = [];
    for (let j = 0; j < 2; j++) {
      for (let i = 1; i < 11; i++) {
        const img = i < 10 ? "0" + i : "" + i;
        cards.push({
          cardkey: j * 10 + i,
          open: true,
          img
        });
      }
    }

    cards = this.shuffle(cards);

    cards.splice(10, 0, {
      cardkey: 100,
      open: true,
      img: "center"
    });

    return cards;
  }
  render() {
    let field;
    switch (this.state.state) {
      case STATES.CHOOSE_THEME:
        field = <ThemeChooser onChangeTheme={this.onChangeTheme.bind(this)} />;
        break;
      case STATES.GAME_RESULT:
        field = <ResultDlg theme={this.state.theme} />;
        break;  
      default:
        field = null;
        break;
    }
    const cardList = this.state.cards.map(({ cardkey, open, img }) => {
      if (cardkey === 100) {
        return (
          <Counter
            theme={this.state.theme}
            key={cardkey}
            onCounterFinish={this.onCounterFinish.bind(this)}
          />
        );
      }
      return (
        <Card
          theme={this.state.theme}
          img={img}
          cardkey={cardkey}
          open={open}
          key={cardkey}
          onCardClick={this.onCardClick.bind(this)}
        />
      );
    });
    return (
      <div className="App">
        <header>
          <a href="/" title="to Home"><img border="0" alt="Home" src="./img/Home.png"/></a><h2>Game "Find Double"</h2>
        </header>

        <div className="desc-field">
          {field}
          <div className="desc-field__card-list">{cardList}</div>
        </div>

        <footer>
          <div id="credits">
            <div>              
              <a href="http://yaroslavl.hh.ru/resume/ff4eef08ff035dd8a80039ed1f4f7949763954" target="_blank">Karachevtsev Yu.Yu.</a>
            </div>
            <div>              
              <a href="https://github.com/grammidin4eg/react_finddouble" target="_blank">GitHub</a>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
