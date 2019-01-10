import React from 'react';
import './result-dlg.css';



export default class ResultDlg extends React.Component {
    render() {
        const imgSrc = `./img/${this.props.theme}/win.png`;
        return (
            <div className="result-dlg">
                <span className="result-dlg__title">YOU WIN</span>
                <img className="result-dlg__img" src={imgSrc} alt="win"></img>
            </div>
        );
    }
}