import React from 'react';
import './App.css';
import {list} from '../game-logic'
import LifeList from './LifeList'

function App() {
  return (
    <div className="App">
      <h1>Клеточное наполнение</h1>
      <LifeList data={list}/>
      <button>Сотворить</button>
    </div>
  );
}

export default App;
