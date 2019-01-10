import React from "react";
import "./theme-chooser.css";
import Card from "../card";

export default class ThemeChooser extends React.Component {
  onCardClick(theme) {
    if (theme) {
      this.props.onChangeTheme(theme);
    }
  }
  render() {
    return (
      <div className="theme-chooser">
        <div className="theme-chooser__title">Choose theme</div>
        <div className="theme-chooser__body">
          <Card
            theme="linux"
            img="hover"
            cardkey="linux"
            onCardClick={this.onCardClick.bind(this)}
          />
          <Card
            theme="faires"
            img="hover"
            cardkey="faires"
            onCardClick={this.onCardClick.bind(this)}
          />
        </div>
      </div>
    );
  }
}
