import React from 'react';
import classNames from 'classnames';
import './HotelSafe.css';

export default class HotelSafe extends React.Component {

  constructor() {
    super()
    this.state = {
      pin: '',
      storedPin: '',
      isLocked: false,
      errorMessage: ''
    }
  }


  handleButtonClick(buttonValue) {
   this.setState({ errorMessage: '' })
    const handleCLR = () => {
      this.setState({
        pin: '',
        errorMessage: ''
      })
    }
    const handleNumber = () => {
      const pin = this.state.pin
      if (pin.length === 4)
        return
      const newPin = `${pin}${buttonValue}`
      this.setState({ pin: newPin })
    }
    const handleEnter = () => {
      const { pin, storedPin, isLocked } = this.state
      if (!isLocked) {
        if (pin.length !== 4) {
          return
        } else {
          this.setState({
            storedPin: pin,
            isLocked: true,
            pin: ''
          })
        }
      } else {
        if (pin !== storedPin) {
          this.setState({
            errorMessage: 'INVALID',
            pin: ''
          })
        } else {
          this.setState({
            isLocked: false,
            pin: ''
          })
        }
      }
    }
    console.log(buttonValue)
    if (buttonValue === 'CLR') {
      handleCLR()
    }
    else if (buttonValue === '\u21e8') {
      handleEnter()
    }
    else {
      handleNumber()
    }

  }


  renderKeypad() {
    const buttonValue = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'CLR', '0', '\u21e8']
    return (
      <div className="hotel-safe__keypad">
        <ul>
          {
            buttonValue.map(v => <li className="hotel-safe__keypad-button" key={v}>
              <button className="hotel-safe__keypad-press" type="button" value={v} onClick={this.handleButtonClick.bind(this,v)}>{v}</button>
            </li>)
          }
        </ul>
      </div>
    )
  }


  render() {
    const { isLocked } = this.state
    return (
      <div className="hotel-safe-container">
        <div className="hotel-safe-control-container">
          <div className="hotel-safe__keypad-container">
            {this.renderKeypad()}
          </div>
        </div>
        <div className="hotel-safe-display-container">
          <div className="hotel-safe__screen-container">
            <div className="hotel-safe__screen">
              <h1 className="hotel-safe__screen-content">{this.state.errorMessage || this.state.pin}</h1>
            </div>
          </div>
          <div className="hotel-safe__light-container">
            <div className={classNames('hotel-safe__light', { 'hotel-safe__light--red': isLocked })}></div>
          </div>
        </div>
      </div >
    );
  }
}