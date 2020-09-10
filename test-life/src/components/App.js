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

function App() {
  const [list, setList] = useState([]);

  function createItem() {
    const newItem = (Math.random() >= 0.5) ? ITEM_LIVE : ITEM_DEAD;
    setList([...list, newItem]);
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
