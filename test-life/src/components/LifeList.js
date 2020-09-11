import React, {createRef, useEffect} from 'react';
import './LifeList.css';

function LifeList({data}) {
  const itemsEndRef = createRef();

  function scrollToBottom() {
    itemsEndRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (data && data.length && (data.length > 3)) {
      scrollToBottom();
    }
  }, [data]);

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
              <img src={item.icon + ".png"} alt="Face"/>
            </div>
            <div className="info">
              <div className="header">{item.header}</div>
              <div className="text">{item.text}</div>
            </div>
          </div>
        );
      })}
      <div ref={itemsEndRef}></div>
    </div>
  )
}

export default LifeList;
