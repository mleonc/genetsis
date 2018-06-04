import React, { Component } from 'react';
import '../Assets/css/toggler.css';

export default class Toggler extends Component {
  static defaultProps = {
    onText: 'Female',
    offText: 'Male',
  };
  
  constructor(props) {
    super(props);
    
    this.state = { 
      checked: props.checked,
      name: props.name,
      setGender: props.setGender,
    };
    
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(event) {
    let { setGender } = this.state;
    this.setState({ checked: !this.state.checked });
    
    setGender(this.state.checked);
  }
  
  render() {
    let { name } = this.state;
    return (
      <input
        type="checkbox"
        name={name}
        disabled={this.props.disabled}
        checked={this.state.checked}
        onChange={this.handleChange}
        data-text-on={this.props.onText}
        data-text-off={this.props.offText}
      />
    );
  }
}