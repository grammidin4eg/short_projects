import React from "react";
import "./counter.css";

export default class Counter extends React.Component {
  state = {
    value: 10
  };

  componentDidMount() {    
    this.timer = setInterval(() => {
      let val = this.state.value;
      val--;
      if (val <= 0) {
        clearInterval(this.timer);
        this.timer = null;
        this.props.onCounterFinish();
      }      
      this.setState({ value: val});
    }, 1000);
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  render() {
    const imgSrc = `./img/${this.props.theme}/center.png`;
    const text = this.state.value ? this.state.value : null;
    return (
      <div className="counter">
        <div className="counter__text">{text}</div>
        <div className="counter__image">
          <img src={imgSrc} alt="logo" />
        </div>
      </div>
    );
  }
}
