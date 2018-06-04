import React, { Component } from 'react';
import  Toggler  from '../Component/Toggler';
import '../Assets/css/file.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class File extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email:'',
      birthdate:'',
      gender:'',
      location:'',
      cancel:props.cancel,
      result:'',
      resultStatus:''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setGender = this.setGender.bind(this);
  }

  handleSubmit(e) {
    let { email, birthdate, gender, location } = this.state;
    if (gender === '' || gender === false) {
      gender = 'f';
    } else {
      gender = 'm';
    }
    e.preventDefault();
    fetch('http://localhost.genetsis/rest/api/user', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        birthdate: birthdate,
        gender: gender,
        location: location,
      })
    }).then(res => {
      this.setState({
        result: 'User has been created',
        resultStatus: 'ok',
      });
    }).catch(err => {
      this.setState({
        result: 'Error creating user',
        resultStatus: 'error',
      });
    });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  setGender (value) {
    this.setState({ gender: value });
  }

  render() {
    let { email, birthdate, gender, location, cancel, resultStatus, result } = this.state;
    return (
      <ReactCSSTransitionGroup
        transitionName="animation"
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionEnter={false}
          transitionLeave={false}>

      <div className="profile">
        <div className="profile-box">
          <form name="profileForm" onSubmit={this.handleSubmit}>
            <div className="form-group-collection">
              <div className="form-group">
                <input className="input" autoFocus type="text" id="email" name="email" onChange={this.handleChange} value={email} required />
                <label htmlFor="email">Email</label>
              </div>
              <div className="form-group">
                <input className="input" type="date" id="birthdate" name="birthdate" onChange={this.handleChange} value={birthdate} required />
                <label htmlFor="birthdate">Birthdate</label>
              </div>
              <br />
              <div className="form-group">
                <Toggler id="gender" name="gender" setGender={this.setGender} checked="false" />
                <label htmlFor="gender">Gender</label>
              </div>
              <div className="form-group">
                <input className="input" type="text" id="location" name="location" onChange={this.handleChange} value={location} required />
                <label htmlFor="location">Location</label>
              </div>
              <div className="form-submit">
                <input className="cancel" type="button" value="Cancel" onClick={cancel} />
                <input type="submit" value="Create user" />
              </div>
              <br />
              { result !== '' ? <span className={resultStatus}>{result}</span> : ''}
            </div>
          </form>
        </div>
      </div>
      </ReactCSSTransitionGroup>
    )
  }
}