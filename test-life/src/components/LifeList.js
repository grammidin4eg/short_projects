import React from 'react';
import './LifeList.css';

function LifeList({data}) {
  if (!data || !data.length) {
    return (
      <div className="game-container">
        <div className="container">
          Нажмите кнопку "сотворить".
        </div>
      </div>
    )
  }
  return (
    <div className="game-container">
      {data.map( (item, index) => {
        return (
          <div key={index} className="container">
            <div className={"icon "+item.icon}>
              <img src={item.icon + ".png"}/>
            </div>
            <div className="info">
              <div className="header">{item.header}</div>
              <div className="text">{item.text}</div>
            </div>
          </div>
        );
      })}
    </div>
  )
}

export default LifeList;
