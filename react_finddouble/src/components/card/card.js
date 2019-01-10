import React from "react";
import "./card.css";

export default class Card extends React.Component {
  render() {
    const { theme, img, open, cardkey } = this.props;
    const image = open ? img : "hover";

    const src = `./img/${theme}/${image}.png`;
    return (
      <div className="card" onClick={() => this.props.onCardClick(cardkey)}>
        <img src={src} className="card__img chooser-btn" alt="card" />
      </div>
    );
  }
}
