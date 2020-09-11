import React, {useState} from 'react';
import './App.css';
import LifeList from './LifeList'

const ITEM_LIVE = {
  header: 'Живая',
  text: 'и шевелится!',
  icon: 'live'
};

const ITEM_DEAD = {
  header: 'Мертвая',
  text: 'или прикидывается',
  icon: 'dead'
};

const ITEM_LIFE = {
  header: 'Жизнь',
  text: 'Ку-ку!',
  icon: 'duck',
  isLife: true
};

const ITEM_DEAD_LIFE = {
  header: 'Жизнь',
  text: 'Умерла :(',
  icon: 'duck',
  isLife: false
};

function App() {
  const [list, setList] = useState([]);
  const [liveCounter, setLiveCounter] = useState(0);
  const [deadCounter, setDeadCounter] = useState(0);

  function createItem() {
    let newItem = [];
    if (Math.random() >= 0.5) {
      newItem = [ITEM_LIVE];
      if (liveCounter > 0) {
        newItem = [ITEM_LIVE, ITEM_LIFE];
        setLiveCounter(0);
      } else {
        setLiveCounter(liveCounter + 1);
      }
      setDeadCounter(0);
    } else {
        newItem = [ITEM_DEAD];
        if (deadCounter > 1) {
          setDeadCounter(0);
          for (let i = (list.length - 1); i >= 0; i-- ) {
            if (list[i].isLife) {
              list[i] = ITEM_DEAD_LIFE;
              break;
            }
          }
        } else {
          setDeadCounter(deadCounter + 1);
        }
        setLiveCounter(0);
    }
    setList(list.concat(newItem));
  }

  return (
    <div className="App">
      <h1>Клеточное наполнение</h1>
      <LifeList data={list}/>
      <button onClick={createItem}>Сотворить</button>
    </div>
  );
}

export default App;
